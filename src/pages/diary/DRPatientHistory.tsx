import { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";
import "./DRPatientHistory.css";

export default function DRPatientHistory() {

  const [diary, setDiary] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDiary();
  }, []);

  async function fetchDiary() {
    const { data, error } = await supabase
      .from("diary")
      .select("*")
      .order("diary_date", { ascending: false });

    if (error) {
      console.log("Error:", error);
    } else {
      setDiary(data || []);
    }

    setLoading(false);
  }

  return (
  <div className="container">
    <h1>Patient History</h1>

    {loading && <p>Loading...</p>}

    {diary.map((item) => (
      <div className="card" key={item.id}>
        <h3>{item.diary_date}</h3>

        <p>
          <b>Symptoms:</b> {item.symptoms}
        </p>

        <p>
          <b>Hobby:</b> {item.hobby}
        </p>

        <p>
          <b>Food:</b> {item.food}
        </p>

      </div>
    ))}
  </div>
);
}