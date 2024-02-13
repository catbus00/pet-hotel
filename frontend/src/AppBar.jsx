import * as React from "react";
import {
  Avatar,
  Tooltip,
  MenuItem,
  Container,
  Link,
  Toolbar,
  Box,
  AppBar,
  IconButton,
  Typography,
  Menu,
} from "@mui/material";
import { Authenticator } from "./types/Authentication";
import { Navigation } from "./types/Navigation";
import axios from "axios";
import { API } from "./env";

const settings = ["Profile", "Dashboard", "Settings", "Logout"];

MeowtelAppBar.propTypes = {
  ...Authenticator,
  ...Navigation,
};

function MeowtelAppBar({ setUser, setToken, navigate }) {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = (index) => {
    setAnchorElUser(null);
    console.log(index);
    const setting =
      settings.length > index && index >= 0 ? settings[index] : undefined;
    console.log(setting);
    if (setting && setting === "Logout") {
      axios
        .get(`${API}/auth/logoff`)
        .then(() => {
          setUser(null);
          setToken(null);
          sessionStorage.removeItem("authUser");
          sessionStorage.removeItem("authToken");
        })
        .catch((error) => {
          console.error("Error logging off:", error);
        });
    }
    if (setting && setting === "Profile") {
      navigate("/profile");
    }
    if (setting && setting === "Dashboard") {
      navigate("/dashboard");
    }
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "#6667AB" }}>
      <Container maxWidth={false}>
        <Toolbar disableGutters>
          <Link
            href="../src/Home.jsx"
            underline="none"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
            }}
          >
            <img
              className="nav-logo"
              src="../favicon.png"
              alt="Meowtel Logo"
              width="40"
              height="40"
            />
          </Link>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#meowtel-app-bar"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            MEOWTEL
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            ></IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            ></Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#meowtel-menu"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            MEOWTEL
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}></Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Koa" src="../photos/koa.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting, index) => (
                <MenuItem
                  key={setting}
                  onClick={() => handleCloseUserMenu(index)}
                >
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default MeowtelAppBar;
