import React, { useState } from "react";
import {
  AppBar,
  Box,
  Toolbar,
  Container,
  Button,
  Tabs,
  Tab,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/images.jpg";

const NavigationBar = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);

    switch (newValue) {
      case 0:
        navigate("/university-operations");
        break;

      case 1:
        navigate("/live-project");
        break;

      case 2:
        alert("We will be working on it soon");
        break;

      default:
        break;
    }
  };


  return (
    <AppBar
      position="static"
      elevation={1}
      sx={{ backgroundColor: "#fff", borderBottom: "1px solid #eee" }}
    >
      <Container maxWidth="xl">
        <Toolbar sx={{ py: 1 }}>


          <Box sx={{ mr: 4, display: "flex", alignItems: "center" }}>
            <Box
              component="img"
              src={logo}
              alt="Logo"
              sx={{ height: 38 }}
            />
          </Box>

          <Box
            sx={{
              backgroundColor: "#f2f2f2",
              borderRadius: "40px",
              px: 0.5,
              py: 0.5,
            }}
          >
            <Tabs
              value={activeTab}
              onChange={handleTabChange}
              TabIndicatorProps={{ style: { display: "none" } }}
            >
              {[
                "University Operations Overview",
                "Live Projects Overview",
                "Master Class"
              ].map((label, index) => (
                <Tab
                  key={label}
                  label={label}
                  sx={{
                    textTransform: "none",
                    fontWeight: 600,
                    fontSize: "0.95rem",
                    px: 3,
                    minHeight: 42,
                    borderRadius: "30px",
                    backgroundColor:
                      activeTab === index ? "#fff" : "transparent",
                    color: "#000",
                  }}
                />
              ))}
            </Tabs>
          </Box>

          <Box sx={{ flexGrow: 1 }} />


          <Button
            variant="contained"
            startIcon={<LogoutIcon />}
            onClick={handleLogout}
            sx={{
              px: 3,
              py: 1,
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
