import React from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Avatar,
} from "@mui/material";
import LockResetIcon from "@mui/icons-material/LockReset";
import { useFormik } from "formik";
import * as Yup from "yup";
import API from "../api/api";

const ResetPassword = ({ onBackToLogin }) => {
  const formik = useFormik({
    initialValues: {
      email: "",
      otp: "",
      password: "",
    },

    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email")
        .required("Email is required"),

      otp: Yup.string()
        .length(6, "OTP must be 6 digits")
        .required("OTP is required"),

      password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .required("New password is required"),
    }),

    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        const res = await API.post("/auth/reset-password", {
          email: values.email.trim(),  // ✅ ensure no spaces
          otp: values.otp,
          password: values.password,
        });

        alert(res.data.message || "Password reset successful");
        resetForm();
        onBackToLogin();
      } catch (error) {
        alert(
          error.response?.data?.message ||
          "Invalid or expired OTP"
        );
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <Paper elevation={6} sx={{ p: 4, borderRadius: 3, width: 340 }}>
      <Box
        component="form"
        onSubmit={formik.handleSubmit}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ bgcolor: "primary.main", mb: 1 }}>
          <LockResetIcon />
        </Avatar>

        <Typography variant="h5" fontWeight="bold">
          Reset Password
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          textAlign="center"
          mb={3}
        >
          Enter email, OTP and new password
        </Typography>

        {/* EMAIL */}
        <TextField
          fullWidth
          label="Email"
          name="email"
          margin="normal"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />

        {/* OTP */}
        <TextField
          fullWidth
          label="OTP"
          name="otp"
          margin="normal"
          value={formik.values.otp}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.otp && Boolean(formik.errors.otp)}
          helperText={formik.touched.otp && formik.errors.otp}
        />

        {/* PASSWORD */}
        <TextField
          fullWidth
          label="New Password"
          type="password"
          name="password"
          margin="normal"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />

        <Button
          fullWidth
          type="submit"
          variant="contained"
          sx={{ mt: 3, py: 1.2 }}
          disabled={formik.isSubmitting}
        >
          RESET PASSWORD
        </Button>

        <Typography
          variant="body2"
          sx={{ mt: 2, cursor: "pointer", color: "primary.main" }}
          onClick={onBackToLogin}
        >
          Back to Login
        </Typography>
      </Box>
    </Paper>
  );
};

export default ResetPassword;
