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
import './Contact.css';

const Contact: React.FC = () => {
    return (
        <div>
            ติดต่อแพทย์
        </div>
    );
}

export default Contact;