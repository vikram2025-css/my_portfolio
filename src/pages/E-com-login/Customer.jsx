import React, { useState } from "react";
import {
    Box,
    Button,
    TextField,
    Typography,
    InputAdornment,
    IconButton,
    Paper,
    Link,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Formik } from "formik";
import * as Yup from "yup";

const CustomerLogin = () => {
    const [showPassword, setShowPassword] = useState(false);

    // Custom validation: email OR phone
    const validationSchema = Yup.object({
        identifier: Yup.string()
            .required("Email or phone number is required")
            .test(
                "email-or-phone",
                "Enter a valid email or phone number",
                (value) => {
                    if (!value) return false;

                    const emailRegex =
                        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

                    const phoneRegex =
                        /^[0-9]{10,15}$/;

                    return emailRegex.test(value) || phoneRegex.test(value);
                }
            ),
        password: Yup.string()
            .min(6, "Minimum 6 characters")
            .required("Password is required"),
    });

    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="100vh"
        >
            <Paper elevation={4} sx={{ p: 4, width: 360 }}>
                <Typography variant="h5" mb={2} textAlign="center">
                    Login
                </Typography>

                <Formik
                    initialValues={{ identifier: "", password: "" }}
                    validationSchema={validationSchema}
                    onSubmit={(values) => {
                        console.log(values);
                        // send to API
                    }}
                >
                    {({
                        values,
                        errors,
                        touched,
                        handleChange,
                        handleSubmit,
                    }) => (
                        <form onSubmit={handleSubmit}>
                            {/* Email or Phone */}
                            <TextField
                                fullWidth
                                margin="normal"
                                label="Email or Phone No"
                                name="identifier"
                                value={values.identifier}
                                onChange={handleChange}
                                error={touched.identifier && Boolean(errors.identifier)}
                                helperText={touched.identifier && errors.identifier}
                            />

                            {/* Password */}
                            <TextField
                                fullWidth
                                margin="normal"
                                label="Password"
                                name="password"
                                type={showPassword ? "text" : "password"}
                                value={values.password}
                                onChange={handleChange}
                                error={touched.password && Boolean(errors.password)}
                                helperText={touched.password && errors.password}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={() => setShowPassword(!showPassword)}
                                                edge="end"
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />

                            {/* Forgot password */}
                            <Box textAlign="right" mt={1}>
                                <Link
                                    component="button"
                                    variant="body2"
                                    underline="hover"
                                    onClick={() => {
                                        console.log("Forgot password");
                                    }}
                                >
                                    Forgot password?
                                </Link>
                            </Box>

                            <Button
                                type="submit"
                                variant="contained"
                                fullWidth
                                sx={{ mt: 2 }}
                            >
                                Login
                            </Button>
                        </form>
                    )}
                </Formik>
            </Paper>
        </Box>
    );
};

export default CustomerLogin;
