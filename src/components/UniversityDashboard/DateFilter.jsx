import { useState } from "react";
import {
  Box,
  Button,
  Menu,
  MenuItem,
  Divider,
  TextField
} from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

export default function DateFilter({ onFilterChange }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [type, setType] = useState("all");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const isCustom = type === "custom";

  const openMenu = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (value) => {
    setAnchorEl(null);
    if (value) {
      setType(value);
      if (value !== "custom") {
        onFilterChange({ dateFilter: value });
      }
    }
  };

  const handleApplyCustom = () => {
    if (!fromDate || !toDate) return;
    onFilterChange({
      dateFilter: "custom",
      startDate: fromDate,
      endDate: toDate
    });
  };

  const handleClear = () => {
    setFromDate("");
    setToDate("");
    setType("all");
    onFilterChange({ dateFilter: "all" });
  };

  const labelMap = {
    all: "All Dates",
    today: "Today",
    week: "This Week",
    month: "This Month",
    custom: "Custom Range"
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
      <Button
        variant="outlined"
        startIcon={<CalendarMonthIcon />}
        onClick={handleClick}
        sx={{ textTransform: "none" }}
      >
        {labelMap[type]}
      </Button>

      <Menu anchorEl={anchorEl} open={openMenu} onClose={() => handleClose()}>
        <MenuItem onClick={() => handleClose("all")}>All Dates</MenuItem>
        <MenuItem onClick={() => handleClose("today")}>Today</MenuItem>
        <MenuItem onClick={() => handleClose("week")}>This Week</MenuItem>
        <MenuItem onClick={() => handleClose("month")}>This Month</MenuItem>
        <MenuItem onClick={() => handleClose("custom")}>Custom Range</MenuItem>
      </Menu>

      {isCustom && (
        <>
          <Divider orientation="vertical" flexItem />
          <TextField
            type="date"
            size="small"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            sx={{ width: 140 }}
          />
          <span>—</span>
          <TextField
            type="date"
            size="small"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            sx={{ width: 140 }}
          />
          <Button variant="contained" size="small" sx={{ px: 3 }} onClick={handleApplyCustom}>
            Apply
          </Button>
          <Button size="small" onClick={handleClear}>
            Clear
          </Button>
        </>
      )}
    </Box>
  );
}
