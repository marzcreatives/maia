import { useState } from "react";
import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Icon from "../assets/icon.jsx";

const Footer = () => {
  const [value, setValue] = useState(0);
  const navigate = useNavigate();

  const handleChange = (newValue) => {
    setValue(newValue);
  };

  const handleNavigation = (route) => {
    navigate(route);
  };

  return (
    <BottomNavigation id="footer" value={value} onChange={handleChange}>
      <BottomNavigationAction
        className="footerIcon"
        icon={<Icon alt="Home Icon" icon="home" />}
        onClick={() => handleNavigation("/home")}
      />
      <BottomNavigationAction
        className="footerIcon"
        icon={<Icon alt="Chat Icon" icon="chat" />}
        onClick={() => handleNavigation("/maia")}
      />
      <BottomNavigationAction
        className="footerIcon"
        icon={<Icon alt="Calendar Icon" icon="calendar" />}
        onClick={() => handleNavigation("/tracker")}
      />
      <BottomNavigationAction
        className="footerIcon"
        icon={<Icon alt="User Icon" icon="user" />}
        onClick={() => handleNavigation("/settings")}
      />
    </BottomNavigation>
  );
};

export default Footer;
