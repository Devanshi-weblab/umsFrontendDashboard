import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Avatar,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import Register from "./Register";
import ForgetPassword from "./ForgetPassword";
import API from "../api/api"; 

const Login = () => {
  const navigate = useNavigate();
  const [showRegister, setShowRegister] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
    }),
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        const res = await API.post("/auth/login", values); 

        const { token } = res.data;
        console.log("Login successful, token:", token);

        localStorage.setItem("token", token);

        navigate("/university-operations");
      } catch (error) {
        const message =
          error.response?.data?.message || "Invalid email or password";
        setErrors({ email: message });
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #667eea, #dc9eccff)",
      }}
    >
      {showRegister ? (
        <Register onBackToLogin={() => setShowRegister(false)} />
      ) : showForgotPassword ? (
        <ForgetPassword onBackToLogin={() => setShowForgotPassword(false)} />
      ) : (
        <Paper elevation={6} sx={{ p: 4, borderRadius: 3, width: 320 }}>
          <Box
            component="form"
            onSubmit={formik.handleSubmit}
            sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
          >
            <Avatar sx={{ bgcolor: "primary.main", mb: 1 }}>
              <LockOutlinedIcon />
            </Avatar>

            <Typography variant="h5" fontWeight="bold">
              Sign In
            </Typography>

            <Typography variant="body2" color="text.secondary" mb={3}>
              Enter your credentials to continue
            </Typography>

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

            <Button
              fullWidth
              type="submit"
              variant="contained"
              disabled={formik.isSubmitting || !formik.isValid}
              sx={{ mt: 3, py: 1.2 }}
            >
              {formik.isSubmitting ? "Logging in..." : "LOGIN"}
            </Button>

            <Typography
              variant="body2"
              color="primary"
              sx={{ mt: 2, cursor: "pointer" }}
              onClick={() => setShowForgotPassword(true)}
            >
              Forgot password?
            </Typography>

            <Typography variant="body2" sx={{ mt: 1, color: "text.secondary" }}>
              Don’t have an account?{" "}
              <Box
                component="span"
                sx={{
                  color: "primary.main",
                  cursor: "pointer",
                  fontWeight: 500,
                }}
                onClick={() => setShowRegister(true)}
              >
                Register
              </Box>
            </Typography>
          </Box>
        </Paper>
      )}
    </Box>
  );
};

export default Login;
