import React, { useState } from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonIcon,
  IonCard,
  IonCardContent,
  IonItem,
  IonLabel,
  IonBadge,
  IonButton
} from '@ionic/react';
import {
  notificationsOutline,
  calendarOutline,
  medkitOutline
} from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './DiaryCalender.css';

const DiaryCalender: React.FC = () => {
  const history = useHistory();
  const [value, setValue] = useState<Date>(new Date());

  // 🔒 FIX: format วันที่จาก Local Time (ไม่ใช้ toISOString)
  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
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
      <IonHeader>
        <IonToolbar>
          <IonTitle>Patient Diary</IonTitle>
          <IonIcon
            icon={notificationsOutline}
            slot="end"
            style={{ fontSize: 22, marginRight: 12 }}
          />
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="ion-padding">
        {/* Welcome */}
        <h2 className="welcome-text">Welcome back</h2>

        {/* Calendar */}
        <IonCard>
          <IonCardContent>
            <div className="calendar-header">
              <IonIcon icon={calendarOutline} />
              <span>Health Calendar</span>
            </div>

            <Calendar
              locale="th-TH"
              value={value}
              onClickDay={onDateClick}
            />

            {/* Diary Button */}
            <IonButton
              expand="block"
              style={{ marginTop: 12 }}
              onClick={goToDiary}
            >
              <IonIcon icon={calendarOutline} slot="start" />
              Open Diary
            </IonButton>
          </IonCardContent>
        </IonCard>

        {/* Today's Tasks */}
        <IonCard>
          <IonCardContent>
            <h3>Today's Tasks</h3>

            <IonItem lines="none">
              <IonIcon icon={medkitOutline} slot="start" />
              <IonLabel>
                <h2>Take Paracetamol</h2>
                <p>13:00</p>
              </IonLabel>
            </IonItem>

            <IonItem lines="none">
              <IonIcon icon={calendarOutline} slot="start" />
              <IonLabel>
                <h2>Visit Dr. Somchai</h2>
                <p>14:00</p>
              </IonLabel>
            </IonItem>
          </IonCardContent>
        </IonCard>

        {/* Summary */}
        <div className="summary-row">
          <IonCard>
            <IonCardContent>
              <p>Appointments</p>
              <h2>2</h2>
            </IonCardContent>
          </IonCard>

          <IonCard>
            <IonCardContent>
              <p>Medications</p>
              <h2>3</h2>
            </IonCardContent>
          </IonCard>

          <IonCard>
            <IonCardContent>
              <p>Health Score</p>
              <IonBadge color="success">85%</IonBadge>
            </IonCardContent>
          </IonCard>
        </div>
        <IonButton
          expand="block"
          style={{ marginTop: 12 }}
          routerLink="/history"
          >
            History
        </IonButton>
        <IonButton
          expand="block"
          style={{ marginTop: 12 }}
          routerLink="/contact"
          >
            Contact
        </IonButton>
        <IonButton
          expand="block"
          style={{ marginTop: 12 }}
          onClick={() => window.history.back()}
          >
            Back
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default DiaryCalender;
