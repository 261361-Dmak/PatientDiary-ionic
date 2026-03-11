import { IonContent, IonPage, IonAvatar, IonButton } from "@ionic/react";

import { useEffect, useState } from "react";
import { supabase } from "../../../supabaseClient";
import "./NewDashboard.css";
import DR_DiaryHeader from "../../../components/DR_DiaryHeader";

const NewDashboard: React.FC = () => {
  const [todayPatients, setTodayPatients] = useState(0);
  const [recorded, setRecorded] = useState(0);
  const [notRecorded, setNotRecorded] = useState(0);

  const [chartData, setChartData] = useState<any[]>([]);

  const fullDate = new Date().toLocaleDateString("th-TH", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const getToday = () => {
    const d = new Date();
    return d.toLocaleDateString("sv-SE", { timeZone: "Asia/Bangkok" });
  };

  const today = getToday();

  const loadData = async () => {
    const { data: diaries } = await supabase
      .from("diary")
      .select("*")
      .eq("diary_date", today);
    const { data: profiles } = await supabase.from("profiles").select("*");

    if (profiles) {
      setTodayPatients(profiles.length);
    }

    const recordedCount = diaries?.length || 0;

    const notRecordedCount = profiles ? profiles.length - recordedCount : 0;

    setRecorded(recordedCount);
    setNotRecorded(notRecordedCount);
  };

  /* โหลดข้อมูล graph 7 วัน */

  const loadGraph = async () => {
    const { data } = await supabase
      .from("appointments")
      .select("appointment_date");

    if (!data) return;

    const map: any = {};

    data.forEach((a: any) => {
      // FIX timezone / type
      const date = new Date(a.appointment_date).toLocaleDateString("sv-SE");

      if (!map[date]) {
        map[date] = 0;
      }

      map[date]++;
    });

    const days: any[] = [];

    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);

      const date = d.toLocaleDateString("sv-SE");

      days.push({
        date,
        count: map[date] || 0,
      });
    }

    setChartData(days);
  };

  useEffect(() => {
    loadData();
    loadGraph();
  }, []);

  const max = Math.max(...chartData.map((d) => d.count), 1);

  return (
    <IonPage>
      {/* Top Bar */}
      <DR_DiaryHeader />

      <IonContent>
        <div className="dashboard-container">
          <div className="date">{fullDate}</div>

          {/* statistics */}
          <div className="stats">
            <div className="card">
              <p>คนไข้ทั้งหมด</p>
              <h2>{todayPatients}</h2>
            </div>

            <div className="card">
              <p>บันทึกแล้ว</p>
              <h2>{recorded}</h2>
            </div>

            <div className="card">
              <p>ยังไม่บันทึก</p>
              <h2>{notRecorded}</h2>
            </div>
          </div>

          {/* ===== Graph ===== */}
          <div className="graph-card">
            <div className="graph-head">จำนวนคนไข้ในแต่ละวัน (7 วันล่าสุด)</div>
            <div className="bars">
              {chartData.map((d, index) => (
                <div key={index} className="bar-container">
                  {/* ตัวเลข */}
                  <span className="bar-value">{d.count} คน</span>

                  <div
                    className="bar"
                    style={{ height: `${(d.count / max) * 90}px` }}
                  ></div>

                  <span className="bar-label">{d.date.slice(5)}</span>
                </div>
              ))}
            </div>
          </div>

          {/* button */}
          <IonButton
            expand="block"
            routerLink="/doctor/patient-list"
            className="main-button"
          >
            ดูบันทึกคนไข้วันนี้
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default NewDashboard;
