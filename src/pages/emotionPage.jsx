import { useState, useEffect } from "react";
import { Box, Typography, Chip, IconButton } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "../components/header";
import { ArrowForward, KeyboardArrowLeft } from "@mui/icons-material";

const EmotionPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { selectedFeedbackValue } = location.state || {
    selectedFeedbackValue: null,
  };
  const emotions = [
    {
      label: "Anxious",
      color: "var(--veryBad)",
      selectedColor: "var(--veryBadAccent)",
      value: "veryBad",
    },
    {
      label: "Stressed",
      color: "var(--veryBad)",
      selectedColor: "var(--veryBadAccent)",
      value: "veryBad",
    },
    {
      label: "Frustrated",
      color: "var(--veryBad)",
      selectedColor: "var(--veryBadAccent)",
      value: "veryBad",
    },
    {
      label: "Lonely",
      color: "var(--veryBad)",
      selectedColor: "var(--veryBadAccent)",
      value: "veryBad",
    },
    {
      label: "Overwhelmed",
      color: "var(--veryBad)",
      selectedColor: "var(--veryBadAccent)",
      value: "veryBad",
    },
    {
      label: "Guilty",
      color: "var(--bad)",
      selectedColor: "var(--badAccent)",
      value: "veryBad",
    },
    {
      label: "Sad",
      color: "var(--bad)",
      selectedColor: "var(--badAccent)",
      value: "bad",
    },
    {
      label: "Angry",
      color: "var(--bad)",
      selectedColor: "var(--badAccent)",
      value: "bad",
    },
    {
      label: "Tired",
      color: "var(--bad)",
      selectedColor: "var(--badAccent)",
      value: "bad",
    },
    {
      label: "Neutral",
      color: "var(--neutral)",
      selectedColor: "var(--neutralAccent)",
      value: "neutral",
    },
    {
      label: "Insightful",
      color: "var(--neutral)",
      selectedColor: "var(--neutralAccent)",
      value: "neutral",
    },
    {
      label: "Focused",
      color: "var(--neutral)",
      selectedColor: "var(--neutralAccent)",
      value: "neutral",
    },
    {
      label: "Reflective",
      color: "var(--neutral)",
      selectedColor: "var(--neutralAccent)",
      value: "neutral",
    },
    {
      label: "Thoughtful",
      color: "var(--neutral)",
      selectedColor: "var(--neutralAccent)",
      value: "neutral",
    },
    {
      label: "Content",
      color: "var(--good)",
      selectedColor: "var(--goodAccent)",
      value: "good",
    },
    {
      label: "Energised",
      color: "var(--good)",
      selectedColor: "var(--goodAccent)",
      value: "good",
    },
    {
      label: "Relaxed",
      color: "var(--good)",
      selectedColor: "var(--goodAccent)",
      value: "good",
    },
    {
      label: "Cheerful",
      color: "var(--veryGood)",
      selectedColor: "var(--veryGoodAccent)",
      value: "veryGood",
    },
    {
      label: "Optimistic",
      color: "var(--veryGood)",
      selectedColor: "var(--veryGoodAccent)",
      value: "veryGood",
    },
    {
      label: "Proud",
      color: "var(--good)",
      selectedColor: "var(--goodAccent)",
      value: "veryGood",
    },
    {
      label: "Excited",
      color: "var(--veryGood)",
      selectedColor: "var(--veryGoodAccent)",
      value: "veryGood",
    },
    {
      label: "Calm",
      color: "var(--veryGood)",
      selectedColor: "var(--veryGoodAccent)",
      value: "veryGood",
    },
    {
      label: "Happy",
      color: "var(--veryGood)",
      selectedColor: "var(--veryGoodAccent)",
      value: "veryGood",
    },
  ];
  const [selectedEmotions, setSelectedEmotions] = useState([]);
  const [reorderedEmotions, setReorderedEmotions] = useState([]);

  useEffect(() => {
    if (!selectedFeedbackValue || reorderedEmotions.length === 0) {
      const priorityMap = {
        good: ["good", "veryGood", "neutral", "bad", "veryBad"],
        veryGood: ["veryGood", "good", "neutral", "bad", "veryBad"],
        neutral: ["neutral", "bad", "good", "veryGood", "veryBad"],
        bad: ["bad", "veryBad", "neutral", "good", "veryGood"],
        veryBad: ["veryBad", "bad", "neutral", "good", "veryGood"],
      };

      const priorityOrder = priorityMap[selectedFeedbackValue];

      const reordered = emotions.sort((a, b) => {
        return priorityOrder.indexOf(a.value) - priorityOrder.indexOf(b.value);
      });

      setReorderedEmotions(reordered);
    } else {
      setReorderedEmotions(emotions);
    }
  }, [selectedFeedbackValue]);

  const handleFeedbackClick = (index) => {
    setSelectedEmotions((prevSelected) => {
      if (prevSelected.includes(index)) {
        return prevSelected.filter((i) => i !== index);
      } else {
        return [...prevSelected, index];
      }
    });
  };

  const handleBackNavigate = () => {
    navigate(-1);
  };

  const handleNavigate = () => {
    const selectedEmotionObjects = reorderedEmotions.filter((_, index) =>
      selectedEmotions.includes(index)
    );
    const selectedEmotionLabels = selectedEmotionObjects.map(
      (emotion) => emotion.label
    );

    if (selectedFeedbackValue && selectedEmotionLabels.length > 0) {
      const dataForActivities = {
        selectedFeedbackValue: selectedFeedbackValue,
        selectedEmotions: selectedEmotionLabels,
      };

      navigate("/activities", {
        state: {
          feeling: dataForActivities.selectedFeedbackValue,
          emotion: dataForActivities.selectedEmotions,
        },
      });
    } else {
      console.error("Error: Missing data (Feeling or Emotions)");
    }
  };

  return (
    <>
      <Header />
      <IconButton
        onClick={handleBackNavigate}
        sx={{
          marginTop: "80px",
          color: "var(--main)",
        }}
      >
        <KeyboardArrowLeft sx={{ fontSize: "2rem" }} />
      </IconButton>
      <Box sx={{ flex: 1 }}>
        <Typography
          gutterBottom
          sx={{
            color: "var(--dark)",
            fontFamily: "Inter, sans-serif",
            fontSize: { xs: "1.4rem", sm: "2rem", md: "2rem" },
            fontWeight: "600",
            lineHeight: "28px",
            letterSpacing: "-0.02em",
            textAlign: "center",
            margin: "2rem",
            paddingTop: "20px",
            paddingBottom: "50px",
          }}
        >
          What emotions are sitting with you right now?
        </Typography>

        <Box
          sx={{
            width: "80vw",
            maxWidth: "100vw",
            margin: "0 auto",
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: "3vw",
          }}
        >
          {reorderedEmotions.map((emotion, index) => {
            const isSelected = selectedEmotions.includes(index);

            return (
              <Chip
                key={index}
                label={emotion.label}
                onClick={() => handleFeedbackClick(index)}
                sx={{
                  backgroundColor: isSelected
                    ? emotion.selectedColor
                    : emotion.color,
                  color: isSelected ? "#fff" : "#000",
                  fontWeight: isSelected ? "bold" : "normal",
                  cursor: "pointer",
                  transition:
                    "transform 0.2s ease-in-out, background-color 0.3s ease",
                  "&:hover": {
                    transform: "scale(1.1)",
                    backgroundColor: isSelected
                      ? emotion.selectedColor
                      : emotion.color,
                  },
                  fontSize: "14px",
                  lineHeight: "140%",
                  letterSpacing: "0%",
                }}
              />
            );
          })}
        </Box>
      </Box>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "100px",
        }}
      >
        <IconButton
          onClick={handleNavigate}
          sx={{
            color: "var(--main)",
            opacity: selectedEmotions.length === 0 ? 0 : 1,
            pointerEvents: selectedEmotions.length === 0 ? "none" : "auto",
            transition: "opacity 0.3s ease",
          }}
          disabled={selectedEmotions.length === 0}
        >
          <ArrowForward sx={{ fontSize: "2rem", transform: "scaleX(1.5)" }} />
        </IconButton>
      </div>
    </>
  );
};

export default EmotionPage;
