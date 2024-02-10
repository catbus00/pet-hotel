import { Link } from "react-router-dom";
import React, { useState } from "react";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import HomeIcon from "@mui/icons-material/Home";
import PetsIcon from "@mui/icons-material/Pets";
import HotelIcon from "@mui/icons-material/Hotel";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

function Navigation() {
  const [value, setValue] = React.useState(0);

  return (
    <>
      <Box sx={{ width: "auto" }}>
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
