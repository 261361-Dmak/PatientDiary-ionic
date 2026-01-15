import {
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton,
} from "@ionic/react";
import React from "react";
import DoctorCard, { Doctor } from "../../components/DoctorCard";
import "./Contact.css";

const doctors: Doctor[] = [
  {
    id: 1,
    name: "Dr. Somchai Prasert",
    specialty: "Cardiologist",
    phone: "+66 2 123 4567",
    email: "somchai.prasert@hospital.com",
    lineId: "dr.somchai.cardio",
    avatar: "https://i.pravatar.cc/200?img=3",
  },
  {
    id: 2,
    name: "Dr. Nittaya Wong",
    specialty: "General Practitioner",
    phone: "+66 2 234 5678",
    email: "nittaya.wong@clinic.com",
    lineId: "dr.nittaya.gp",
    avatar: "https://i.pravatar.cc/200?img=5",
  },
  {
    id: 3,
    name: "Dr. Apinya Chen",
    specialty: "Dermatologist",
    phone: "+66 2 345 6789",
    email: "apinya.chen@skincare.com",
    lineId: "dr.apinya.derm",
    avatar: "https://i.pravatar.cc/200?img=47",
  },
];

const Contact: React.FC = () => {
  return (
    <IonPage>
      <IonHeader className="cd-topbar">
        <IonToolbar className="cd-toolbar">
          {/* ปุ่มเมนู: mobile จะเป็น hamburger, desktop ยังอยู่ได้แต่ไม่เกะกะ */}
          <IonButtons slot="start">
            <IonMenuButton menu="mainMenu"/>
          </IonButtons>
          <IonTitle >Patient Diary</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="cd-content">
        <div className="cd-wrap">
          <h1 className="cd-title">Contact Doctor</h1>
          <p className="cd-sub">Reach out to your healthcare providers</p>

          <div className="cd-grid">
            {doctors.map((d) => (
              <DoctorCard key={d.id} doctor={d} />
            ))}
          </div>
        </div>
      </IonContent>
      <IonButton
        expand="block"
        style={{ marginTop: 12 }}
        onClick={() => window.history.back()}
        >
          Back
      </IonButton>
    </IonPage>
  );
};

export default Contact;