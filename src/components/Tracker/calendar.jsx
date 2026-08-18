/* eslint-disable react/prop-types */
import React from "react";
import {
  format,
  startOfMonth,
  endOfMonth,
  addDays,
  startOfWeek,
  endOfWeek,
} from "date-fns";
import { useNavigate } from "react-router-dom";
import { emotionColors } from "../../utils/constants";
import "./tracker.css";

const colors = {
  ...emotionColors,
  bgSecondary: "var(--bgSecondary)",
};

const Calendar = ({ trackedData }) => {
  // Hardset today as 29th November 2024
  const today = new Date("2024-11-29");
  const navigate = useNavigate();

  const getDaysInMonthGrid = (month) => {
    const start = startOfWeek(startOfMonth(month), { weekStartsOn: 0 });
    const end = endOfWeek(addDays(endOfMonth(month), 14), { weekStartsOn: 0 });

    const days = [];
    for (let date = start; date <= end; date = addDays(date, 1)) {
      days.push(date);
    }
    return days;
  };

  const monthDays = getDaysInMonthGrid(today);

  let currentMonth = "";

  return (
    <div id="calendarContainer">
      {monthDays.map((date) => {
        const monthName = format(date, "MMMM");
        const isFirstOfMonth = format(date, "d") === "1";
        const dateString = format(date, "yyyyMMdd");
        const formattedDateForUrl = format(date, "yyyyMMdd");
        const emotion = trackedData[dateString];

        const isToday = format(date, "yyyyMMdd") === format(today, "yyyyMMdd");
        const isFutureDate = date > today;
        const isPastDate = date < today;

        let tileColor;
        if (isFutureDate) {
          tileColor = colors.white;
        } else if (emotion) {
          tileColor = colors[emotion];
        } else if (isPastDate) {
          tileColor = colors.bgSecondary;
        }

        const showMonthName = isFirstOfMonth || monthName !== currentMonth;
        if (showMonthName) {
          currentMonth = monthName;
        }

        return (
          <React.Fragment key={dateString}>
            {showMonthName && <div className="monthHeader">{monthName}</div>}
            <div
              className={`dateTile ${isToday ? "currentDay" : ""}`}
              style={{
                backgroundColor: tileColor,
                cursor: isFutureDate ? "not-allowed" : "pointer",
              }}
              onClick={() => {
                if (!isFutureDate) {
                  navigate(`/tracker/${formattedDateForUrl}`);
                }
              }}
            >
              {format(date, "d")}
            </div>
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default Calendar;
