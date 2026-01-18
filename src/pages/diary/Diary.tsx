import React, { useState } from 'react';
import {
  IonPage,
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButton,
  IonBackButton,
  IonButtons
} from '@ionic/react';
import './Diary.css';
const foodOptions = [
  { id: 1, name: 'ข้าวผัด', img: '/assets/Diary/foods/01.jpg' },
  { id: 2, name: 'ข้าวราดแกง', img: '/assets/Diary/foods/02.jpg' },
  { id: 3, name: 'ก๋วยเตี๋ยว', img: '/assets/Diary/foods/03.jpg' },
  { id: 4, name: 'ข้าวไข่เจียว', img: '/assets/Diary/foods/04.jpg' },
  { id: 5, name: 'ส้มตำ', img: '/assets/Diary/foods/05.jpg' },
  { id: 6, name: 'ผัดไทย', img: '/assets/Diary/foods/06.jpg' },
  { id: 7, name: 'ผัดกะเพรา', img: '/assets/Diary/foods/07.jpg' },
  { id: 8, name: 'ข้าวมันไก่', img: '/assets/Diary/foods/08.jpg' },
  { id: 9, name: 'ข้าวซอย', img: '/assets/Diary/foods/09.jpg' }
];

const Diary: React.FC = () => {
  const [feeling, setFeeling] = useState<string | null>(null);
  const [painLevel, setPainLevel] = useState<string | null>(null);
  const [selectedFood, setSelectedFood] = useState<number | null>(null);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar className="history-header">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/diarycalender" text="ย้อนกลับ" className="custom-back-btn"/>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <div className="layout">
          <main className="content">

            <h1>บันทึกอาการวันนี้</h1>
            <p className="subtitle">
              กรอกข้อมูลเพื่อให้แพทย์ช่วยให้คำปรึกษา
            </p>

            <div className="card">
              {/* ===== Lifestyle ===== */}
              <h3>
                พฤติกรรมการใช้ชีวิต <span className="required">*</span>
              </h3>
              <p className="field-desc">
                ระบุรายละเอียดการใช้ชีวิตประจำวัน อาหาร การออกกำลังกาย ฯลฯ
              </p>
              <textarea placeholder="ตอนนี้ใช้ชีวิตอย่างไร?" />

              {/* ===== Symptom ===== */}
              <h3>
                ลักษณะอาการหรือบาดแผล <span className="required">*</span>
              </h3>
              <p className="field-desc">
                อธิบายลักษณะอาการหรือสิ่งผิดปกติที่พบ
              </p>
              <textarea placeholder="ระบุอาการ ตำแหน่ง ลักษณะ ฯลฯ" />

              {/* ===== Food Image Select ===== */}
              <h3>
                อาหารที่รับประทาน <span className="required">*</span>
              </h3>
              <p className="field-desc">
                แตะที่รูปอาหารเพื่อเลือก (เลือกได้ 1 อย่าง)
              </p>

              <div className="food-grid">
                {foodOptions.map(food => (
                  <button
                    key={food.id}
                    type="button"
                    className={`food-card ${
                      selectedFood === food.id ? 'active' : ''
                    }`}
                    onClick={() => setSelectedFood(food.id)}
                  >
                    <img src={food.img} alt={food.name} />
                    <div className="food-name">{food.name}</div>
                  </button>
                ))}
              </div>
              <h3>
                อาหารเพิ่มเติม
              </h3>
              <textarea placeholder="ระบุอาหารเพิ่มเติม" />

              {/* ===== Feeling ===== */}
              <h3>
                ความรู้สึกวันนี้ <span className="required">*</span>
              </h3>
              <p className="field-desc">
                เลือกระดับความรู้สึกของคุณในวันนี้
              </p>

              <div className="choice-group">
                {[
                  { label: 'แย่มาก', emoji: '😞' },
                  { label: 'ไม่ค่อยดี', emoji: '😕' },
                  { label: 'ปกติ', emoji: '😐' },
                  { label: 'ดี', emoji: '🙂' },
                  { label: 'ดีมาก', emoji: '😁' }
                ].map(item => (
                  <button
                    key={item.label}
                    className={`choice-btn ${
                      feeling === item.label ? 'active' : ''
                    }`}
                    onClick={() => setFeeling(item.label)}
                  >
                    {item.emoji} {item.label}
                  </button>
                ))}
              </div>

              {/* ===== Pain Level ===== */}
              <h3>
                ระดับความเจ็บปวด / อาการป่วย <span className="required">*</span>
              </h3>
              <p className="field-desc">
                ประเมินระดับความรุนแรงของอาการ
              </p>

              <div className="choice-group">
                {[
                  { label: 'ไม่เจ็บ', style: 'success' },
                  { label: 'เจ็บน้อย' },
                  { label: 'เจ็บปานกลาง' },
                  { label: 'เจ็บมาก' },
                  { label: 'เจ็บสุด', style: 'danger' }
                ].map(item => (
                  <button
                    key={item.label}
                    className={`choice-btn ${item.style ?? ''} ${
                      painLevel === item.label ? 'active' : ''
                    }`}
                    onClick={() => setPainLevel(item.label)}
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              {/* ===== Upload ===== */}
              <h3>แนบรูปภาพอาการ (ถ้ามี)</h3>
              <p className="field-desc">
                อัปโหลดรูปเพื่อให้แพทย์ประเมินได้ชัดเจน
              </p>

              <div className="upload-box">
                <div className="upload-icon">⬆️</div>
                <p className="upload-text">คลิกเพื่อเลือกไฟล์</p>
                <p className="upload-hint">รองรับ JPG, PNG</p>
                <button className="upload-btn">เลือกรูปภาพ</button>
              </div>

              {/* ===== Buttons ===== */}
              <div className="action-buttons">
                <button className="btn-reset">ล้างข้อมูล</button>
                <button className="btn-submit">ส่งข้อมูลถึงแพทย์</button>
              </div>
            </div>

          </main>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Diary;
