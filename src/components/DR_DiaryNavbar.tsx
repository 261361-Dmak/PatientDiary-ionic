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

import { useLocation } from "react-router-dom";
import "./DR_DiaryNavbar.css";

const DoctorNavBar: React.FC = () => {

  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <IonFooter>
      <IonToolbar className="bottom-nav">

        <IonButtons slot="primary" className="bottom-nav-group">

          {/* การบันทึก */}
          <IonButton
            fill="clear"
            routerLink="/doctor/patient-history"    
            className={isActive("/doctor/patient-history") ? "active" : ""}
          >
            <IonIcon icon={documentText} />
            <IonLabel>การบันทึก</IonLabel>
          </IonButton>

          {/* ระดับความเจ็บปวด */}
          <IonButton
            fill="clear"
            routerLink="/doctor/patient-chart"
            className={isActive("/doctor/patient-chart") ? "active" : ""}
          >
            <IonIcon icon={sad} />
            <IonLabel>ระดับความเจ็บปวด</IonLabel>
          </IonButton>

          {/* ความถี่การบันทึก */}
          <IonButton
            fill="clear"
            routerLink="/doctor/patient-detail"
            className={isActive("/doctor/patient-detail") ? "active" : ""}
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