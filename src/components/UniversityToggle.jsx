import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import React from "react";

const UniversityToggle = ({ tab, onTabChange }) => {
  const handleChange = (event, newValue) => {
    if (newValue !== null) onTabChange(newValue);
  };

  return (
    <ToggleButtonGroup
      exclusive
      value={tab}
      onChange={handleChange}
      aria-label="view toggle"
      sx={{
        backgroundColor: "#1E5BFF", 
        borderRadius: "999px",
        padding: "4px",
        gap: "4px",
      }}
    >
      <ToggleButton
        value="overview"
        sx={toggleStyles}
      >
        Overview
      </ToggleButton>

      <ToggleButton
        value="entries"
        sx={toggleStyles}
      >
        Entries
      </ToggleButton>
    </ToggleButtonGroup>
  );
};

const toggleStyles = {
  textTransform: "none",
  fontSize: "14px",
  fontWeight: 500,
  padding: "8px 24px",
  borderRadius: "999px",
  border: "none",
  color: "#fff",

  "&.Mui-selected": {
    backgroundColor: "#fff",
    color: "#1E5BFF",
    boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
  },

  "&.Mui-selected:hover": {
    backgroundColor: "#fff",
  },

  "&:hover": {
    backgroundColor: "rgba(255,255,255,0.15)",
  },
};

export default UniversityToggle;