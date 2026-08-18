import { Box, AppBar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Icon from "../assets/icon.jsx";
import "../App.css";

export const Header = () => {
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate("/");
  };

  return (
    <AppBar id="header" position="fixed" onClick={handleNavigation}>
      <Box id="headerBar">
        <Icon className="headerText" alt="MAIA" icon="logo" id="iconSmall" />
      </Box>
    </AppBar>
  );
};

export default Header;
