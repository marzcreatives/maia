import bgPurple from "../assets/bg_purple.jpg";
import bgGreen from "../assets/bg_green.jpg";

import HeaderMain from "../components/Landing/headerMain";
import LandingCard from "../components/Landing/card";
import Footer from "../components/footer";
import { Carousel } from "../components/Landing/carousel";
import CalendarStrip2 from "../components/Landing/calendarStrip2";

// eslint-disable-next-line react/prop-types
const Landing2 = ({ trackedData }) => {
  return (
    <div>
      <HeaderMain />
      <CalendarStrip2 />
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
        link="/chat"
      />
      <Footer />
    </div>
  );
};
export default Landing2;
