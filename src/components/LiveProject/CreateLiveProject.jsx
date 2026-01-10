import React, { useEffect, useState } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    IconButton,
    Grid,
    TextField,
    MenuItem,
    Button,
    Box,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useFormik } from "formik";
import * as Yup from "yup";
import API from "../../api/api";
import UniversitySelector from "../UniversityDashboard/UniversitySelector";



const validationSchema = Yup.object({
    university: Yup.string().required("University is required"),
    program: Yup.string().required("Program is required"),
    batch: Yup.string().required("Batch is required"),
    group: Yup.string().required("Group is required"),
    projectTitle: Yup.string().required("Project title is required"),
    studentCount: Yup.number()
        .required("Student count is required")
        .positive("Must be positive")
        .integer("Must be an integer"),
    facultyCoordinator: Yup.string().required("Faculty coordinator is required"),
    industryExpert: Yup.string().required("Industry expert is required"),
    status: Yup.string().required("Status is required"),
    certificateDistributed: Yup.string().required("Required"),
    startDate: Yup.string().required("Start date is required"),
    endDate: Yup.string().required("End date is required"),
});

const CreateLiveProject = ({ open, handleClose, onSuccess }) => {
    const [isCustomUniversity, setIsCustomUniversity] = useState(false);
    const [universities, setUniversities] = useState([]);
    const [programs, setPrograms] = useState([]);
    const [batches, setBatches] = useState([]);
    const [programData, setProgramData] = useState([]);


    useEffect(() => {
        if (!open) return;
        fetchProgramData();
    }, [open]);


    const fetchProgramData = async () => {
        try {
            const res = await API.get("/programs");
            const data = res.data || [];

            setProgramData(data);


            const uniqueUniversities = [
                ...new Set(data.map((item) => item.university)),
            ];

            setUniversities(uniqueUniversities);
        } catch (err) {
            console.error("PROGRAM DATA FETCH ERROR", err);
        }
    };

    const handleUniversityChange = (university) => {
        formik.setFieldValue("university", university);
        formik.setFieldValue("program", "");
        formik.setFieldValue("batch", "");

        const filteredPrograms = [
            ...new Set(
                programData
                    .filter((item) => item.university === university)
                    .map((item) => item.programs)
            ),
        ];

        setPrograms(filteredPrograms);
        setBatches([]);
    };

    const handleProgramChange = (program) => {
        formik.setFieldValue("program", program);
        formik.setFieldValue("batch", "");

        const filteredBatches = [
            ...new Set(
                programData
                    .filter(
                        (item) =>
                            item.university === formik.values.university &&
                            item.programs === program &&
                            item.batch

                    )
                    .map((item) => item.batch)
            ),
        ];

        setBatches(filteredBatches);
    };

    const formik = useFormik({
        initialValues: {
            university: "",
            program: "",
            batch: "",
            group: "",
            projectTitle: "",
            studentCount: "",
            facultyCoordinator: "",
            industryExpert: "",
            status: "",
            certificateDistributed: "",
            startDate: "",
            endDate: "",
        },
        validationSchema,
        onSubmit: async (values, { resetForm }) => {
            try {
                await API.post("/live-projects", values);
                resetForm();
                onSuccess?.();
                handleClose();
            } catch (error) {
                console.error("PROJECT CREATE ERROR →", error);
                alert("Failed to add project");
            }
        },
    });

    const handleDialogClose = () => {
        formik.resetForm();
        setIsCustomUniversity(false);
        handleClose();
    };

    return (
        <Dialog
            open={open}
            onClose={handleDialogClose}
            maxWidth={false}
            PaperProps={{
                sx: { width: 720, borderRadius: "14px", p: 1 },
            }}
        >
            <DialogTitle sx={{ fontWeight: 600 }}>
                Add New Project
                <IconButton
                    onClick={handleDialogClose}
                    sx={{ position: "absolute", right: 12, top: 12 }}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>

            <DialogContent dividers>
                <form onSubmit={formik.handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item size={6}>
                            <TextField
                                select
                                size="small"
                                label="University *"
                                fullWidth
                                value={formik.values.university}
                                onChange={(e) => handleUniversityChange(e.target.value)}
                            >
                                {universities.map((uni) => (
                                    <MenuItem key={uni} value={uni}>
                                        {uni}
                                    </MenuItem>
                                ))}
                            </TextField>

                        </Grid>
                        <Grid item size={6}>
                            <TextField
                                select
                                size="small"
                                label="Program *"
                                fullWidth
                                value={formik.values.program}
                                onChange={(e) => handleProgramChange(e.target.value)}
                                disabled={!formik.values.university}
                            >
                                {programs.map((prog) => (
                                    <MenuItem key={prog} value={prog}>
                                        {prog}
                                    </MenuItem>
                                ))}
                            </TextField>

                        </Grid>



                        <Grid item size={6}>
                            <TextField
                                select
                                size="small"
                                label="Batch *"
                                name="batch"
                                fullWidth
                                value={formik.values.batch}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                disabled={!formik.values.program}
                                error={formik.touched.batch && Boolean(formik.errors.batch)}
                                helperText={formik.touched.batch && formik.errors.batch}
                            >
                                {batches.map((batch) => (
                                    <MenuItem key={batch} value={batch}>
                                        {batch}
                                    </MenuItem>
                                ))}
                            </TextField>


                        </Grid>



                        <Grid item size={6}>
                            <TextField
                                size="small"
                                label="Group *"
                                name="group"
                                fullWidth
                                value={formik.values.group}
                                onChange={formik.handleChange}
                                error={formik.touched.group && Boolean(formik.errors.group)}
                                helperText={formik.touched.group && formik.errors.group}
                            />
                        </Grid>

                        {/* Project Title */}
                        <Grid item size={12}>
                            <TextField
                                size="small"
                                label="Project Title *"
                                name="projectTitle"
                                fullWidth
                                value={formik.values.projectTitle}
                                onChange={formik.handleChange}
                                error={
                                    formik.touched.projectTitle &&
                                    Boolean(formik.errors.projectTitle)
                                }
                                helperText={
                                    formik.touched.projectTitle &&
                                    formik.errors.projectTitle
                                }
                            />
                        </Grid>

                        {/* Student Count */}
                        <Grid item size={12}>
                            <TextField
                                size="small"
                                label="Student Count *"
                                name="studentCount"
                                type="number"
                                fullWidth
                                value={formik.values.studentCount}
                                onChange={formik.handleChange}
                                error={
                                    formik.touched.studentCount &&
                                    Boolean(formik.errors.studentCount)
                                }
                                helperText={
                                    formik.touched.studentCount &&
                                    formik.errors.studentCount
                                }
                            />
                        </Grid>

                        {/* Faculty Coordinator */}
                        <Grid item size={6}>
                            <TextField
                                size="small"
                                label="Faculty Coordinator *"
                                name="facultyCoordinator"
                                fullWidth
                                value={formik.values.facultyCoordinator}
                                onChange={formik.handleChange}
                                error={
                                    formik.touched.facultyCoordinator &&
                                    Boolean(formik.errors.facultyCoordinator)
                                }
                                helperText={
                                    formik.touched.facultyCoordinator &&
                                    formik.errors.facultyCoordinator
                                }
                            />
                        </Grid>

                        {/* Industry Expert */}
                        <Grid item size={6}>
                            <TextField
                                size="small"
                                label="Industry Expert *"
                                name="industryExpert"
                                fullWidth
                                value={formik.values.industryExpert}
                                onChange={formik.handleChange}
                                error={
                                    formik.touched.industryExpert &&
                                    Boolean(formik.errors.industryExpert)
                                }
                                helperText={
                                    formik.touched.industryExpert &&
                                    formik.errors.industryExpert
                                }
                            />
                        </Grid>

                    
                        <Grid item size={6}>
                            <TextField
                                select
                                size="small"
                                label="Status *"
                                name="status"
                                fullWidth
                                value={formik.values.status}
                                onChange={formik.handleChange}
                            >
                                <MenuItem value="Running">Running</MenuItem>
                                <MenuItem value="On Track">On Track</MenuItem>
                                <MenuItem value="Delayed">Delayed</MenuItem>
                                <MenuItem value="Completed">Completed</MenuItem>
                                <MenuItem value="At Risk">At Risk</MenuItem>
                            </TextField>
                        </Grid>

                   
                        <Grid item size={6}>
                            <TextField
                                select
                                size="small"
                                label="Certificate Distributed *"
                                name="certificateDistributed"
                                fullWidth
                                value={formik.values.certificateDistributed}
                                onChange={formik.handleChange}
                            >
                                <MenuItem value="Yes">Yes</MenuItem>
                                <MenuItem value="No">No</MenuItem>
                            </TextField>
                        </Grid>

                   
                        <Grid item size={6}>
                            <TextField
                                size="small"
                                label="Start Date *"
                                name="startDate"
                                type="date"
                                fullWidth
                                InputLabelProps={{ shrink: true }}
                                value={formik.values.startDate}
                                onChange={formik.handleChange}
                            />
                        </Grid>

                        <Grid item size={6}>
                            <TextField
                                size="small"
                                label="End Date *"
                                name="endDate"
                                type="date"
                                fullWidth
                                InputLabelProps={{ shrink: true }}
                                value={formik.values.endDate}
                                onChange={formik.handleChange}
                            />
                        </Grid>
                    </Grid>

                    <Box mt={4} display="flex" justifyContent="flex-end" gap={2}>
                        <Button onClick={handleDialogClose}>Cancel</Button>
                        <Button type="submit" variant="contained">
                            Add Project
                        </Button>
                    </Box>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default CreateLiveProject;
