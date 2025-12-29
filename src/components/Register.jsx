import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Avatar,
  CircularProgress,
} from "@mui/material";
import PersonAddOutlinedIcon from "@mui/icons-material/PersonAddOutlined";
import { useFormik } from "formik";
import * as Yup from "yup";
import API from "../api/api";

const Register = ({ onBackToLogin }) => {
  const [apiError, setApiError] = useState("");

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email")
        .required("Email is required"),
      password: Yup.string()
        .min(6, "Minimum 6 characters")
        .required("Password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords do not match")
        .required("Confirm your password"),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      setApiError(""); 
      try {
        const response = await API.post("/auth/register", {
          email: values.email,
          password: values.password,
        });

        alert("Admin registered successfully. Please login.");
        onBackToLogin();
      } catch (error) {
       
        const message =
          error.response?.data?.message || "Registration failed. Try again.";
        setApiError(message);
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <Paper elevation={6} sx={{ p: 4, borderRadius: 3, width: 320 }}>
      <Box
        component="form"
        onSubmit={formik.handleSubmit}
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <Avatar sx={{ bgcolor: "primary.main", mb: 1 }}>
          <PersonAddOutlinedIcon />
        </Avatar>

        <Typography variant="h5" fontWeight="bold">
          Register
        </Typography>

        <Typography variant="body2" color="text.secondary" mb={3}>
          Create your admin account
        </Typography>

        {/* Display API Error */}
        {apiError && (
          <Typography color="error" variant="body2" mb={2}>
            {apiError}
          </Typography>
        )}

        <TextField
          fullWidth
          label="Email Address"
          margin="normal"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />

        <TextField
          fullWidth
          label="Password"
          type="password"
          margin="normal"
          name="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />

        <TextField
          fullWidth
          label="Confirm Password"
          type="password"
          margin="normal"
          name="confirmPassword"
          value={formik.values.confirmPassword}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.confirmPassword &&
            Boolean(formik.errors.confirmPassword)
          }
          helperText={
            formik.touched.confirmPassword && formik.errors.confirmPassword
          }
        />

        <Button
          fullWidth
          type="submit"
          variant="contained"
          disabled={formik.isSubmitting || !formik.isValid}
          sx={{ mt: 3, py: 1.2, position: "relative" }}
        >
          {formik.isSubmitting ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            "REGISTER"
          )}
        </Button>

        <Typography variant="body2" sx={{ mt: 2, color: "text.secondary" }}>
          Already have an account?{" "}
          <Box
            component="span"
            sx={{
              color: "primary.main",
              cursor: "pointer",
              fontWeight: 500,
            }}
            onClick={onBackToLogin}
          >
            Sign In
          </Box>
        </Typography>
      </Box>
    </Paper>
  );
};

export default Register;
