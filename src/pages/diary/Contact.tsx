import {
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton,
  IonBackButton
} from "@ionic/react";
import React, { useEffect } from "react";
import DoctorCard, { Doctor } from "../../components/DoctorCard";
import "./Contact.css";

const doctors: Doctor[] = [
  {
    id: 1,
    name: "หมอเดียร์",
    specialty: "Applied Thai Traditional Medicine",
    phone: "082-152-9499",
    email: "-",
    lineId: "-",
    avatar: "assets/Diary/doctor/doctordeer.jpg",
  }
];

// useEffect(() => {
//   const fetcgdata = async () => {
//     // Placeholder for future data fetching logic
//   }
//   document.title = "Contact Doctor - Patient Diary";
// }, []);

const Contact: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        {/* <IonToolbar className="cd-toolbar">
          <IonButtons slot="start">
            <IonMenuButton menu="mainMenu"/>
          </IonButtons>
          <IonTitle >บันทึกประจำวัน</IonTitle>
        </IonToolbar> */}
        <IonToolbar className="history-header">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/diarycalender" text="ย้อนกลับ" className="custom-back-btn"/>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="cd-content">
        <div className="cd-wrap">
          <h1 className="cd-title large-title">ติดต่อแพทย์</h1>
          <p className="cd-sub">Reach out to your healthcare providers</p>

          <div className="cd-grid">
            {doctors.map((d) => (
              <DoctorCard key={d.id} doctor={d} />
            ))}
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Contact;