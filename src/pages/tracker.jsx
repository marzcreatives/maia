import Header from "../components/header";
import Footer from "../components/footer";
import Calendar from "../components/Tracker/calendar";

// eslint-disable-next-line react/prop-types
const Tracker = ({ trackedData }) => {
  return (
    <>
      <Header />
      <Calendar trackedData={trackedData} />
      <Footer />
    </>
  );
};
export default Tracker;
