import React, { useState } from "react";
import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import PetsIcon from "@mui/icons-material/Pets";
import HotelIcon from "@mui/icons-material/Hotel";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import AddPet from "./Pet";
import AddHotel from "./Hotel";
import { Dialog, Slide, Toolbar, IconButton, AppBar } from "@mui/material";
import {
  styled,
  Fab,
  Box,
  BottomNavigation,
  BottomNavigationAction,
} from "@mui/material";
import { Authenticated } from "./types/Authentication";
import { DialogContent } from "@mui/material/";

const StyledFab = styled(Fab)({
  position: "absolute",
  zIndex: 1,
  top: -30,
  left: 0,
  right: 0,
  margin: "0 auto",
});

function Navigation({ user }) {
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
                <AppBar sx={{ position: "relative" }}>
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
                {showAddHotel && <AddHotel user={user} />}
                {showAddPet && <AddPet user={user} />}
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

Navigation.propTypes = {
  ...Authenticated,
};

export default Navigation;
