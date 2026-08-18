import { useState } from "react";
import { Box, Typography, Chip, IconButton } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "../components/header";
import { ArrowForward, KeyboardArrowLeft } from "@mui/icons-material";
import axios from "axios";

const icons = {};
const modules = import.meta.glob("../assets/icons/*.svg", { eager: true });

for (const path in modules) {
  const iconName = path.split("/").pop().replace(".svg", "");
  icons[iconName] = modules[path].default;
}

const ActivitiesPage = () => {
  const [selectedFeedback, setSelectedFeedback] = useState([]);

  const navigate = useNavigate();

  const location = useLocation();
  const { feeling, emotion } = location.state || {
    feeling: null,
    emotion: null,
  };

  // Log location.state to debug
  console.log("Location State:", location.state);

  const { selectedFeedbackValue, selectedEmotions } = location.state
    ?.dataForActivities || {
    selectedFeedbackValue: "",
    selectedEmotions: [],
  };

  // Log the values to verify
  console.log("Selected Feedback Value in Activities:", selectedFeedbackValue);
  console.log("Selected Emotions in Activities:", selectedEmotions);

  const activities = [
    {
      icon: icons["Family"],
      label: "Family",
      color: "var(--veryGood)",
      selectedColor: "var(--veryGoodAccent)",
    },
    {
      icon: icons["Work"],
      label: "Work",
      color: "var(--veryGood)",
      selectedColor: "var(--veryGoodAccent)",
    },
    {
      icon: icons["Partner"],
      label: "Partner",
      color: "var(--good)",
      selectedColor: "var(--goodAccent)",
    },
    {
      icon: icons["Colleagues"],
      label: "Colleagues",
      color: "var(--veryBad)",
      selectedColor: "var(--veryBadAccent)",
    },
    {
      icon: icons["Finances"],
      label: "Finances",
      color: "var(--neutral)",
      selectedColor: "var(--neutralAccent)",
    },
    {
      icon: icons["News"],
      label: "News",
      color: "var(--veryGood)",
      selectedColor: "var(--veryGoodAccent)",
    },
    {
      icon: icons["Hobbies"],
      label: "Hobbies",
      color: "var(--good)",
      selectedColor: "var(--goodAccent)",
    },
    {
      icon: icons["Weather"],
      label: "Weather",
      color: "var(--veryGood)",
      selectedColor: "var(--veryGoodAccent)",
    },
    {
      icon: icons["Health"],
      label: "Health",
      color: "var(--neutral)",
      selectedColor: "var(--neutralAccent)",
    },
    {
      icon: icons["Education"],
      label: "Education",
      color: "var(--veryGood)",
      selectedColor: "var(--veryGoodAccent)",
    },
    {
      icon: icons["Spirituality"],
      label: "Spirituality",
      color: "var(--veryBad)",
      selectedColor: "var(--veryBadAccent)",
    },
    {
      icon: icons["Pets"],
      label: "Pets",
      color: "var(--neutral)",
      selectedColor: "var(--neutralAccent)",
    },
    {
      icon: icons["Travel"],
      label: "Travel",
      color: "var(--veryBad)",
      selectedColor: "var(--veryBadAccent)",
    },
    {
      icon: icons["Nature"],
      label: "Nature",
      color: "var(--neutral)",
      selectedColor: "var(--neutralAccent)",
    },
    {
      icon: icons["Fitness"],
      label: "Fitness",
      color: "var(--veryGood)",
      selectedColor: "var(--veryGoodAccent)",
    },
  ];

  const handleFeedbackClick = (index) => {
    setSelectedFeedback((prevSelected) => {
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

  const handleNavigate = async () => {
    const selectedActivitiesLabels = selectedFeedback.map(
      (index) => activities[index].label
    );
    const postData = {
      feeling,
      emotion,
      reason: selectedActivitiesLabels,
    };
    const dataForMaia = {
      selectedFeedbackValue: feeling,
      selectedEmotions: emotion,
      selectedActivityLabels: selectedActivitiesLabels,
    };
    console.log("maia data", dataForMaia);
    try {
      console.log("here", postData);
      await axios.post("http://localhost:3001/api/user-feelings/", postData);
      navigate("/maia", { state: dataForMaia });
    } catch (error) {
      console.error("Error submitting data:", error);
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
          Which moments or activities shaped your opinions of today?
        </Typography>

        <Box
          sx={{
            width: "80vw",
            maxWidth: "100vw",
            margin: "0 auto",
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: "1vw",
          }}
        >
          {activities.map((activity, index) => (
            <span key={index} onClick={() => handleFeedbackClick(index)}>
              <Chip
                label={activity.label}
                icon={
                  activity.icon && (
                    <img
                      src={activity.icon}
                      alt={activity.label}
                      style={{
                        width: "20px",
                        height: "20px",
                        filter: selectedFeedback.includes(index)
                          ? "invert(98%) sepia(100%) saturate(0%) hue-rotate(338deg) brightness(104%) contrast(103%)"
                          : "invert(0) brightness(0) saturate(100%)",
                      }}
                    />
                  )
                }
                sx={{
                  "&:hover": {
                    transform: "scale(1.1)",
                    backgroundColor: selectedFeedback.includes(index)
                      ? activity.selectedColor
                      : activity.color,
                  },
                }}
                style={{
                  backgroundColor: selectedFeedback.includes(index)
                    ? activity.selectedColor
                    : activity.color,
                  fontWeight: selectedFeedback.includes(index)
                    ? "bold"
                    : "normal",
                  color: selectedFeedback.includes(index) ? "#FFF" : "#000",
                  fontSize: "14px",
                  lineHeight: "140%",
                  letterSpacing: "0%",
                  margin: "0.5rem",
                  cursor: "pointer",
                  transition:
                    "transform 0.2s ease-in-out, background-color 0.3s ease",
                }}
              />
            </span>
          ))}
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
            opacity: selectedFeedback.length === 0 ? 0 : 1,
            pointerEvents: selectedFeedback.length === 0 ? "none" : "auto",
            transition: "opacity 0.3s ease",
          }}
          disabled={selectedFeedback.length === 0}
        >
          <ArrowForward sx={{ fontSize: "2rem", transform: "scaleX(1.5)" }} />
        </IconButton>
      </div>
    </>
  );
};

export default ActivitiesPage;
