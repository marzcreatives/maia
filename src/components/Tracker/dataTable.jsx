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

// Mock Data
const mockTrackedData = [
  {
    date: "20241028",
    feeling: "veryBad",
    emotion: ["stressed", "overwhelmed"],
    reason: ["work", "news"],
    extraNotes: "Felt really stressed due to workload. News wasn't helpful.",
  },
  {
    date: "20241029",
    feeling: "neutral",
    emotion: ["neutral", "thoughtful"],
    reason: ["family", "nature"],
    extraNotes:
      "A typical day, had some reflective moments while spending time with family.",
  },
  {
    date: "20241103",
    feeling: "neutral",
    emotion: ["neutral", "focused"],
    reason: ["work", "fitness"],
    extraNotes: "Stayed focused on work and fitness goals.",
  },
  {
    date: "20241104",
    feeling: "good",
    emotion: ["content", "relaxed"],
    reason: ["hobbies", "reading"],
    extraNotes: "A good day with hobbies and relaxing reading time.",
  },
  {
    date: "20241105",
    feeling: "neutral",
    emotion: ["neutral", "insightful"],
    reason: ["work", "journaling"],
    extraNotes: "Spent time journaling, which brought some insights.",
  },
  {
    date: "20241106",
    feeling: "bad",
    emotion: ["tired", "sad"],
    reason: ["work", "health"],
    extraNotes: "Felt tired and sad, possibly due to health issues.",
  },
  {
    date: "20241107",
    feeling: "neutral",
    emotion: ["neutral", "reflective"],
    reason: ["journaling", "nature"],
    extraNotes: "A day of reflection and time spent in nature.",
  },
  {
    date: "20241108",
    feeling: "neutral",
    emotion: ["neutral", "focused"],
    reason: ["work", "education"],
    extraNotes: "Focused on work and educational reasons.",
  },
  {
    date: "20241109",
    feeling: "good",
    emotion: ["happy", "content"],
    reason: ["meditation", "reading", "walking"],
    extraNotes: "Had a productive day, felt positive throughout.",
  },
  {
    date: "20241110",
    feeling: "bad",
    emotion: ["angry", "tired"],
    reason: ["work", "family"],
    extraNotes: "Felt angry and tired, possibly due to family issues.",
  },
  {
    date: "20241111",
    feeling: "bad",
    emotion: ["sad", "overwhelmed"],
    reason: ["work", "organizing"],
    extraNotes: "Felt overwhelmed by too many tasks.",
  },
  {
    date: "20241112",
    feeling: "veryBad",
    emotion: ["stressed", "anxious"],
    reason: ["work", "health"],
    extraNotes: "High anxiety and stress from work and health concerns.",
  },
  {
    date: "20241116",
    feeling: "veryGood",
    emotion: ["cheerful", "optimistic"],
    reason: ["celebration", "dancing"],
    extraNotes: "Joyful day spent celebrating with friends.",
  },
  {
    date: "20241117",
    feeling: "good",
    emotion: ["happy", "content"],
    reason: ["meditation", "cooking"],
    extraNotes: "Good day with positive emotion.",
  },
  {
    date: "20241119",
    feeling: "veryBad",
    emotion: ["stressed", "frustrated"],
    reason: ["work", "news"],
    extraNotes: "Very stressful and frustrating day due to work and news.",
  },
  {
    date: "20241120",
    feeling: "veryBad",
    emotion: ["anxious", "overwhelmed"],
    reason: ["work", "health"],
    extraNotes: "Anxiety and overwhelming workload.",
  },
  {
    date: "20241121",
    feeling: "bad",
    emotion: ["sad", "guilty"],
    reason: ["work", "cleaning"],
    extraNotes: "Felt sad and guilty over unfinished tasks.",
  },
  {
    date: "20241122",
    feeling: "neutral",
    emotion: ["neutral", "reflective"],
    reason: ["journaling", "light exercise"],
    extraNotes: "A day for self-reflection, felt calm and collected.",
  },
  {
    date: "20241123",
    feeling: "veryBad",
    emotion: ["anxious", "lonely"],
    reason: ["work", "spirituality"],
    extraNotes:
      "Very anxious and felt lonely, spent time on spiritual reasons.",
  },
  {
    date: "20241124",
    feeling: "bad",
    emotion: ["sad", "overwhelmed"],
    reason: ["cleaning", "organizing"],
    extraNotes:
      "Felt stressed due to too many things to do. Need to plan better.",
  },
  {
    date: "20241125",
    feeling: "veryGood",
    emotion: ["happy", "proud"],
    reason: ["work", "family"],
    extraNotes:
      "Felt very proud of work achievements and had good family time.",
  },
  {
    date: "20241126",
    feeling: "good",
    emotion: ["happy", "content", "optimistic"],
    reason: ["meditation", "reading", "walking"],
    extraNotes: "Had a productive day, felt positive throughout.",
  },
  {
    date: "20241127",
    feeling: "veryBad",
    emotion: ["stressed", "frustrated"],
    reason: ["work", "news"],
    extraNotes: "High stress and frustration from work and news.",
  },
  {
    date: "20241128",
    feeling: "bad",
    emotion: ["angry", "tired"],
    reason: ["work", "health"],
    extraNotes: "Felt angry and tired, likely due to health issues.",
  },
  {
    date: "20241129",
    feeling: "good",
    emotion: ["energised", "excited", "insightful", "energised"],
    reason: ["colleagues", "weather", "hobbies"],
    extraNotes: "",
  },
];

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
