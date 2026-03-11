import React, { useEffect, useState } from "react";
import "./DiaryCalender.css";
import { IonPage, IonContent } from "@ionic/react";
import { supabase } from "../supabaseClient";

const DiaryCalender: React.FC = () => {
  const [moods, setMoods] = useState<any>({});
  const today = new Date();
  const [currentDate, setCurrentDate] = useState(new Date());

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay();

  const todayStr = today.toLocaleDateString("sv-SE", {
    timeZone: "Asia/Bangkok",
  });

  const prevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  // ⭐ แปลงเลข happiness → emoji
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
      moodMap[item.diary_date] = getEmojiFromHappiness(item.happiness);
    });

    setMoods(moodMap);
  };

  useEffect(() => {
    loadDiary();
  }, []);

  const renderDays = () => {
    const days = [];

    // จำนวนช่องทั้งหมด 6 week * 7 day
    const totalCells = 42;

    for (let i = 0; i < totalCells; i++) {
      const dayNumber = i - firstDay + 1;

      if (dayNumber < 1 || dayNumber > daysInMonth) {
        days.push(<div key={"empty-" + i}></div>);
        continue;
      }

      const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(
        dayNumber,
      ).padStart(2, "0")}`;

      const emoji = moods[dateStr];
      const isToday = dateStr === todayStr;

      days.push(
        <div key={i} className="day-wrapper">
          <div className={`circle ${isToday ? "today" : ""}`}>
            {emoji && <span className="emoji">{emoji}</span>}
          </div>
          <div className="day-number">{dayNumber}</div>
        </div>,
      );
    }

    return days;
  };

  return (
    <IonPage>
      <IonContent fullscreen className="calendar-content">
        <div className="calendar-container">
          <div className="month-header">
            <button onClick={prevMonth}>◀</button>

            <h2 className="month-title">
              {currentDate.toLocaleString("default", { month: "long" })} {year}
            </h2>

            <button onClick={nextMonth}>▶</button>
          </div>

          <div className="week-header">
            <span>อา.</span>
            <span>จ.</span>
            <span>อ.</span>
            <span>พ.</span>
            <span>พฤ.</span>
            <span>ศ.</span>
            <span>ส.</span>
          </div>

          <div className="calendar-grid">{renderDays()}</div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default DiaryCalender;
