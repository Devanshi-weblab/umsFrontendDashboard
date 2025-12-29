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

    const ForgotPassword = ({ onBackToLogin }) => {
    const formik = useFormik({
        initialValues: {
        email: "",
        },
        validationSchema: Yup.object({
        email: Yup.string()
            .email("Invalid email address")
            .required("Email is required"),
        }),
        onSubmit: (values) => {
        console.log("Forgot Password Email:", values.email);
        alert("Password reset link sent!");
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
            <LockResetIcon />
            </Avatar>

            <Typography variant="h5" fontWeight="bold">
            Forgot Password
            </Typography>

            <Typography
            variant="body2"
            color="text.secondary"
            textAlign="center"
            mb={3}
            >
            Enter your email to receive a reset link
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

            <Button
            fullWidth
            type="submit"
            variant="contained"
            sx={{ mt: 3, py: 1.2 }}
            >
            SEND RESET LINK
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

    export default ForgotPassword;
            