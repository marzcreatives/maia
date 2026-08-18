/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { format, parse } from "date-fns";
import {
  emotionWords,
  emotionTransparentColors,
  emotionAccentColors,
} from "../../utils/constants";
import "./tracker.css";
import mockTrackedData from "../../utils/mockData";

const DataTable = ({ date }) => {
  const navigate = useNavigate();
  const [notes, setNotes] = useState("");

  useEffect(() => {
    if (mockTrackedData && date) {
      const dataForDate = mockTrackedData.find((entry) => entry.date === date);
      if (dataForDate) {
        setNotes(dataForDate.extraNotes || "");
      } else {
        setNotes("");
      }
    }
  }, [date]);

  const handleNoteChange = (newNote) => {
    setNotes(newNote);
  };

  const handleSave = () => {
    const dataForDate = mockTrackedData.find((entry) => entry.date === date);
    if (dataForDate) {
      dataForDate.extraNotes = notes;
      alert("Notes saved successfully!");
      navigate("/tracker");
    } else {
      console.error("No data found for the given date.");
    }
  };

  let formattedDate;
  try {
    const parsedDate = parse(date, "yyyyMMdd", new Date());
    formattedDate = format(parsedDate, "dd MMM yyyy");
  } catch (error) {
    console.error("Invalid date format:", date, error);
    formattedDate = "Invalid date";
  }

  const dataForDate = mockTrackedData.find((entry) => entry.date === date);

  if (!date || !dataForDate) {
    return <p>No data available for this date.</p>;
  }

  const { feeling, emotion, reason } = dataForDate;

  return (
    <div
      className="dataRow"
      style={{
        backgroundColor: feeling
          ? emotionTransparentColors[feeling]
          : emotionTransparentColors["accent"],
      }}
    >
      <p id="dataTitle">
        {`On `}
        <strong>{formattedDate}</strong>
        {`, \nI was feeling `}
        <strong style={{ color: emotionAccentColors[feeling] }}>
          {emotionWords[feeling] || "N/A"}
        </strong>
      </p>
      <p>
        {`I particularly felt...`}
        <br />
        <strong>{emotion ? emotion.join(", ") : "N/A"}</strong>
      </p>
      <p>
        {`These were because of...`}
        <br />
        <strong>{reason ? reason.join(", ") : "N/A"}</strong>.
      </p>
      <p>
        {`Thoughts I saved for later...`}
        <textarea
          value={notes}
          onChange={(e) => handleNoteChange(e.target.value)}
          placeholder="Add your notes here..."
          rows="4"
          className="noteTextarea"
        />
      </p>
      <button onClick={handleSave} className="saveButton">
        Save
      </button>
    </div>
  );
};

export default DataTable;
