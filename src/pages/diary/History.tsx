import React, { useEffect, useState } from 'react';
import { IonPage, IonContent, IonIcon, IonCard, IonCardContent, IonSearchbar, IonModal, IonDatetime, IonButton, IonHeader, IonToolbar, IonTitle, IonButtons, IonBackButton } from '@ionic/react';
import { documentText, personCircleOutline, calendarOutline, arrowBack } from 'ionicons/icons';
import './History.css';
import { useHistory } from 'react-router-dom';

interface MedicalCase {
  id: string;
  date: string;
  daysAgo: number;
  status: 'answered' | 'pending';
  medications: string;
  symptoms: string;
  doctorResponse?: string;
}

const mockCases: MedicalCase[] = [
  {
    id: '1',
    date: '15 มกราคม 2568',
    daysAgo: 2,
    status: 'answered',
    medications: 'ออกกำลังกายสม่ำเสมอ 3 ครั้งต่อสัปดาห์ กินอาหารที่มีประโยชน์ นอนหลับพักผ่อนเพียงพอ',
    symptoms: 'มีอาการปวดหัวเล็กน้อยเป็นครั้งคราว โดยเฉพาะตอนเช้า อาจเกิดจากความเครียด',
    doctorResponse: 'แพทย์แนะนำให้พักผ่อนให้เพียงพอ ดื่มน้ำให้มาก หลีกเลี่ยงความเครียด หากอาการไม่ดีขึ้นภายใน 3 วันกรุณามาตรวจที่คลินิก'
  },
  {
    id: '2',
    date: '10 มกราคม 2568',
    daysAgo: 7,
    status: 'answered',
    medications: 'ทำงานที่โต๊ะคอมพิวเตอร์ตลอดวัน นั่งนาน ออกกำลังกายน้อย',
    symptoms: 'ปวดหลังส่วนล่างมาก 3 วัน จากการนั่งทำงานนาน อาการเจ็บเมื่อลุกขึ้นยืนหรือก้มตัว',
    doctorResponse: 'แพทย์แนะนำให้ยืดเหยียดร่างกายทุก 1 ชั่วโมง ใช้เก้าอี้ที่รองรับหลัง พิจารณาใช้ยาแก้ปวดชนิดไม่มีสเตียรอยด์ กรณีอาการไม่ดีขึ้นให้มาตรวจพร้อมเอกซเรย์'
  },
  {
    id: '3',
    date: '5 มกราคม 2568',
    daysAgo: 12,
    status: 'answered',
    medications: 'กินอาหารรสจัดบ่อย ดื่มกาแฟวันละ 3-4 แก้ว นอนดึก',
    symptoms: 'แผลไหม้จากน้ำร้อนที่แขนขวา ขนาด 3x5 ซม. แดง บวม เจ็บปวดมาก วันที่ 1',
    doctorResponse: 'ทำความสะอาดด้วยน้ำสะอาด ทายาแก้อักเสบ ปิดแผลให้เรียบร้อย เปลี่ยนผ้าพันแผลทุกวัน หลีกเลี่ยงน้ำ หากมีหนอง ไข้ หรือแดงบวมขึ้นให้มาพบแพทย์ทันที'
  },
  {
    id: '4',
    date: '3 มกราคม 2568',
    daysAgo: 14,
    status: 'pending',
    medications: 'ทำงานหนัก นอนดึก ความเครียดสูง',
    symptoms: 'มีผื่นคันที่แขนและขา คันมากในตอนกลางคืน อาจเป็นจากอากาศหนาว',
  }
];

useEffect(() => {
  const fetchdata = async () => {
    // Placeholder for future data fetching logic
  }
  document.title = "Diary History - Patient Diary";
}, []);

const CaseCard: React.FC<{ case: MedicalCase }> = ({ case: c }) => (
  <IonCard className="case-card">
    <IonCardContent>
      <div className="case-header-padding">
        <div className="case-header-row">
          <div className="case-header-left">
            <div className="case-icon">
              <IonIcon icon={documentText} />
            </div>
            <h3 className="case-title">บันทึกวันที่ {c.date}</h3>
          </div>
          <span className="status-text">
            {c.status === 'answered' ? 'แพทย์ตอบแล้ว' : 'รอคำตอบ'}
          </span>
        </div>
      </div>

      <div className="card-divider"></div>

      <div className="case-body">
        {c.medications && (
          <>
            <span className="info-label">พฤติกรรม:</span>
            <p className="info-value">{c.medications}</p>
          </>
        )}
        <span className="info-label">อาการ:</span>
        <p className="info-value">{c.symptoms}</p>
      </div>

      {c.doctorResponse && (
        <div className="doctor-response-box">
          <div className="doctor-title">
            <IonIcon icon={personCircleOutline} />
            แพทย์ ตอบกลับ:
          </div>
          <p className="doctor-desc">{c.doctorResponse}</p>
        </div>
      )}
    </IonCardContent>
  </IonCard>
);

const History: React.FC = () => {
  const history = useHistory();
  const [searchText, setSearchText] = useState('');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [showDatePicker, setShowDatePicker] = useState(false);

  const formatThaiDate = (dateString: string) => {
    if (!dateString) return 'DD/MM/YYYY';
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear() + 543;
    return `${day}/${month}/${year}`;
  };

  const handleDateChange = (e: CustomEvent) => {
    const value = e.detail.value;
    setSelectedDate(value);
    setShowDatePicker(false);
  };

  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar className="history-header">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/dashboard" text="ย้อนกลับ" className="custom-back-btn"/>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent className="history-content">
        <div className="history-header-section">
          <h1 className="history-title">ประวัติการบันทึก</h1>
          <p className="history-subtitle">ดูประวัติการบันมึกและการตอบกลับของแพทย์</p>
        </div>

        <div className="filter-card">
          <IonSearchbar
            className="custom-searchbar"
            placeholder="Search by symptoms or habits..."
            value={searchText}
            onIonInput={(e) => setSearchText(e.detail.value!)}
          />
          <div className="date-filter-box" onClick={() => setShowDatePicker(true)}>
            <span>{formatThaiDate(selectedDate)}</span>
            <IonIcon icon={calendarOutline} style={{marginLeft: '8px'}} />
          </div>
        </div>

        <div className="cases-list">
          {mockCases.map((c) => (
            <CaseCard key={c.id} case={c} />
          ))}
        </div>

        {mockCases.length > 0 && (
          <div className="pagination-info">
            แสดง {mockCases.length} จาก {mockCases.length} บันทึก
          </div>
        )}

        {mockCases.length === 0 && (
          <div className="empty-state">
            <IonIcon icon={documentText} className="empty-icon" />
            <p>ยังไม่มีการบันทึก</p>
          </div>
        )}

        <IonModal 
          isOpen={showDatePicker} 
          onDidDismiss={() => setShowDatePicker(false)}
          className="date-picker-modal"
        >
          <div className="date-picker-container">
            <h2 className="date-picker-title">เลือกวัน</h2>
            <IonDatetime
              presentation="date"
              value={selectedDate}
              onIonChange={handleDateChange}
              locale="th-TH"
              firstDayOfWeek={0}
            />
            <IonButton 
              expand="block" 
              onClick={() => setShowDatePicker(false)}
              className="date-picker-close-btn"
            >
              ปิด
            </IonButton>
          </div>
        </IonModal>
      </IonContent>
    </IonPage>
  );
};

export default History;
