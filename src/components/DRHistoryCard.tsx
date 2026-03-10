import { IonCard, IonCardContent } from "@ionic/react";
import "./DRHistoryCard.css";

export interface DRDiaryEntry {
  id: string;
  diary_date: string;
  hobby: string;
  symptoms: string;
  food: string;
  happiness: number;
  painscore: number;

  profiles?: {
    first_name: string;
    last_name: string;
  } | null;
}

const happinessEmoji: Record<number, string> = {
  1: "😞",
  2: "😕",
  3: "😐",
  4: "🙂",
  5: "😁",
};

const painEmoji: Record<number, string> = {
  0: "😊",
  1: "🙂",
  2: "😐",
  3: "😣",
  4: "😭",
};

const foodOptions = [
  { id: 1, name: "ข้าวผัด", icon: "🍚" },
  { id: 2, name: "ข้าวราดแกง", icon: "🍛" },
  { id: 3, name: "ก๋วยเตี๋ยว", icon: "🍜" },
  { id: 4, name: "ข้าวไข่เจียว", icon: "🍳" },
  { id: 5, name: "ส้มตำ", icon: "🥗" },
  { id: 6, name: "ผัดไทย", icon: "🍝" },
  { id: 7, name: "ผัดกะเพรา", icon: "🌿" },
  { id: 8, name: "ข้าวมันไก่", icon: "🍗" },
  { id: 9, name: "ข้าวซอย", icon: "🍲" },
];

const hobbyOptions = [
  { id: "ออกกำลังกาย", label: "ออกกำลังกาย", icon: "🏋️" },
  { id: "ดูทีวี", label: "ดูทีวี", icon: "📺" },
  { id: "ดูหนัง", label: "ดูหนัง", icon: "🎬" },
  { id: "เล่นเกม", label: "เล่นเกม", icon: "🎮" },
  { id: "อ่านหนังสือ", label: "อ่านหนังสือ", icon: "📖" },
  { id: "เดินเล่น", label: "เดินเล่น", icon: "👟" },
  { id: "ฟังเพลง", label: "ฟังเพลง", icon: "🎧" },
  { id: "วาดรูป", label: "วาดรูป", icon: "🎨" },
];

const DRHistoryCard: React.FC<{ entry: DRDiaryEntry }> = ({ entry }) => {
  const formattedDate = new Date(entry.diary_date).toLocaleDateString("th-TH", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const riskLevel =
    entry.painscore >= 3 || entry.happiness <= 2
      ? "high"
      : entry.painscore === 2
        ? "medium"
        : "low";

  const getHobbies = () => {
    if (!entry.hobby) return "-";

    const hobbies = entry.hobby.split(",").map((h) => h.trim());

    return hobbies.map((h, index) => {
      const found = hobbyOptions.find((opt) => opt.id === h);

      return (
        <span key={index} className="emoji-item">
          {found ? `${found.icon} ${found.label}` : h}
        </span>
      );
    });
  };

  const getFood = () => {
    if (!entry.food) return "-";

    const foodId = Number(entry.food);
    const found = foodOptions.find((f) => f.id === foodId);

    return found ? `${found.icon} ${found.name}` : entry.food;
  };

  return (
    <IonCard className={`patient-history   ${riskLevel}`}>
      <IonCardContent>
        <div className="patient-history-header">
          <div className="patient-history-name">
            👤{" "}
            {entry.profiles
              ? `${entry.profiles.first_name} ${entry.profiles.last_name}`
              : "ไม่ทราบชื่อ"}
          </div>

          <div className="patient-history-date">📅 {formattedDate}</div>
        </div>
        <div className="patient-history-grid">
          <div className="patient-history-item">
            <div className="item-icon big-emoji">
              {entry.happiness ? happinessEmoji[entry.happiness] : "-"}
            </div>
            <div className="patient-item-title">ความสุข</div>
          </div>

          <div className="patient-history-item">
            <div className="item-icon big-emoji ">
              {entry.painscore !== null ? painEmoji[entry.painscore] : "-"}
            </div>
            <div className="patient-item-title">ความปวด</div>
          </div>

          <div className="patient-history-item">
            <span className="patient-item-icon">🎯</span>
            <div>
              <div className="patient-item-title">กิจกรรม</div>
              <div className="patient-item-value">{getHobbies()}</div>
            </div>
          </div>

          <div className="patient-history-item">
            <span className="patient-item-icon">🤕</span>
            <div>
              <div className="patient-item-title">อาการ</div>
              <div className="patient-item-value">{entry.symptoms || "-"}</div>
            </div>
          </div>

          <div className="patient-history-item">
            <span className="patient-item-icon">🍽️</span>
            <div>
              <div className="patient-item-title">อาหาร</div>
              <div className="patient-item-value">{getFood()}</div>
            </div>
          </div>

        </div>
      </IonCardContent>
    </IonCard>
  );
};

export default DRHistoryCard;
