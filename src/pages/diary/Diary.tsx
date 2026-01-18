import {
  IonPage,
  IonContent,
  IonIcon,
  IonButton
} from '@ionic/react';
import {
  homeOutline,
  callOutline,
  personOutline,
  documentTextOutline
} from 'ionicons/icons';
import './Diary.css';
import { Route } from 'react-router';

const Diary: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen>
        <div className="layout">

          {/* ===== Sidebar ===== */}
          {/* <aside className="sidebar">
            <div className="logo">
              <div className="logo-icon">❤️</div>
              <div>
                <h2>Patient Diary</h2>
                <p>Health Tracker</p>
              </div>
            </div>

            <nav className="menu">
              <div className="menu-item">
                <IonIcon icon={homeOutline} />
                Home
              </div>
              <div className="menu-item">
                <IonIcon icon={documentTextOutline} />
                Case History
              </div>
              <div className="menu-item">
                <IonIcon icon={callOutline} />
                Contact Doctor
              </div>
              <div className="menu-item">
                <IonIcon icon={personOutline} />
                Profile
              </div>
            </nav>
          </aside> */}

          {/* ===== Main Content ===== */}
          <main className="content">
            <h1>บันทึกประจำวัน</h1>
            <p className="subtitle">
              กรุณากรอกข้อมูลให้ครบถ้วน
            </p>

            <div className="card">
              {/* Lifestyle */}
              <h3>พฤติกรรม</h3>
              <p className="field-desc">
                Describe details of your daily lifestyle, diet, exercise, etc.
              </p>
              <textarea
                placeholder="How are you living your life now? What activities are you doing? What kind of food are you eating?"
              />

              {/* Symptom */}
              <h3>
                อาการ <span className="required">*</span>
              </h3>
              <p className="field-desc">
                Describe any symptoms, pain, or abnormalities you experience.
              </p>
              <textarea
                placeholder="Describe the symptoms, location, appearance, color, size, pain, etc."
              />

              {/* Upload */}
              <h3>Attach photos of the symptoms (if available).</h3>
              <p className="field-desc">
                Upload photos to help your doctor see your symptoms more clearly.
              </p>

              <div className="upload-box">
                <div className="upload-icon">⬆️</div>
                <p className="upload-text">
                  drop the file here.
                </p>
                <p className="upload-hint">
                  Supports JPG and PNG files (up to 10 images).
                </p>

                <input
                  type="file"
                  accept="image/png, image/jpeg"
                  multiple
                  hidden
                />
                <button className="upload-btn">Select a photo.</button>
              </div>

              {/* Buttons */}
              <div className="action-buttons">
                <button className="btn-reset">Clear</button>
                <button className="btn-submit">
                  Save
                </button>
              </div>
            </div>

            {/* Recommendation */}
            <div className="recommend-box">
              <h4>💡 Recommendations</h4>
              <ul>
                <li>Please fill out the information completely so that the doctor can provide accurate advice.</li>
                <li>Take photos of the symptoms in bright light for clarity.</li>
                <li>The doctor will respond within 24 hours.</li>
                <li>In case of emergency, contact the hospital directly.</li>
              </ul>
            </div>
            <IonButton
              expand="block"
              style={{ marginTop: 12 }}
              onClick={() => window.history.back()}
              >
                Back
            </IonButton>
          </main>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Diary;
