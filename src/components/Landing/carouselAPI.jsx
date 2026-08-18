import { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  Card,
  CardHeader,
  IconButton,
} from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";

const apiUrls = {
  ayah: "https://api.alquran.cloud/v1/ayah/random", // Example URL for random Ayah
  hadith: "https://api.sunnah.com/v1/hadiths/random", // Example URL for random Hadith
};

export const Carousel = () => {
  const [slides, setSlides] = useState([]);
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const fetchAyah = async () => {
      try {
        const response = await axios.get(apiUrls.ayah);
        const ayah = response.data.data; // Adjust based on the actual response structure
        return {
          title: "Ayah of the Day",
          arabic: ayah.text, // Adjust based on the actual response structure
          translation: ayah.translation.en, // Adjust based on the actual response structure
        };
      } catch (error) {
        console.error("Error fetching Ayah:", error);
        return null;
      }
    };

    const fetchHadith = async () => {
      try {
        const response = await axios.get(apiUrls.hadith);
        const hadith = response.data.data.hadith[0]; // Adjust based on the actual response structure
        return {
          title: "Hadith of the Day",
          arabic: hadith.arabic, // Adjust based on the actual response structure
          translation: hadith.english, // Adjust based on the actual response structure
        };
      } catch (error) {
        console.error("Error fetching Hadith:", error);
        return null;
      }
    };

    Promise.all([fetchAyah(), fetchHadith()]).then(([ayah, hadith]) => {
      const validSlides = [ayah, hadith].filter(Boolean);
      setSlides(validSlides);
    });
  }, []);

  const handleSlideChange = (index) => {
    setActiveSlide(index);
  };

  return (
    <Card id="carouselContainer">
      {slides.length > 0 && (
        <>
          <CardHeader title={slides[activeSlide].title} />
          <Box id="ayahContainer">
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
                color={activeSlide === index ? "primary" : "default"}
              >
                <CircleIcon />
              </IconButton>
            ))}
          </Box>
        </>
      )}
    </Card>
  );
};
