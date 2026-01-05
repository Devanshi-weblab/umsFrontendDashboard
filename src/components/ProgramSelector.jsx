import React, { useEffect, useState } from "react";
import { TextField, MenuItem } from "@mui/material";
import API from "../api/api";

const ProgramSelector = ({
  value,
  onChange,
  error,
  helperText,
}) => {
  const [programs, setPrograms] = useState([]);

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const res = await API.get("/programs");
        const data = res.data?.data || res.data || [];

        const uniquePrograms = [
          ...new Set(
            data
              .map(item => item.programs || item.programName || item.program)
              .filter(Boolean)
          ),
        ];

        setPrograms(uniquePrograms);
      } catch (err) {
        console.error("Fetch programs failed", err);
      }
    };

    fetchPrograms();
  }, []);

  return (
    <TextField
      select
      size="small"
      label="Program(s) *"
      fullWidth
      value={value}
      onChange={onChange}
      error={error}
      helperText={helperText}
    >
      {programs.map((prog) => (
        <MenuItem key={prog} value={prog}>
          {prog}
        </MenuItem>
      ))}

      <MenuItem value="CUSTOM" sx={{ fontStyle: "italic" }}>
        ➕ Add New Program
      </MenuItem>
    </TextField>
  );
};

export default ProgramSelector;
