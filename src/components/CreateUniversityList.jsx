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
import API from "../api/api";
import ProgramSelector from "./ProgramSelector";
import BatchSelector from "./BatchSelector";


const validationSchema = Yup.object({
  university: Yup.string().required("University is required"),
  programs: Yup.string().required("Program is required"),
  batch: Yup.string().required("Batch is required"), 
  proposedAction: Yup.string().required("Proposed action is required"),
  responsiblePerson: Yup.string().required("Responsible person is required"),
  deadline: Yup.string().required("Timeline is required"),
  status: Yup.string().required("Status is required"),
  keyUpdates: Yup.string().required("Key updates are required"),
});


const CreateUniversityList = ({ open, handleClose, onSuccess, mode = "create", initialData = null, }) => {

  const emptyValues = {
    university: "",
    programs: "",
    batch: "",
    issues: "",
    proposedAction: "",
    responsiblePerson: "",
    deadline: "",
    status: "",
    keyUpdates: "",
  };


  const formik = useFormik({
    initialValues: emptyValues,
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const payload = {
          university: values.university,
          programs: values.programs,
          batch: values.batch,
          issues: values.issues || "",
          proposedAction: values.proposedAction,
          responsiblePerson: values.responsiblePerson,
          deadline: values.deadline ? new Date(values.deadline) : null,
          status: values.status,
          keyUpdates: values.keyUpdates,
        };

        const url =
          mode === "edit"
            ? `/programs/${initialData._id}`
            : `/programs`;

        const response = await API({
          url,
          method: mode === "edit" ? "PUT" : "POST",
          data: payload,
        });

        resetForm();
        setIsCustomUniversity(false);
        onSuccess();
        handleClose();

      } catch (error) {
        console.error("SUBMIT ERROR →", error);
        alert("Failed to save program. Please try again.");
      }
    },
  });

  const [programs, setPrograms] = useState([]);
  const [universities, setUniversities] = useState([]);
  const [isCustomUniversity, setIsCustomUniversity] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isCustomProgram, setIsCustomProgram] = useState(false);
  const [isCustomBatch, setIsCustomBatch] = useState(false);



  const handleDialogClose = () => {
    formik.resetForm();
    setIsCustomUniversity(false);
    handleClose();
  };

  useEffect(() => {
    if (!open) return;

    const fetchPrograms = async () => {
      try {
        const response = await API.get("/programs");

        const programs = response.data?.data || response.data || [];

        const uniqueUniversities = [
          ...new Set(
            programs
              .map(item => item.university)
              .filter(Boolean)
          )
        ];

        setUniversities(uniqueUniversities);
      } catch (error) {
        console.error("Error fetching universities:", error);
      }
    };


    fetchPrograms();
  }, [open]);


  useEffect(() => {
    if (!open) return;

    if (mode === "edit" && initialData) {
      formik.resetForm({
        values: {
          university: initialData.university ?? "",
          programs: initialData.programs ?? "",
          batch: initialData.batch ?? "",
          issues: initialData.issues ?? "",
          proposedAction: initialData.proposedAction ?? "",
          responsiblePerson: initialData.responsiblePerson ?? "",
          deadline: initialData.deadline
            ? initialData.deadline.slice(0, 10)
            : "",
          status: initialData.status ?? "",
          keyUpdates: initialData.keyUpdates ?? "",
        },
      });

      setIsCustomUniversity(false);
    }

    if (mode === "create") {
      formik.resetForm({ values: emptyValues });
      setIsCustomUniversity(false);
    }
  }, [open, mode, initialData]);

  return (
    <Dialog
      open={open}
      onClose={handleDialogClose}
      maxWidth={false}
      PaperProps={{
        sx: {
          width: "680px",
          borderRadius: "14px",
          p: 1,
        },
      }}
    >
      <DialogTitle sx={{ fontWeight: 600 }}>
        {mode === "edit" ? "Update Program Entry" : "Add New Program Entry"}
        <IconButton
          onClick={handleClose}
          sx={{ position: "absolute", right: 12, top: 12 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers sx={{ pt: 2 }}>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            <Grid size={6}>
              <TextField
                select
                size="small"
                label="University *"
                name="university"
                fullWidth
                displayEmpty
                value={isCustomUniversity ? "CUSTOM" : formik.values.university}
                onChange={(e) => {
                  if (e.target.value === "CUSTOM") {
                    setIsCustomUniversity(true);
                    formik.setFieldValue("university", "");
                  } else {
                    setIsCustomUniversity(false);
                    formik.handleChange(e);
                  }
                }}
                onBlur={formik.handleBlur}

                error={
                  formik.touched.university &&
                  Boolean(formik.errors.university)
                }
                helperText={
                  formik.touched.university && formik.errors.university
                }
              >
                {universities.map((uni) => (
                  <MenuItem key={uni} value={uni}>
                    {uni}
                  </MenuItem>
                ))}

                <MenuItem value="CUSTOM" sx={{ fontStyle: "italic" }}>
                  ➕ Add New University
                </MenuItem>
              </TextField>
            </Grid>
            {isCustomUniversity && (
              <Grid size={6}>
                <TextField
                  size="small"
                  label="New University Name *"
                  name="university"
                  fullWidth
                  value={formik.values.university}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.university &&
                    Boolean(formik.errors.university)
                  }
                  helperText={
                    formik.touched.university && formik.errors.university
                  }
                />
              </Grid>
            )}

            <Grid size={6}>
              <ProgramSelector
                value={isCustomProgram ? "CUSTOM" : formik.values.programs}
                onChange={(e) => {
                  if (e.target.value === "CUSTOM") {
                    setIsCustomProgram(true);
                    formik.setFieldValue("programs", "");
                  } else {
                    setIsCustomProgram(false);
                    formik.setFieldValue("programs", e.target.value);
                  }
                }}
                error={formik.touched.programs && Boolean(formik.errors.programs)}
                helperText={formik.touched.programs && formik.errors.programs}
              />
            </Grid>



            {isCustomProgram && (
              <Grid size={6}>
                <TextField
                  size="small"
                  label="New Program Name *"
                  name="programs"
                  fullWidth
                  value={formik.values.programs}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.programs &&
                    Boolean(formik.errors.programs)
                  }
                  helperText={
                    formik.touched.programs &&
                    formik.errors.programs
                  }
                />
              </Grid>
            )}

            <Grid size={6}>
              <BatchSelector
                value={isCustomBatch ? "CUSTOM" : formik.values.batch}
                onChange={(e) => {
                  if (e.target.value === "CUSTOM") {
                    setIsCustomBatch(true);
                    formik.setFieldValue("batch", "");
                  } else {
                    setIsCustomBatch(false);
                    formik.setFieldValue("batch", e.target.value);
                  }
                }}
                error={formik.touched.batch && Boolean(formik.errors.batch)}
                helperText={formik.touched.batch && formik.errors.batch}
              />
            </Grid>
            {isCustomBatch && (
              <Grid size={6}>
                <TextField
                  size="small"
                  label="New Batch *"
                  name="batch"
                  fullWidth
                  value={formik.values.batch}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.batch && Boolean(formik.errors.batch)}
                  helperText={formik.touched.batch && formik.errors.batch}
                />
              </Grid>
            )}

            <Grid size={12}>
              <TextField
                size="small"
                label="Issues / Challenges"
                name="issues"
                fullWidth
                value={formik.values.issues}
                onChange={formik.handleChange}
              />
            </Grid>

            <Grid size={12}>
              <TextField
                size="small"
                label="Proposed Action *"
                name="proposedAction"
                fullWidth
                value={formik.values.proposedAction}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.proposedAction &&
                  Boolean(formik.errors.proposedAction)
                }
                helperText={
                  formik.touched.proposedAction &&
                  formik.errors.proposedAction
                }
              />
            </Grid>

            <Grid size={6}>
              <TextField
                size="small"
                label="Responsible Person *"
                name="responsiblePerson"
                fullWidth
                value={formik.values.responsiblePerson}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.responsiblePerson &&
                  Boolean(formik.errors.responsiblePerson)
                }
                helperText={
                  formik.touched.responsiblePerson &&
                  formik.errors.responsiblePerson
                }
              />
            </Grid>

            <Grid size={6}>
              <TextField
                size="small"
                label="Timeline / Deadline *"
                name="deadline"
                type="date"
                fullWidth
                InputLabelProps={{ shrink: true }}
                value={formik.values.deadline}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.deadline && Boolean(formik.errors.deadline)}
                helperText={formik.touched.deadline && formik.errors.deadline}
              />
            </Grid>

            <Grid size={6}>
              <TextField
                select
                size="small"
                label="Status *"
                name="status"
                fullWidth
                value={formik.values.status}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.status && Boolean(formik.errors.status)}
                helperText={formik.touched.status && formik.errors.status}
              >
                <MenuItem value="" disabled>
                  Choose status
                </MenuItem>
                <MenuItem value="On Track">On Track</MenuItem>
                <MenuItem value="Delayed">Delayed</MenuItem>
                <MenuItem value="Completed">Completed</MenuItem>
                <MenuItem value="At Risk">At Risk</MenuItem>
              </TextField>
            </Grid>

            <Grid size={6}>
              <TextField
                size="small"
                label="Key Updates / Progress *"
                name="keyUpdates"
                fullWidth
                value={formik.values.keyUpdates}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.keyUpdates &&
                  Boolean(formik.errors.keyUpdates)
                }
                helperText={
                  formik.touched.keyUpdates &&
                  formik.errors.keyUpdates
                }
              />
            </Grid>
          </Grid>

          <Box mt={4} display="flex" justifyContent="flex-end" gap={2}>
            <Button onClick={handleDialogClose}>CANCEL</Button>
            <Button type="submit" variant="contained">
              {mode === "edit" ? "UPDATE ENTRY" : "ADD ENTRY"}
            </Button>
          </Box>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateUniversityList;
