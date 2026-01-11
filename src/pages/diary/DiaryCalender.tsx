import React, { useState } from 'react';
import { 
  IonContent, IonHeader, IonPage, IonTitle, IonToolbar, 
  IonButtons, IonBackButton 
} from '@ionic/react';
import { listOutline } from 'ionicons/icons';
import { IonIcon, IonButton } from '@ionic/react';
import { useHistory } from 'react-router-dom'; // Add this
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './DiaryCalender.css'

const DiaryCalender: React.FC = () => {
    return (
        <div>
            Diary Calender
        </div>
    );
}

export default DiaryCalender;