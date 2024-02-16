import React, { useState } from "react";
import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import PetsIcon from "@mui/icons-material/Pets";
import HotelIcon from "@mui/icons-material/Hotel";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import AddPet from "./AddPet";
import AddHotel from "./AddHotel";
import PropTypes from "prop-types";

import {
  Dialog,
  Slide,
  Toolbar,
  IconButton,
  AppBar,
  styled,
  Fab,
  Box,
  BottomNavigation,
  BottomNavigationAction,
} from "@mui/material";
import { Authenticated } from "./types/Authentication";
import { DialogContent } from "@mui/material/";
import { Hotels } from "./types/Hotel";
import { Pets } from "./types/Pet";

const StyledFab = styled(Fab)({
  position: "absolute",
  zIndex: 1,
  top: -30,
  left: 0,
  right: 0,
  margin: "0 auto",
});

function Navigation({ user, token, hotels, setHotels, pets, setPets }) {
  const [value, setValue] = React.useState(0);
  const [showAddHotel, setShowAddHotel] = useState(false);
  const [showAddPet, setShowAddPet] = useState(false);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = ({ user }) => {
    setOpen(Boolean(user));
    setShowAddHotel(user && user.role);
    setShowAddPet(user && !user.role);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Box sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}>
        <StyledFab color="secondary" aria-label="add">
          <AddIcon onClick={() => handleClickOpen({ user })} />
          <Dialog fullScreen open={open} onClose={handleClose} keepMounted>
            <Slide direction="up" in={true}>
              <DialogContent>
                <AppBar sx={{ position: "relative", marginBottom: "16.5px" }}>
                  <Toolbar>
                    <IconButton
                      edge="start"
                      color="inherit"
                      onClick={handleClose}
                      aria-label="close"
                    >
                      <CloseIcon />
                    </IconButton>
                  </Toolbar>
                </AppBar>
                {showAddHotel && (
                  <AddHotel
                    token={token}
                    hotel={undefined}
                    onSuccess={(hotel) => {
                      handleClose();
                      setHotels([...hotels, hotel]);
                    }}
                  />
                )}
                {showAddPet && (
                  <AddPet
                    token={token}
                    pet={undefined}
                    onSuccess={(pet) => {
                      handleClose();
                      setPets((prevPets) => [...prevPets, pet]);
                    }}
                  />
                )}
              </DialogContent>
            </Slide>
          </Dialog>
        </StyledFab>
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
            to={user && user.role == true ? "/pets/owned" : "/pets"}
          />
          <BottomNavigationAction
            label="Hotels"
            icon={<HotelIcon />}
            component={Link}
            to={user && user.role == true ? "/hotels/owned" : "/hotels"}
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

Navigation.propTypes = {
  ...Authenticated,
  token: PropTypes.string,
  ...Hotels,
  ...Pets,
};

export default Navigation;
