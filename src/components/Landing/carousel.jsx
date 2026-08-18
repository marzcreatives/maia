import { Box, Card, IconButton } from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";
import { useState } from "react";

export const Carousel = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  const slides = [
    {
      title: "Ayah of the Day",
      arabic: "إِنَّ مَعَ الْعُسْرِ يُسْرًا",
      translation: "Surely with ˹that˺ hardship comes ˹more˺ ease.\n[Ash-Sharh 94:6]",
    },
    {
      title: "Hadith of the Day",
      arabic: "إِنَّمَا الْأَعْمَالُ بِالنِّيَّاتِ",
      translation: "Actions are but by intentions.\n[Sahih Bukhari :1]",
    },
  ];

  const handleSlideChange = (index) => {
    setActiveSlide(index);
  };

  return (
    <Card id="carouselContainer">
      <div id="cardHeader" >{slides[activeSlide].title}</div>
      <Box id="textContainer">
        <div style={{ textAlign: "center" }}>
          <div className="arabicText">
            {slides[activeSlide].arabic}
          </div>
          <div className="translationText">
            {slides[activeSlide].translation}
          </div>
        </div>
      </Box>
      <Box id="paginationContainer">
        {slides.map((_, index) => (
          <IconButton
            key={index}
            onClick={() => handleSlideChange(index)}
            sx={{
              padding: 0,
              margin: "0 5px",
            }}
          >
            <CircleIcon 
            sx={{
                fontSize: "8px",
                color: activeSlide === index ? "rgba(0, 0, 0, 0.8)" : "rgba(0, 0, 0, 0.2)",
              }} />
          </IconButton>
        ))}
      </Box>
    </Card>
  );
};