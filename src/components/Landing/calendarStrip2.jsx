import { format, parseISO, addDays } from "date-fns";
import { emotionColors } from "../../utils/constants";
import { useNavigate } from "react-router-dom";
import "./landing.css";

export default function CalendarStrip() {
  const navigate = useNavigate();

  // Simulate today's date as Friday, 29th November
  const today = parseISO("2024-11-29");

  // Create an array of dates from Sunday, 24th Nov, to Saturday, 30th Nov
  const weekDays = Array.from({ length: 7 }, (_, i) =>
    addDays(parseISO("2024-11-24"), i)
  );

  // Mocked tracked data array and map for date-based emotions
  const trackedDataArray = [
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
      emotion: ["energised", "happy", "insightful", "excited"],
      reason: ["colleagues", "weather", "hobbies"],
      extraNotes: "",
    },
  ];

  const trackedData = trackedDataArray.reduce((acc, item) => {
    acc[item.date] = item.feeling;
    return acc;
  }, {});

  return (
    <div id="calendarStripContainer">
      <div id="dayLabels">
        {weekDays.map((day) => (
          <div className="dayLabel" key={day}>
            {format(day, "EEE").toLocaleUpperCase()}
          </div>
        ))}
      </div>
      <div id="dateTiles">
        {weekDays.map((date) => {
          const dateString = format(date, "yyyyMMdd");
          const emotion = trackedData[dateString] || "white";
          const tileColor = emotionColors[emotion];

          const isToday =
            format(date, "yyyyMMdd") === format(today, "yyyyMMdd");

          return (
            <div
              className={`dateTile ${isToday ? "currentDay" : ""}`}
              key={dateString}
              style={{ backgroundColor: tileColor }}
              onClick={() => {
                navigate(`/tracker/${dateString}`);
              }}
            >
              {format(date, "d")}
            </div>
          );
        })}
      </div>
    </div>
  );
}
