import React from "react";
import { Chip } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import WarningIcon from "@mui/icons-material/Warning";
import ScheduleIcon from "@mui/icons-material/Schedule";

const statusConfig = {
  "On Track": {
    label: "On Track",
    color: "#1976d2",
    bg: "#e3f2fd",
    icon: <CheckCircleIcon fontSize="small" />,
  },
  "Delayed": {
    label: "Delayed",
    color: "#d32f2f",
    bg: "#fdecea",
    icon: <ScheduleIcon fontSize="small" />,
  },
  "At Risk": {
    label: "At Risk",
    color: "#ed6c02",
    bg: "#fff4e5",
    icon: <WarningIcon fontSize="small" />,
  },
  "Completed": {
    label: "Completed",
    color: "#2e7d32",
    bg: "#edf7ed",
    icon: <CheckCircleIcon fontSize="small" />,
  },
};

const StatusChip = ({ status }) => {
  const config = statusConfig[status];

  if (!config) return status; 

  return (
    <Chip
      icon={config.icon}
      label={config.label}
      size="small"
      sx={{
        fontWeight: 500,
        color: config.color,
        backgroundColor: config.bg,
        borderRadius: "20px",
      }}
    />
  );
};

export default StatusChip;
