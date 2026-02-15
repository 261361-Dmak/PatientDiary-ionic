import { IonContent, IonPage } from "@ionic/react";
import React from "react";
import DiaryNavBar from "../../components/DiaryNavBar";
import DiaryHeader from "../../components/DiaryHeader";
import "./Report.css";
import MoodFlow from "../../components/MoodFlow";
import MoodBar from "../../components/MoodBar";

const Report: React.FC = () => {
  return (
    <IonPage>
      <DiaryHeader />

      <IonContent className="report-content">
        <h1 className="report-title">Report</h1>

        {/* ===== Mood Flow ===== */}
        <MoodFlow />

        <div className="report-section-divider" />

        {/* ===== Mood Bar ===== */}
        <MoodBar />
      </IonContent>

      <DiaryNavBar />
    </IonPage>
  );
};

export default Report;
