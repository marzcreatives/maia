import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/landing";
import FeelingPage from "./pages/feelingPage";
import EmotionPage from "./pages/emotionPage";
import ActivitiesPage from "./pages/activitiesPage";
import Chatbot from "./pages/chatbot";
import Tracker from "./pages/tracker";
import TrackedDay from "./pages/trackedDay";
import mockTrackedData from "./utils/mockData";
import Chatbot2 from "./pages/chatbot2";

function App() {
  // Map mock data so the last entry corresponds to today,
  // and earlier entries fill previous days backwards.
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}${month}${day}`;
  };

  const filledMock = (() => {
    if (!Array.isArray(mockTrackedData) || mockTrackedData.length === 0)
      return [];
    const len = mockTrackedData.length;
    const today = new Date();
    const start = new Date(today);
    // start is (today - (len - 1)) so that last item maps to today
    start.setDate(today.getDate() - (len - 1));

    return mockTrackedData.map((item, idx) => {
      const d = new Date(start);
      d.setDate(start.getDate() + idx);
      return {
        ...item,
        date: formatDate(d),
      };
    });
  })();

  const trackedDataObject = filledMock.reduce((acc, item) => {
    acc[item.date] = item.feeling;
    return acc;
  }, {});

  return (
    <>
      <BrowserRouter basename="/maia">
        <div className="device-outer">
          <div className="device">
            <Routes>
              <Route
                path="/"
                element={<Landing trackedData={trackedDataObject} />}
              />
              <Route path="/feeling" element={<FeelingPage />} />
              <Route path="/emotion" element={<EmotionPage />} />
              <Route path="/activities" element={<ActivitiesPage />} />
              <Route path="/chat" element={<Chatbot />} />
              <Route path="/chatbot" element={<Chatbot2 />} />
              <Route
                path="/tracker"
                element={<Tracker trackedData={trackedDataObject} />}
              />
              <Route path="/tracker/:date" element={<TrackedDay />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
