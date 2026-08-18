/* eslint-disable react/prop-types */
import React from "react";
import { useNavigate } from "react-router-dom";
import { emotionAccentColors, emotionWords } from "../../utils/constants";
import "./landing.css";

export default function LandingCard({ image, align, text, data, link }) {
  const navigate = useNavigate();

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayString = yesterday.toISOString().split("T")[0];
  const yesterdayEmotion =
    data && data[yesterdayString] ? data[yesterdayString] : "neutral";

  const emotionWord = emotionWords[yesterdayEmotion];
  const formattedText =
    text && text.includes("{}") ? text.replace("{}", emotionWord) : text;

  const handleCardClick = () => {
    if (link) {
      if (link.startsWith("http")) {
        window.location.href = link;
      } else {
        navigate(link);
      }
    }
  };

  return (
    <div className="landingCard" onClick={handleCardClick}>
      <img src={image} alt="Card background" className="cardImage" />
      <div className={`cardText ${align}`}>
        {formattedText.split(emotionWord).map((segment, index) => (
          <React.Fragment key={index}>
            {segment}
            {index < formattedText.split(emotionWord).length - 1 && (
              <span style={{ color: emotionAccentColors["bad"] }}>
                {emotionWords["bad"]}
              </span>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
