import {
  IonCard,
  IonCardContent,
  IonIcon
} from "@ionic/react";
import { documentText } from "ionicons/icons";
import "./HistoryCard.css";

export interface DiaryEntry {
  id: string;
  diary_date: string;
  habits?: string;
  symptoms?: string;
  food?: string;
  painscore?: number;
  happiness?: number;
}

const happinessMap: Record<number, string> = {
  1: "😞 แย่มาก",
  2: "😕 ไม่ค่อยดี",
  3: "😐 ปกติ",
  4: "🙂 ดี",
  5: "😁 ดีมาก",
};

const painScoreMap: Record<number, string> = {
  0: "ไม่เจ็บ",
  1: "เจ็บน้อย",
  2: "เจ็บปานกลาง",
  3: "เจ็บมาก",
  4: "เจ็บสุด",
};

const formatThaiFullDate = (dateString: string) =>
  new Date(dateString).toLocaleDateString("th-TH", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

const HistoryCard: React.FC<{ entry: DiaryEntry }> = ({ entry }) => {
  return (
    <IonCard className="case-card">
      <IonCardContent>

        <div className="case-header">
          <IonIcon icon={documentText} />
          <h3>บันทึก {formatThaiFullDate(entry.diary_date)}</h3>
        </div>

        <div className="case-body">
          <p><strong>พฤติกรรม:</strong> {entry.habits}</p>
          <p><strong>อาการ:</strong> {entry.symptoms}</p>
          <p><strong>อาหาร:</strong> {entry.food}</p>
          <p>
            <strong>ความสุข:</strong>{" "}
            {entry.happiness ? happinessMap[entry.happiness] : "-"}
          </p>
          <p>
            <strong>ความเจ็บ:</strong>{" "}
            {entry.painscore ? painScoreMap[entry.painscore] : "-"}
          </p>
        </div>

      </IonCardContent>
    </IonCard>
  );
};

export default HistoryCard;
