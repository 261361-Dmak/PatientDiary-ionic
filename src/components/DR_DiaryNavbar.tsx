import React from "react";
import {
  IonButton,
  IonButtons,
  IonFooter,
  IonIcon,
  IonLabel,
  IonToolbar
} from "@ionic/react";

import { documentText, sad, statsChart } from "ionicons/icons";

import { useLocation, useParams } from "react-router-dom";
import "./DR_DiaryNavbar.css";

const DoctorNavBar: React.FC = () => {

  const location = useLocation();
  const { patientId } = useParams<{ patientId: string }>();

  const isActive = (path: string) => location.pathname === path;

  return (
    <IonFooter>
      <IonToolbar className="bottom-nav">

        <IonButtons slot="primary" className="bottom-nav-group">

          {/* การบันทึก */}
          <IonButton
            fill="clear"
            routerLink={`/doctor/patient-history/${patientId}`}    
            className={isActive(`/doctor/patient-history/${patientId}`) ? "active" : ""}
          >
            <IonIcon icon={documentText} />
            <IonLabel>การบันทึก</IonLabel>
          </IonButton>

          {/* ระดับความเจ็บปวด */}
          <IonButton
            fill="clear"
            routerLink={`/doctor/patient-chart/${patientId}`}
            className={isActive(`/doctor/patient-chart/${patientId}`) ? "active" : ""}
          >
            <IonIcon icon={sad} />
            <IonLabel>ระดับความเจ็บปวด</IonLabel>
          </IonButton>

          {/* ความถี่การบันทึก */}
          <IonButton
            fill="clear"
            routerLink={`/doctor/patient-detail/${patientId}`}
            className={isActive(`/doctor/patient-detail/${patientId}`) ? "active" : ""}
          >
            <IonIcon icon={statsChart} />
            <IonLabel>ความถี่การบันทึกแต่ละวัน</IonLabel>
          </IonButton>

        </IonButtons>

      </IonToolbar>
    </IonFooter>
  );
};

export default DoctorNavBar;