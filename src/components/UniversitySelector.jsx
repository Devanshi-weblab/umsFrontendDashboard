import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import API from "../api/api";

const UniversitySelector = ({ value, onChange }) => {
  const [universities, setUniversities] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUniversities = async () => {
      setLoading(true);
      try {
        const response = await API.get("/api/programs");
        const programs = response.data?.data || response.data || []
        const uniqueUniversities = [
          ...new Set(programs.map((item) => item.university)),
        ];
        setUniversities(uniqueUniversities);
      } catch (error) {
        console.error(
          "Error fetching universities:",
          error.response?.data || error.message
        );
      } finally {
        setLoading(false);
      }
    };

    fetchUniversities();
  }, []);

  return (
    <Box sx={{ width: 320 }}>
      <TextField
        select
        fullWidth
        label="University"
        value={value}
        onChange={onChange}
        placeholder="Select University"
        variant="outlined"
        sx={{
          backgroundColor: "#fff",
          borderRadius: 2,
          "& .MuiOutlinedInput-root": {
            borderRadius: 2,
          },
        }}
      >
        <MenuItem value="">
          <em>{loading ? "Loading..." : "All Universities"}</em>
        </MenuItem>

        {universities.map((uni) => (
          <MenuItem key={uni} value={uni}>
            {uni}
          </MenuItem>
        ))}
      </TextField>
    </Box>
  );
};

export default UniversitySelector;
