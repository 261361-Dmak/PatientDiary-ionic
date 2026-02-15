import React, { useMemo } from "react";
import "./MoodFlow.css";

export interface MoodFlowPoint {
  dateLabel: string;
  moodLevel: number | null;
}

export interface MoodFlowRecord {
  diary_date: string;
  happiness: number | null;
}

export interface MoodFlowProps {
  points?: MoodFlowPoint[];
  title?: string;
}

const DEFAULT_DATE_TICKS = [
  "2/1",
  "2/6",
  "2/11",
  "2/16",
  "2/21",
  "2/26",
  "3/1",
];
const MOOD_SCALE = [
  { color: "#ffcc02", emoji: "😀" },
  { color: "#8bc34a", emoji: "🙂" },
  { color: "#4caf50", emoji: "😐" },
  { color: "#2e7d32", emoji: "🙁" },
  { color: "#90a4ae", emoji: "😞" },
];

const formatDateTick = (dateString: string): string => {
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return dateString;
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${month}/${day}`;
};

const levelToTopPercent = (level: number): string =>
  `${((5 - Math.max(1, Math.min(5, level))) / 4) * 100}%`;

export const mapRecordsToMoodFlowPoints = (
  records: MoodFlowRecord[],
): MoodFlowPoint[] => {
  return records.map((record) => ({
    dateLabel: formatDateTick(record.diary_date),
    moodLevel: record.happiness,
  }));
};

const fallbackPoints: MoodFlowPoint[] = DEFAULT_DATE_TICKS.map(
  (dateLabel, idx) => ({
    dateLabel,
    moodLevel: idx === 1 ? 3 : idx === 3 ? 4 : idx === 5 ? 2 : null,
  }),
);

const calcAverage = (points: MoodFlowPoint[]): number | null => {
  const validLevels = points
    .map((point) => point.moodLevel)
    .filter((level): level is number => level !== null);
  if (validLevels.length === 0) return null;
  return (
    validLevels.reduce((sum, level) => sum + level, 0) / validLevels.length
  );
};

type Trend = "up" | "same" | "down";

const computeTrend = (points: MoodFlowPoint[]): Trend => {
  const middle = Math.ceil(points.length / 2);
  const firstHalfAvg = calcAverage(points.slice(0, middle));
  const secondHalfAvg = calcAverage(points.slice(middle));
  if (firstHalfAvg === null || secondHalfAvg === null) return "same";

  const diff = secondHalfAvg - firstHalfAvg;
  if (diff > 0.3) return "up";
  if (diff < -0.3) return "down";
  return "same";
};

const trendInfo: Record<Trend, { icon: string; label: string; cls: string }> = {
  up: { icon: "↑", label: "ดีขึ้น", cls: "trend-up" },
  same: { icon: "→", label: "คงที่", cls: "trend-same" },
  down: { icon: "↓", label: "แย่ลง", cls: "trend-down" },
};

const getMoodEmoji = (avg: number | null): string => {
  if (avg === null) return "—";
  if (avg >= 4.5) return "😀";
  if (avg >= 3.5) return "🙂";
  if (avg >= 2.5) return "😐";
  if (avg >= 1.5) return "🙁";
  return "😞";
};

const MoodFlow: React.FC<MoodFlowProps> = ({ points, title = "Mood Flow" }) => {
  const displayPoints = points && points.length > 0 ? points : fallbackPoints;
  const { avg, trend } = useMemo(
    () => ({
      avg: calcAverage(displayPoints),
      trend: computeTrend(displayPoints),
    }),
    [displayPoints],
  );

  const t = trendInfo[trend];

  return (
    <section className="mood-flow-card">
      <div className="mood-flow-head">
        <h2>{title}</h2>
      </div>

      <div className="mood-flow-body">
        <div className="mood-flow-scale">
          {MOOD_SCALE.map((item, idx) => (
            <span
              key={`${item.color}-${idx}`}
              className="mood-scale-dot"
              style={{ backgroundColor: item.color }}
              title={item.emoji}
            />
          ))}
        </div>

        <div className="mood-flow-plot">
          {displayPoints.map((point) => (
            <div key={point.dateLabel} className="mood-flow-col">
              <div className="mood-flow-line">
                {point.moodLevel !== null && (
                  <span
                    className="mood-flow-point"
                    style={{ top: levelToTopPercent(point.moodLevel) }}
                  />
                )}
              </div>
              <span className="mood-flow-day">{point.dateLabel}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ---- Stats ---- */}
      <div className="mood-stats-section">
        <h3 className="mood-stats-title">Mood Trend</h3>
        <div className="mood-stats-row">
          <div className="mood-stat-box">
            <span className="mood-stat-emoji">{getMoodEmoji(avg)}</span>
            <div className="mood-stat-detail">
              <span className="mood-stat-label">อารมณ์เฉลี่ย</span>
              <span className="mood-stat-value">
                {avg !== null ? avg.toFixed(1) : "—"}
                <small> / 5</small>
              </span>
            </div>
          </div>
          <div className={`mood-stat-box ${t.cls}`}>
            <span className="mood-stat-icon">{t.icon}</span>
            <div className="mood-stat-detail">
              <span className="mood-stat-label">
                Mood Trend (7 วันล่าสุด เทียบกับ 7 วันก่อนหน้า)
              </span>
              <span className="mood-stat-value">{t.label}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MoodFlow;
