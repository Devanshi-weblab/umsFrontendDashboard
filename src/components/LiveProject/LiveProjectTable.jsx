import React, { useEffect, useState } from "react";
import {
    Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Checkbox,
    IconButton,
    Chip,
    CircularProgress,
    Typography,
    Grid,
    Button,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import GroupIcon from "@mui/icons-material/Group";
import NavigationBar from "../NavigationBar/NavigationBar";
import CreateLiveProject from "./CreateLiveProject";

const headerStyle = {
    fontWeight: 600,
    backgroundColor: "#fafafa",
    whiteSpace: "nowrap",
};

const stickyLeftHeader = {
    ...headerStyle,
    position: "sticky",
    left: 0,
    zIndex: 3,
    backgroundColor: "#fafafa",
};

const stickyLeftCell = {
    position: "sticky",
    left: 0,
    zIndex: 2,
    backgroundColor: "#fff",
};

const stickyRightHeader = {
    ...headerStyle,
    position: "sticky",
    right: 0,
    zIndex: 3,
    backgroundColor: "#fafafa",
};

const stickyRightCell = {
    position: "sticky",
    right: 0,
    zIndex: 2,
    backgroundColor: "#fff",
};


const StatusChip = ({ status }) => {
    const colorMap = {
        Running: "primary",
        Completed: "success",
        Delayed: "warning",
        "At Risk": "error",
    };

    return (
        <Chip
            label={status}
            size="small"
            variant="outlined"
            color={colorMap[status] || "default"}
            sx={{ borderRadius: 2 }}
        />
    );
};


const LiveProjectTable = () => {
    const [data, setData] = useState([]);
    const [selected, setSelected] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [openCreateProject, setOpenCreateProject] = useState(false);



    const fetchProjects = async () => {
        try {
            setLoading(true);
            setError("");

            const token = localStorage.getItem("token");

            const response = await fetch(
                `${import.meta.env.VITE_API_BASE_URL}/api/live-projects`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (!response.ok) {
                const errorText = await response.text();
                console.error("API error:", errorText);
                throw new Error("Failed to fetch projects");
            }

            const result = await response.json();
            console.log("Live projects response:", result);

            setData(result);
        } catch (err) {
            console.error("Fetch projects error:", err);
            setError("Unable to load projects");
        } finally {
            setLoading(false);
        }
    };





    useEffect(() => {
        fetchProjects();
    }, []);


    const isSelected = (id) => selected.includes(id);

    const handleRowSelect = (id) => {
        setSelected((prev) =>
            prev.includes(id)
                ? prev.filter((item) => item !== id)
                : [...prev, id]
        );
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            setSelected(data.map((row) => row._id));
        } else {
            setSelected([]);
        }
    };

    const handleEdit = (row) => {
        console.log("Edit", row);
    };

    const handleOpenDelete = (row) => {
        console.log("Delete", row);
    };


    if (loading) {
        return (
            <Box display="flex" justifyContent="center" py={4}>
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Typography color="error" align="center">
                {error}
            </Typography>
        );
    }


    return (
        <Grid container spacing={2}>
            <Grid size={12}><NavigationBar /></Grid>
            <Grid item size={12} display="flex" justifyContent="flex-end">
                <Button
                    variant="contained"
                    color="primary"
                    sx={{ px: 3, py: 1 }}
                    onClick={() => setOpenCreateProject(true)}
                >
                    ADD NEW PROJECT
                </Button>


            </Grid>

            <CreateLiveProject
                open={openCreateProject}
                handleClose={() => setOpenCreateProject(false)}
                onSuccess={() => {
                    setOpenCreateProject(false);
                    fetchProjects();
                }}
            />

            <Grid size={12}>
                <TableContainer component={Paper} sx={{ borderRadius: 3 }}>
                    <Table stickyHeader sx={{ minWidth: 1600, tableLayout: "fixed" }}>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={stickyLeftHeader} padding="checkbox">
                                    <Checkbox
                                        indeterminate={
                                            selected.length > 0 && selected.length < data.length
                                        }
                                        checked={data.length > 0 && selected.length === data.length}
                                        onChange={handleSelectAllClick}
                                    />
                                </TableCell>

                                <TableCell sx={stickyLeftHeader}>University</TableCell>
                                <TableCell sx={headerStyle}>Program</TableCell>
                                <TableCell sx={headerStyle}>Batch</TableCell>
                                <TableCell sx={headerStyle}>Group</TableCell>
                                <TableCell sx={headerStyle}>Project Title</TableCell>
                                <TableCell sx={headerStyle}>Students</TableCell>
                                <TableCell sx={headerStyle}>Status</TableCell>
                                <TableCell sx={headerStyle}>Faculty Coordinator</TableCell>
                                <TableCell sx={headerStyle}>Industry Expert</TableCell>
                                <TableCell sx={headerStyle}>Certificate</TableCell>
                                <TableCell sx={stickyRightHeader}>Action</TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {data.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={12} align="center">
                                        No projects found
                                    </TableCell>
                                </TableRow>
                            ) : (
                                data.map((row) => {
                                    const checked = isSelected(row._id);

                                    return (
                                        <TableRow key={row._id} hover selected={checked}>
                                            <TableCell padding="checkbox" sx={stickyLeftCell}>
                                                <Checkbox
                                                    checked={checked}
                                                    onChange={() => handleRowSelect(row._id)}
                                                />
                                            </TableCell>

                                            <TableCell sx={stickyLeftCell}>
                                                {row.university}
                                            </TableCell>

                                            <TableCell>{row.program}</TableCell>
                                            <TableCell>{row.batch}</TableCell>
                                            <TableCell>{row.group}</TableCell>

                                            <TableCell sx={{ whiteSpace: "normal" }}>
                                                {row.projectTitle}
                                            </TableCell>

                                            <TableCell>
                                                <Box display="flex" alignItems="center" gap={1}>
                                                    <GroupIcon fontSize="small" color="action" />
                                                    {row.studentsCount}
                                                </Box>
                                            </TableCell>

                                            <TableCell>
                                                <StatusChip status={row.status} />
                                            </TableCell>

                                            <TableCell>{row.facultyCoordinator}</TableCell>
                                            <TableCell>{row.industryExpert}</TableCell>

                                            <TableCell>
                                                <Chip
                                                    label={row.certificate ? "Yes" : "No"}
                                                    size="small"
                                                    variant="outlined"
                                                />
                                            </TableCell>

                                            <TableCell sx={stickyRightCell}>
                                                <IconButton size="small" onClick={() => handleEdit(row)}>
                                                    <EditIcon fontSize="small" />
                                                </IconButton>

                                                <IconButton
                                                    size="small"
                                                    color="error"
                                                    onClick={() => handleOpenDelete(row)}
                                                >
                                                    <DeleteIcon fontSize="small" />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
        </Grid >
    );
};

export default LiveProjectTable;
