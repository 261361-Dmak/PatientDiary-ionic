import React, { useCallback, useEffect, useMemo, useState } from "react";
import { IonIcon } from "@ionic/react";
import {
  chevronBackOutline,
  chevronForwardOutline,
} from "ionicons/icons";
import "./test.css";
import { supabase } from "../../supabaseClient";

interface CalendarCell {
  key: string;
  dayNumber: number;
  inCurrentMonth: boolean;
}

const SELECT_COLUMNS =
  "id, diary_date, hobby, symptoms, food, painscore, happiness";

const THAI_WEEKDAYS = ["อา.", "จ.", "อ.", "พ.", "พฤ.", "ศ.", "ส."] as const;

const THAI_MONTHS_SHORT = [
  "ม.ค.",
  "ก.พ.",
  "มี.ค.",
  "เม.ย.",
  "พ.ค.",
  "มิ.ย.",
  "ก.ค.",
  "ส.ค.",
  "ก.ย.",
  "ต.ค.",
  "พ.ย.",
  "ธ.ค.",
] as const;

const toDateKey = (date: Date): string =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(
    date.getDate(),
  ).padStart(2, "0")}`;

const fromDateKey = (key: string): Date => {
  const [year, month, day] = key.split("-").map(Number);
  return new Date(year, month - 1, day);
};

const todayKey = toDateKey(new Date());

const formatThaiMonth = (date: Date): string =>
  `${THAI_MONTHS_SHORT[date.getMonth()]} ${date.getFullYear() + 543}`;

const buildCalendarCells = (monthStart: Date): CalendarCell[] => {
  const year = monthStart.getFullYear();
  const month = monthStart.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();

  const targetCells = firstDay + daysInMonth > 35 ? 42 : 35;

  const cells: CalendarCell[] = [];

  for (let i = firstDay - 1; i >= 0; i--) {
    const day = daysInPrevMonth - i;
    cells.push({
      key: toDateKey(new Date(year, month - 1, day)),
      dayNumber: day,
      inCurrentMonth: false,
    });
  }

  for (let day = 1; day <= daysInMonth; day++) {
    cells.push({
      key: toDateKey(new Date(year, month, day)),
      dayNumber: day,
      inCurrentMonth: true,
    });
  }

  for (let day = 1; cells.length < targetCells; day++) {
    cells.push({
      key: toDateKey(new Date(year, month + 1, day)),
      dayNumber: day,
      inCurrentMonth: false,
    });
  }

  return cells;
};

const TestPage: React.FC = () => {
  const [moods, setMoods] = useState<any>({});
  const [focusedMonth, setFocusedMonth] = useState(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1);
  });
  const [selectedDateKey, setSelectedDateKey] = useState(toDateKey(new Date()));

  const calendarCells = useMemo(
    () => buildCalendarCells(focusedMonth),
    [focusedMonth],
  );

  const goToMonth = (delta: number) => {
    setFocusedMonth(
      (prev) => new Date(prev.getFullYear(), prev.getMonth() + delta, 1),
    );
  };

  const onSelectDay = (cell: CalendarCell) => {
    setSelectedDateKey(cell.key);

    if (!cell.inCurrentMonth) {
      const date = fromDateKey(cell.key);
      setFocusedMonth(new Date(date.getFullYear(), date.getMonth(), 1));
    }
  };

  const getEmojiFromHappiness = (score: number) => {
    switch (score) {
      case 1:
        return "😞";
      case 2:
        return "🙁";
      case 3:
        return "😐";
      case 4:
        return "🙂";
      case 5:
        return "😀";
      default:
        return "";
    }
  };

  const getMoodStatus = (score: number) => {
    switch (score) {
      case 1:
        return "very-bad";
      case 2:
        return "bad";
      case 3:
        return "neutral";
      case 4:
        return "good";
      case 5:
        return "very-good";
      default:
        return "none";
    }
  };

  const loadDiary = async () => {
    const { data, error } = await supabase
      .from("diary")
      .select("diary_date, happiness");

    if (error) {
      console.log("โหลด diary error:", error);
      return;
    }

    if (!data) return;

    const moodMap: any = {};
    data.forEach((item: any) => {
      moodMap[item.diary_date] = {
        emoji: getEmojiFromHappiness(item.happiness),
        status: getMoodStatus(item.happiness),
      };
    });

    console.log("moodMap:", moodMap);

    setMoods(moodMap);
  };

  useEffect(() => {
    loadDiary();
  }, []);

  return (
    <div className="dr-daily-sheet">
      <div className="dr-month-switcher">
        <button className="dr-round-nav" onClick={() => goToMonth(-1)}>
          <IonIcon icon={chevronBackOutline} />
        </button>

        <button className="dr-month-chip">
          {formatThaiMonth(focusedMonth)}
        </button>

        <button className="dr-round-nav" onClick={() => goToMonth(1)}>
          <IonIcon icon={chevronForwardOutline} />
        </button>
      </div>

      <div className="dr-weekdays">
        {THAI_WEEKDAYS.map((day) => (
          <span key={day}>{day}</span>
        ))}
      </div>

      <div className="dr-calendar-grid">
        {calendarCells.map((cell) => {
          const mood = moods[cell.key] || {};
          const emoji = mood.emoji;
          const status = mood.status || "none";

          return (
            <button
              key={cell.key}
              onClick={() => onSelectDay(cell)}
              className={`dr-day-cell ${cell.inCurrentMonth ? "" : "muted"}`}
            >
              <span
                className={`dr-day-circle ${status}
                    ${cell.key === selectedDateKey ? "selected" : ""}
                    ${cell.key === todayKey ? "today" : ""}
                    `}
              >
                <span className="dr-emoji">{emoji}</span>
              </span>

              <span className="dr-day-number">{cell.dayNumber}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default TestPage;
