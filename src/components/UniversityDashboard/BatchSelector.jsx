import React, { useEffect, useState } from "react";
import { TextField, MenuItem } from "@mui/material";
import API from "../../api/api";

const BatchSelector = ({
  value,
  onChange,
  error = false,
  helperText = "",
  size = "small",
  label = "Batch *",
}) => {
  const [batches, setBatches] = useState([]);

  useEffect(() => {
    const fetchBatches = async () => {
      try {
        const response = await API.get("/programs");

        const programs = response.data?.data || response.data || [];

        const uniqueBatches = [
          ...new Set(
            programs
              .map(item => item.batch || item.year || item.batchYear)
              .filter(Boolean)
          ),
        ];

        setBatches(uniqueBatches);
      } catch (error) {
        console.error("Error fetching batches:", error);
      }
    };

    fetchBatches();
  }, []);

  return (
    <TextField
      select
      size={size}
      label={label}
      fullWidth
      value={value}
      onChange={onChange}
      error={error}
      helperText={helperText}
    >
      {batches.map((batch) => (
        <MenuItem key={batch} value={batch}>
          {batch}
        </MenuItem>
      ))}

      <MenuItem value="CUSTOM" sx={{ fontStyle: "italic" }}>
        ➕ Add New Batch
      </MenuItem>
    </TextField>
  );
};

export default BatchSelector;

