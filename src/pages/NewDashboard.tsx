import {
  IonContent,
  IonPage,
  IonAvatar,
  IonButton
} from "@ionic/react";

import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import "./NewDashboard.css";

const NewDashboard: React.FC = () => {

  const [todayPatients,setTodayPatients] = useState(0);
  const [recorded,setRecorded] = useState(0);
  const [notRecorded,setNotRecorded] = useState(0);

  const [chartData,setChartData] = useState<any[]>([]);

  const today = new Date().toLocaleDateString("sv-SE");


  const loadData = async () => {

    const { data } = await supabase
      .from("appointments")
      .select("*")
      .eq("appointment_date", today);

    if(data){

      setTodayPatients(data.length);

      const recordedCount = data.filter(
        (a)=> a.note && a.note !== "EMPTY"
      ).length;

      const notRecordedCount = data.length - recordedCount;

      setRecorded(recordedCount);
      setNotRecorded(notRecordedCount);
    }
  };


  /* โหลดข้อมูล graph 7 วัน */

  const loadGraph = async () => {

    const { data } = await supabase
      .from("appointments")
      .select("appointment_date");

    if(!data) return;

    const map:any = {};

    data.forEach((a:any)=>{

      // FIX timezone / type
      const date = new Date(a.appointment_date)
        .toLocaleDateString("sv-SE");

      if(!map[date]){
        map[date] = 0;
      }

      map[date]++;

    });


    const days:any[] = [];

    for(let i=6;i>=0;i--){

      const d = new Date();
      d.setDate(d.getDate() - i);

      const date = d.toLocaleDateString("sv-SE");

      days.push({
        date,
        count: map[date] || 0
      });

    }

    setChartData(days);
  };


  useEffect(()=>{
    loadData();
    loadGraph();
  },[]);


  return (
    <IonPage>

      {/* Top Bar */}
      <div className="top-bar">

        <div className="doctor-info">

          <IonAvatar className="avatar">
            <img src="https://ionicframework.com/docs/img/demos/avatar.svg"/>
          </IonAvatar>

          <h2>สวัสดี คุณหมอ</h2>

        </div>

      </div>

      <IonContent>

        <div className="dashboard-container">

          <div className="date">
            {today}
          </div>

          {/* statistics */}
          <div className="stats">

            <div className="card">
              <p>คนไข้วันนี้</p>
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

          <div className="graph">

            <h3>คนไข้รายวัน (7 วันล่าสุด)</h3>

            <div className="bars">

              {chartData.map((d,index)=>(
                <div key={index} className="bar-container">

                  <div
                    className="bar"
                    style={{height: `${d.count * 15}px`}}
                  ></div>

                  <span className="bar-label">
                    {d.date.slice(5)}
                  </span>

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