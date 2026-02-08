import React, { useState } from "react";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonContent,
  IonIcon,
  IonCard,
  IonCardContent,
  IonButton,
  IonBackButton,
  IonButtons,
  IonLabel,
} from "@ionic/react";
import {
  addCircle,
  book,
  calendar,
  calendarNumber,
  calendarOutline,
  call,
  statsChart,
  timer,
  today,
} from "ionicons/icons";
import { useHistory } from "react-router-dom";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./DiaryCalender.css";
import DiaryNavBar from "../../components/DiaryNavBar";
import DiaryHeader from "../../components/DiaryHeader";

const DiaryCalender: React.FC = () => {
  const history = useHistory();
  const [value, setValue] = useState<Date>(new Date());

  // 🔒 FIX: format วันที่จาก Local Time (ไม่ใช้ toISOString)
  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  // กดวันที่บน Calendar
  const onDateClick = (date: Date) => {
    setValue(date);
    history.push(`/diary/`);
  };

  // กดปุ่ม Diary ใต้ปฏิทิน
  const goToDiary = () => {
    history.push(`/diary/`);
  };

  return (
    <IonPage>
      {/* ===== Header ===== */}
      <DiaryHeader />

      {/* ===== Main Content ===== */}
      <IonContent
        fullscreen
        className="ion-padding"
        style={{ paddingBottom: 110 }} // กัน bottom nav บัง
      >
        {/* Welcome */}
        <h2 className="welcome-text large-title">สวัสดีวันจันทร์</h2>

        {/* Calendar Card */}
        <IonCard className="flex-center">
          <IonCardContent>
            <div className="calendar-header large-title">
              <IonIcon icon={calendar} />
              <span>ปฏิทิน</span>
            </div>

            <div className="calendar-center">
              <Calendar locale="th-TH" value={value} onClickDay={onDateClick} />
            </div>
          </IonCardContent>
        </IonCard>
      </IonContent>

      {/* ===== Bottom Navigation ===== */}
      <DiaryNavBar />
    </IonPage>
  );
};

export default DiaryCalender;
