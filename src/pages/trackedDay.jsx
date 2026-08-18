import Header from "../components/header";
import Footer from "../components/footer";
import DataTable from "../components/Tracker/dataTable";
import {
  IconButton,
  Box,
  // CircularProgress, Typography
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { KeyboardArrowLeft } from "@mui/icons-material";
import mockTrackedData from "../utils/mockData";
// import axios from "axios";
// import { useState, useEffect } from "react";

// const formatDateFromNumber = (input) => {
//   const str = input.toString();
//   return `${str.slice(0, 4)}-${str.slice(4, 6)}-${str.slice(6, 8)}`;
// };

const TrackedDay = () => {
  const navigate = useNavigate();
  const { date } = useParams();
  // const [trackedDayData, setTrackedDayData] = useState(null);
  // const [loading, setLoading] = useState(true);
  // useEffect(() => {
  //   const fetchTrackedDayData = async () => {
  //     setLoading(true);
  //     try {
  //       const response = await axios.get(
  //         "http://localhost:3001/api/user-feelings/by-date",
  //         {
  //           params: {
  //             date: formatDateFromNumber(date), // Replace this with the desired date
  //           },
  //         }
  //       );
  //       const mostRecentEntry =
  //         response.data.data.sort(
  //           (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  //         )[0] || [];
  //       const formattedObj = {
  //         [date]: {
  //           feeling: mostRecentEntry.feeling,
  //           emotion: mostRecentEntry.emotion,
  //           reason: mostRecentEntry.reason,
  //           extraNotes: mostRecentEntry.extraNotes,
  //         },
  //       };
  //       setTrackedDayData(formattedObj);
  //     } catch (err) {
  //       console.log(err);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchTrackedDayData();
  // }, [date]);
  // if (loading) {
  //   return (
  //     <Box sx={{ textAlign: "center", marginTop: "100px" }}>
  //       <CircularProgress />
  //     </Box>
  //   );
  // }

  // if (!trackedDayData) {
  //   return (
  //     <Box sx={{ textAlign: "center", marginTop: "100px" }}>
  //       <Typography>No data available for this day.</Typography>
  //     </Box>
  //   );
  // }
  const handleBackNavigate = () => {
    navigate(-1);
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
        <DataTable date={date} trackedData={mockTrackedData} />
      </Box>
      <Footer />
    </>
  );
};
export default TrackedDay;
