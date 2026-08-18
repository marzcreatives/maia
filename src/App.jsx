import "./App.css";
// import axios from "axios";
// import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/landing";
import FeelingPage from "./pages/feelingPage";
import EmotionPage from "./pages/emotionPage";
import ActivitiesPage from "./pages/activitiesPage";
import Chatbot from "./pages/chatbot";
import Tracker from "./pages/tracker";
import TrackedDay from "./pages/trackedDay";
import mockTrackedData from "./utils/mockData";
import Landing2 from "./pages/landing2";
import Chatbot2 from "./pages/chatbot2";

// const formatDate = (isoDateString) => {
//   const date = new Date(isoDateString);
//   const year = date.getFullYear();
//   const month = String(date.getMonth() + 1).padStart(2, "0");
//   const day = String(date.getDate()).padStart(2, "0");

//   return `${year}${month}${day}`;
// };

function App() {
  // const [trackedData, setTrackedData] = useState(null);
  // const [trackedDataObject, setTrackedDataObject] = useState(null);
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const fetchTrackedData = async () => {
  //     let object = null;

  //     try {
  //       const response = await axios.get(
  //         "http://localhost:3001/api/user-feelings/"
  //       );
  //       const formattedData = response.data.data.map((entry) => {
  //         return {
  //           date: formatDate(entry.createdAt),
  //           feeling: entry.feeling,
  //           emotions: entry.emotion,
  //           activities: entry.reason,
  //           extraNotes: entry.extraNotes,
  //         };
  //       });
  //       object = formattedData?.reduce((acc, item) => {
  //         acc[item.date] = item.feeling;
  //         return acc;
  //       }, {});
  //       setTrackedDataObject(object);
  //       setTrackedData(formattedData);
  //     } catch (error) {
  //       // Handle network or server errors
  //       console.error("Network error:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   fetchTrackedData();
  // }, []);
  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  // if (!trackedData || !trackedDataObject) {
  //   return <div>No data available</div>;
  // }

  const trackedDataObject = mockTrackedData?.reduce((acc, item) => {
    acc[item.date] = item.feeling;
    return acc;
  }, {});

  return (
    <>
      <Router>
        <div>
          <Routes>
            <Route
              path="/"
              element={<Landing trackedData={trackedDataObject} />}
            />
            <Route path="/feeling" element={<FeelingPage />} />
            <Route path="/emotion" element={<EmotionPage />} />
            <Route path="/activities" element={<ActivitiesPage />} />
            <Route path="/maia" element={<Chatbot />} />
            <Route path="/chat" element={<Chatbot2 />} />
            <Route
              path="/tracker"
              element={<Tracker trackedData={trackedDataObject} />}
            />
            <Route path="/tracker/:date" element={<TrackedDay />} />
            <Route path="/home" element={<Landing2 />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
