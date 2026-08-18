import { format, addDays, startOfWeek } from "date-fns";
import { emotionColors } from "../../utils/constants";
import { useNavigate } from "react-router-dom";
import "./landing.css";
import mockTrackedData from "../../utils/mockData";

export default function CalendarStrip() {
  const navigate = useNavigate();

  const today = new Date();
  const weekStart = startOfWeek(today, { weekStartsOn: 0 });
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

  const trackedData = mockTrackedData.reduce((acc, item) => {
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
