import {AppBar, Box} from '@mui/material';
import Icon from '../../assets/icon.jsx';
import "./landing.css"

export default function HeaderMain() {

  return (
      <AppBar id="headerMain">
        <Box id="headerBox">
            <Icon alt="MAIA" icon="logo" id="iconLarge" /> 
        </Box>
      </AppBar>
  );
}
