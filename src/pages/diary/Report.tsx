import { IonContent, IonPage } from "@ionic/react";
import React from "react";
import DiaryNavBar from "../../components/DiaryNavBar";
import DiaryHeader from "../../components/DiaryHeader";
import "./Report.css";

const Report: React.FC = () => {
  return (
    <IonPage>
      <DiaryHeader />

      <IonContent className="report-content">
        <h1 className="report-title">Report</h1>

        {/* ===== Toggle ===== */}
        <div className="report-tabs">
          <span className="active">Monthly</span>
          <span>Annual</span>
        </div>

        <div className="report-month">Feb 2569 ▾</div>

        {/* ===== Mood Flow ===== */}
        <div className="report-card">
          <h3>Mood Flow</h3>

          <div className="mood-flow">
            {["2/1","2/6","2/11","2/16","2/21","2/26","3/1"].map((d, i) => (
              <div key={i} className="flow-col">
                <div className={`flow-dot mood-${i === 2 ? "good" : "none"}`} />
                <div className="flow-line" />
                <span>{d}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ===== Mood Bar ===== */}
        <div className="report-card">
          <h3>Mood Bar</h3>

          <div className="mood-bar-row">
            <div className="mood-item active">
              😀
              <span>100%</span>
            </div>
            <div className="mood-item">🙂<span>0%</span></div>
            <div className="mood-item">😐<span>0%</span></div>
            <div className="mood-item">☹️<span>0%</span></div>
            <div className="mood-item">😢<span>0%</span></div>
          </div>

          <div className="mood-bar-track">
            <div className="mood-bar-fill" />
          </div>
        </div>
      </IonContent>

      <DiaryNavBar />
    </IonPage>
  );
};

export default Report;
