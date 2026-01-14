import {
  IonPage,
  IonContent,
  IonIcon
} from '@ionic/react';
import {
  homeOutline,
  callOutline,
  personOutline,
  documentTextOutline
} from 'ionicons/icons';
import './Diary.css';

const Diary: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen>
        <div className="layout">

          {/* ===== Sidebar ===== */}
          <aside className="sidebar">
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
          </aside>

          {/* ===== Main Content ===== */}
          <main className="content">
            <h1>ติดต่อหมอเคสใหม่</h1>
            <p className="subtitle">
              กรอกข้อมูลเพื่อให้แพทย์ช่วยให้คำปรึกษา
            </p>

            <div className="card">
              {/* Lifestyle */}
              <h3>พฤติกรรมการใช้ชีวิต</h3>
              <p className="field-desc">
                ระบุรายละเอียดการใช้ชีวิตประจำวัน อาหาร การออกกำลังกาย ฯลฯ
              </p>
              <textarea
                placeholder="ตอนนี้ใช้ชีวิตอย่างไร? มีกิจกรรมอะไรบ้าง? กินอาหารประเภทใด?"
              />

              {/* Symptom */}
              <h3>
                ลักษณะอาการหรือบาดแผล <span className="required">*</span>
              </h3>
              <p className="field-desc">
                อธิบายลักษณะอาการ บาดแผล ความเจ็บปวด หรือสิ่งผิดปกติที่พบ
              </p>
              <textarea
                placeholder="ระบุอาการ ตำแหน่ง ลักษณะ สี ขนาด ความเจ็บปวด ฯลฯ"
              />

              {/* Upload */}
              <h3>แนบรูปภาพอาการ (ถ้ามี)</h3>
              <p className="field-desc">
                อัปโหลดรูปภาพเพื่อให้แพทย์เห็นอาการได้ชัดเจนยิ่งขึ้น
              </p>

              <div className="upload-box">
                <div className="upload-icon">⬆️</div>
                <p className="upload-text">
                  คลิกเพื่อเลือกไฟล์ หรือลากไฟล์มาวางที่นี่
                </p>
                <p className="upload-hint">
                  รองรับไฟล์ JPG, PNG (สูงสุด 10 รูป)
                </p>

                <input
                  type="file"
                  accept="image/png, image/jpeg"
                  multiple
                  hidden
                />
                <button className="upload-btn">เลือกรูปภาพ</button>
              </div>

              {/* Buttons */}
              <div className="action-buttons">
                <button className="btn-reset">ล้างข้อมูล</button>
                <button className="btn-submit">
                  ส่งข้อมูลถึงแพทย์
                </button>
              </div>
            </div>

            {/* Recommendation */}
            <div className="recommend-box">
              <h4>💡 คำแนะนำ</h4>
              <ul>
                <li>กรอกข้อมูลให้ละเอียดเพื่อให้แพทย์สามารถให้คำแนะนำได้ตรงจุด</li>
                <li>ถ่ายรูปอาการในแสงสว่างเพื่อความชัดเจน</li>
                <li>แพทย์จะตอบกลับภายใน 24 ชั่วโมง</li>
                <li>กรณีฉุกเฉินให้ติดต่อโรงพยาบาลโดยตรง</li>
              </ul>
            </div>
          </main>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Diary;
