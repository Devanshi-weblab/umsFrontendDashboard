import { useState } from "react";
import {
    Box,
    Select,
    MenuItem,
    Button,
    TextField,
    Divider
} from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

export default function DateFilter() {
    const [type, setType] = useState("All Dates");
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");

    const isCustom = type === "Custom Range";

    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                gap: 1.5,
                px: 2,
                py: 1.5,
                borderRadius: 2,
                bgcolor: "#fff",
                boxShadow: 1,
                transition: "all 0.3s ease"
            }}
        >
         
            <CalendarMonthIcon fontSize="small" />

            <Select
                value={type}
                onChange={(e) => setType(e.target.value)}
                variant="standard"
                disableUnderline
                sx={{ minWidth: 140 }}
            >
                <MenuItem value="All Dates">All Dates</MenuItem>
                <MenuItem value="Today">Today</MenuItem>
                <MenuItem value="This Week">This Week</MenuItem>
                <MenuItem value="This Month">This Month</MenuItem>
                <MenuItem value="Custom Range">Custom Range</MenuItem>
            </Select>

         
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

                    <Button
                        variant="contained"
                        size="small"
                        sx={{ px: 3 }}
                    >
                        Apply
                    </Button>

                    <Button
                        size="small"
                        onClick={() => {
                            setFromDate("");
                            setToDate("");
                            setType("All Dates");
                        }}
                    >
                        Clear
                    </Button>
                </>
            )}
        </Box>
    );
}
