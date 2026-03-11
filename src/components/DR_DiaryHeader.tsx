import React from "react";
import {
  IonHeader,
  IonToolbar,
  IonButtons,
  IonButton,
  IonIcon,
  IonLabel,
} from "@ionic/react";

import { useHistory } from "react-router-dom";
import { home } from "ionicons/icons";

import "./DR_DiaryHeader.css";

interface AppHeaderProps {
  backTo?: string;
  title?: string;
}

const DR_DiaryHeader: React.FC<AppHeaderProps> = ({
  backTo = "/doctor-dashboard",
  title,
}) => {

  const history = useHistory();

  return (
    <IonHeader className="ion-no-border">
      <IonToolbar className="history-header">

        <IonButtons slot="start">
          <IonButton
            fill="clear"
            onClick={() => history.push(backTo)}
            className="custom-back-btn"
          >
            <IonIcon icon={home} slot="start" />
            <IonLabel>หน้าหลัก</IonLabel>
          </IonButton>
        </IonButtons>

        {title && <div className="header-title">{title}</div>}

      </IonToolbar>
    </IonHeader>
  );
};

export default DR_DiaryHeader;