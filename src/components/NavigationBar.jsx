import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import AdbIcon from "@mui/icons-material/Adb";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";

const NavigationBar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <AppBar position="static" elevation={4}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>

          {/* LOGO */}
          <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{
              mr: 4,
              display: { xs: "none", md: "flex" },
              fontWeight: 700,
              letterSpacing: ".2rem",
            }}
          >
            LOGO
          </Typography>

          {/* CENTER SPACE */}
          <Box sx={{ flexGrow: 1 }} />

          {/* USER AVATAR */}
          <Tooltip title="Profile">
            <Avatar
              sx={{
                bgcolor: "secondary.main",
                mr: 2,
                cursor: "pointer",
              }}
            >
              R
            </Avatar>
          </Tooltip>

          {/* BIG LOGOUT BUTTON */}
          <Button
            variant="contained"
            startIcon={<LogoutIcon />}
            onClick={handleLogout}
            sx={{
              px: 3,
              py: 1.2,
              fontSize: "1rem",
              fontWeight: 600,
              borderRadius: 2,
              textTransform: "none",
            }}
          >
            Logout
          </Button>

        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default NavigationBar;
