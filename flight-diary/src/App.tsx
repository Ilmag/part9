import { useEffect, useState } from "react";
import { getAllEntries, addEntry } from "./diaryService";
import { DiaryEntry } from "./types";

const App = () => {
  const [entries, setEntries] = useState<DiaryEntry[]>([]);
  const [date, setDate] = useState<string>("");
  const [weather, setWeather] = useState<string>("");
  const [visibility, setVisibility] = useState<string>("");
  const [comment, setComment] = useState<string>("");
  const [error, setError] = useState<string>("");

  useEffect(() => {
    getAllEntries().then((data) => setEntries(data));
  }, []);

  const createEntry = (e: React.SyntheticEvent) => {
    e.preventDefault();
    addEntry({
      date: date,
      weather: weather,
      visibility: visibility,
      comment: comment,
    }).then((data: unknown) => {
      if (typeof data === "string") {
        setError(data);
        console.log("string", error);
        setTimeout(() => {
          setError("");
        }, 5000);
      } else {
        console.log("object", data);
        entries.concat(data as DiaryEntry);
        setDate("");
        setWeather("");
        setVisibility("");
        setComment("");
      }
    });
  };

  const errorStyle = {
    color: "red",
  };

  console.log(error);
  return (
    <div>
      <h2>Add a new entry</h2>
      <h2 style={errorStyle}>{error}</h2>
      <form onSubmit={createEntry}>
        <p>
          date{" "}
          <input
            type="date"
            value={date}
            onChange={(event) => setDate(event.target.value)}
          />
        </p>
        <div>
          weather sunny{" "}
          <input
            type="radio"
            name="weather"
            onChange={() => setWeather("sunny")}
          />
          rainy{" "}
          <input
            type="radio"
            name="weather"
            onChange={() => setWeather("rainy")}
          />
          cloudy{" "}
          <input
            type="radio"
            name="weather"
            onChange={() => setWeather("cloudy")}
          />
          stormy{" "}
          <input
            type="radio"
            name="weather"
            onChange={() => setWeather("stormy")}
          />
          windy{" "}
          <input
            type="radio"
            name="weather"
            onChange={() => setWeather("windy")}
          />
        </div>
        <div>
          visibility great{" "}
          <input
            type="radio"
            name="visibility"
            onChange={() => setVisibility("great")}
          />
          good{" "}
          <input
            type="radio"
            name="visibility"
            onChange={() => setVisibility("good")}
          />
          ok{" "}
          <input
            type="radio"
            name="visibility"
            onChange={() => setVisibility("ok")}
          />
          poor{" "}
          <input
            type="radio"
            name="visibility"
            onChange={() => setVisibility("poor")}
          />
        </div>
        <p>
          comment{" "}
          <input
            value={comment}
            onChange={(event) => setComment(event.target.value)}
          />
        </p>
        <button type="submit">add</button>
      </form>
      <h2>Diary entries</h2>
      {entries.map((entry) => (
        <div key={entry.id}>
          <h3>{entry.date}</h3>
          <p>Weather: {entry.weather}</p>
          <p>Visibility: {entry.visibility}</p>
          <p>Comment: {entry.comment}</p>
        </div>
      ))}
    </div>
  );
};

export default App;
