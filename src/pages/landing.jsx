import bgPurple from "../assets/bg_purple.jpg";
import bgGreen from "../assets/bg_green.jpg";

import HeaderMain from "../components/Landing/headerMain";
import CalendarStrip from "../components/Landing/calendarStrip";
import LandingCard from "../components/Landing/card";
import Footer from "../components/footer";
import { Carousel } from "../components/Landing/carousel";

// eslint-disable-next-line react/prop-types
const Landing = ({ trackedData }) => {
  return (
    <div>
      <HeaderMain />
      <CalendarStrip />
      <LandingCard
        text={"How are you feeling today?"}
        image={bgPurple}
        align="left"
        link="/feeling"
      />
      <Carousel />
      <LandingCard
        text={`Feeling {} yesterday? \nChat with MAIA now.`}
        image={bgGreen}
        align="right"
        data={trackedData}
        link="/maia"
      />
      <Footer />
    </div>
  );
};
export default Landing;
