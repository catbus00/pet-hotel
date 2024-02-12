import React from "react";
import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import PetsIcon from "@mui/icons-material/Pets";
import HotelIcon from "@mui/icons-material/Hotel";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AddIcon from "@mui/icons-material/Add";
import {
  styled,
  Fab,
  Box,
  BottomNavigation,
  BottomNavigationAction,
} from "@mui/material";

function Navigation() {
  const [value, setValue] = React.useState(0);
  const StyledFab = styled(Fab)({
    position: "absolute",
    zIndex: 1,
    top: 230,
    left: 0,
    right: 0,
    margin: "0 auto",
  });

  return (
    <>
      <Box
        sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
        elevation={3}
      >
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        >
          <BottomNavigationAction
            label="Home"
            icon={<HomeIcon />}
            component={Link}
            to="/dashboard"
          />
          <BottomNavigationAction
            label="My Pets"
            icon={<PetsIcon />}
            component={Link}
            to="/pets"
          />
          {/* <StyledFab color="secondary" aria-label="add">
            <AddIcon />
          </StyledFab> */}
          <BottomNavigationAction
            label="Hotels"
            icon={<HotelIcon />}
            component={Link}
            to="/hotels"
          />
          <BottomNavigationAction
            label="Profile"
            icon={<AccountCircleIcon />}
            component={Link}
            to="/profile"
          />
        </BottomNavigation>
      </Box>
    </>
  );
}

export default Navigation;
