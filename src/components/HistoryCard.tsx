import { IonCard, IonCardContent } from "@ionic/react";
import "./HistoryCard.css";

export interface DiaryEntry {
  id: string;
  diary_date: string;
  hobby: string;
  symptoms: string;
  food: string;
  happiness: number;
  painscore: number;
  image_url: string | null;
}

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
  { id: "นั่งสมาธิ", label: "นั่งสมาธิ", icon: "🧘" },
  { id: "อ่านหนังสือ", label: "อ่านหนังสือ", icon: "📖" },
  { id: "เดินเล่น", label: "เดินเล่น", icon: "👟" },
  { id: "ฟังเพลง", label: "ฟังเพลง", icon: "🎧" },
  { id: "วาดรูป", label: "วาดรูป", icon: "🎨" },
];

const happinessEmoji: Record<number, string> = {
  1: "😞",
  2: "😕",
  3: "😐",
  4: "🙂",
  5: "😁",
};

const HAPPINESS_LABELS: Record<number, string> = {
  1: "แย่",
  2: "ไม่ค่อยดี",
  3: "ปกติ",
  4: "ดี",
  5: "ดีมาก",
};

const painEmoji: Record<number, string> = {
  0: "😊",
  1: "🙂",
  2: "😐",
  3: "😣",
  4: "😭",
};

const PAIN_LABELS: Record<number, string> = {
  0: "ไม่เจ็บ",
  1: "เจ็บน้อย",
  2: "ปานกลาง",
  3: "เจ็บมาก",
  4: "เจ็บมากที่สุด",
};

const HistoryCard: React.FC<{ entry: DiaryEntry }> = ({ entry }) => {
  const formattedDate = new Date(entry.diary_date).toLocaleDateString("th-TH", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

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

  const getimage = () => {
    if (!entry.image_url) return "-";

    return <img src={entry.image_url} alt="Diary" className="history-image" />;
  };

  return (
    <IonCard className="history-card">
      <IonCardContent>
        <div className="history-date">📅 {formattedDate}</div>

        <div className="history-grid">
          <div className="history-item">
            <span className="item-icon big-emoji">
              {entry.happiness ? happinessEmoji[entry.happiness] : "-"}
            </span>
            <div>
              <div className="item-title">ความสุข</div>
              <div className="item-value">
                {entry.happiness ? HAPPINESS_LABELS[entry.happiness] : "-"}
              </div>
            </div>
          </div>

          <div className="history-item">
            <span className="item-icon big-emoji">
              {entry.painscore !== null ? painEmoji[entry.painscore] : "-"}
            </span>
            <div>
              <div className="item-title">ความปวด</div>
              <div className="item-value">
                {entry.painscore !== null ? PAIN_LABELS[entry.painscore] : "-"}
              </div>
            </div>
          </div>

          <div className="history-item">
            <span className="item-icon">🎯</span>
            <div>
              <div className="item-title">กิจกรรม</div>
              <div className="item-value">{getHobbies()}</div>
            </div>
          </div>

          <div className="history-item">
            <span className="item-icon">🤕</span>
            <div>
              <div className="item-title">อาการ</div>
              <div className="item-value">{entry.symptoms || "-"}</div>
            </div>
          </div>

          <div className="history-item">
            <span className="item-icon">🍽</span>
            <div>
              <div className="item-title">อาหาร</div>
              <div className="item-value">{getFood()}</div>
            </div>
          </div>

          <div className="history-item">
            <span className="item-icon">🖼</span>
            <div>
              <div className="item-title">รูปภาพ</div>
              <div className="item-value">{getimage()}</div>
            </div>
          </div>
        </div>
      </IonCardContent>
    </IonCard>
  );
};

export default HistoryCard;
