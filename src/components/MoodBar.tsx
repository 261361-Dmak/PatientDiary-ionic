import React from "react";
import "./MoodBar.css";

export interface MoodBarRecord {
  happiness: number | null;
}

export interface MoodBarItem {
  score: number;
  emoji: string;
  label: string;
  percent: number;
  active?: boolean;
}

export interface MoodBarProps {
  items?: MoodBarItem[];
  title?: string;
}

const MOOD_CATALOG: Array<Omit<MoodBarItem, "percent">> = [
  { score: 5, emoji: "😀", label: "ดีมาก" },
  { score: 4, emoji: "🙂", label: "ดี" },
  { score: 3, emoji: "😐", label: "เฉยๆ" },
  { score: 2, emoji: "🙁", label: "ไม่ดี" },
  { score: 1, emoji: "😞", label: "แย่" },
];

const fallbackItems: MoodBarItem[] = MOOD_CATALOG.map((mood, idx) => ({
  ...mood,
  percent: idx === 0 ? 100 : 0,
  active: idx === 0,
}));

export const mapRecordsToMoodBarItems = (
  records: MoodBarRecord[],
): MoodBarItem[] => {
  const scores = records
    .map((record) => record.happiness)
    .filter((score): score is number => score !== null && score >= 1 && score <= 5);

  if (scores.length === 0) return fallbackItems;

  const total = scores.length;
  return MOOD_CATALOG.map((mood) => {
    const count = scores.filter((score) => score === mood.score).length;
    return {
      ...mood,
      percent: Math.round((count / total) * 100),
      active: false,
    };
  });
};

const MoodBar: React.FC<MoodBarProps> = ({ items, title = "Mood Bar" }) => {
  const summary = items && items.length > 0 ? items : fallbackItems;
  const autoActiveScore = summary.reduce(
    (best, item) => (item.percent > best.percent ? item : best),
    summary[0],
  ).score;

  const displaySummary = summary.map((item) => ({
    ...item,
    active: item.active ?? item.score === autoActiveScore,
  }));

  const totalPercent = displaySummary.reduce((sum, item) => sum + item.percent, 0) || 1;
  const weightedTotal = displaySummary.reduce(
    (sum, item) => sum + item.score * item.percent,
    0,
  );
  const averagePercent = (weightedTotal / totalPercent / 5) * 100;

  return (
    <section className="mood-bar-card">
      <div className="mood-bar-head">
        <h2>{title}</h2>
      </div>

      <div className="mood-bar-grid">
        {displaySummary.map((item) => (
          <div key={item.score} className="mood-bar-item">
            <div className={`mood-emoji ${item.active ? "active" : ""}`}>
              {item.emoji}
            </div>
            <span className={`mood-emoji-label ${item.active ? "active" : ""}`}>
              {item.label}
            </span>
            <span className={`mood-percent ${item.active ? "active" : ""}`}>
              {item.percent}%
            </span>
          </div>
        ))}
      </div>

      <div className="mood-total-track">
        <div
          className="mood-total-fill"
          style={{ width: `${averagePercent}%` }}
        />
      </div>
    </section>
  );
};

export default MoodBar;
