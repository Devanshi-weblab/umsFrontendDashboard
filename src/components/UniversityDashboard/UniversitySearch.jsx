import React from "react";
import {
  Box,
  TextField,
  InputAdornment,
  Select,
  MenuItem,
  IconButton,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";

const statuses = [
  { label: "All Statuses", value: "All" },
  { label: "Completed", value: "Completed" },
  { label: "On Track", value: "On Track" },
  { label: "Delayed", value: "Delayed" },
  { label: "At Risk", value: "At Risk" },
];

const UniversitySearch = ({ search, status, onSearchChange, onStatusChange }) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 2,
        p: 2,
        backgroundColor: "#f7f7f7",
        borderRadius: "12px",
      }}
    >
      {/* Search */}
      <TextField
        fullWidth
        value={search}
        placeholder="Search by university, program, or responsible person..."
        onChange={(e) => onSearchChange(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon sx={{ color: "#9e9e9e" }} />
            </InputAdornment>
          ),
        }}
        sx={{
          backgroundColor: "#fff",
          borderRadius: "10px",
          "& fieldset": { border: "none" },
        }}
      />

      {/* Status */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          backgroundColor: "#fff",
          borderRadius: "10px",
          px: 1,
        }}
      >
        <IconButton size="small">
          <FilterListIcon sx={{ color: "#757575" }} />
        </IconButton>

        <Select
          value={status}
          onChange={(e) => onStatusChange(e.target.value)}
          variant="standard"
          disableUnderline
          sx={{ minWidth: 140 }}
        >
          {statuses.map((s) => (
            <MenuItem key={s.value} value={s.value}>
              {s.label}
            </MenuItem>
          ))}
        </Select>
      </Box>
    </Box>
  );
};

export default UniversitySearch;
