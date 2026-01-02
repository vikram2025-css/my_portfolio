import React, { useState } from "react";
import {
    Box,
    Button,
    TextField,
    Typography,
    ToggleButton,
    ToggleButtonGroup,
    InputAdornment,
    IconButton,
    Paper,
    Checkbox,
    FormControlLabel,
    Link
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Formik } from "formik";
import * as Yup from "yup";

const CustomerSignup = () => {
    const [signupType, setSignupType] = useState("email");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
        confirmPassword: Yup.string()
            .oneOf([Yup.ref("password")], "Passwords do not match")
            .required("Confirm your password"),
        terms: Yup.boolean().oneOf([true], "You must accept the terms"),
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
                    Sign Up
                </Typography>



                <Formik
                    initialValues={{
                        identifier: "",
                        password: "",
                        confirmPassword: "",
                        terms: false,
                    }}
                    validationSchema={validationSchema}
                    enableReinitialize
                    onSubmit={(values) => {
                        console.log({
                            type: signupType,
                            ...values,
                        });
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
                                            <IconButton onClick={() => setShowPassword(!showPassword)}>
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />

                            <TextField
                                fullWidth
                                margin="normal"
                                label="Confirm Password"
                                name="confirmPassword"
                                type={showConfirmPassword ? "text" : "password"}
                                value={values.confirmPassword}
                                onChange={handleChange}
                                error={
                                    touched.confirmPassword &&
                                    Boolean(errors.confirmPassword)
                                }
                                helperText={
                                    touched.confirmPassword && errors.confirmPassword
                                }
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={() =>
                                                    setShowConfirmPassword(!showConfirmPassword)
                                                }
                                            >
                                                {showConfirmPassword ? (
                                                    <VisibilityOff />
                                                ) : (
                                                    <Visibility />
                                                )}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />

                            <FormControlLabel
                                control={
                                    <Checkbox
                                        name="terms"
                                        checked={values.terms}
                                        onChange={handleChange}
                                    />
                                }
                                label={
                                    <Typography variant="body2">
                                        I agree to the{" "}
                                        <Link href="#" underline="hover">
                                            Terms & Conditions
                                        </Link>
                                    </Typography>
                                }
                            />
                            {touched.terms && errors.terms && (
                                <Typography variant="caption" color="error">
                                    {errors.terms}
                                </Typography>
                            )}

                            <Button
                                type="submit"
                                variant="contained"
                                fullWidth
                                sx={{ mt: 2 }}
                            >
                                Create Account
                            </Button>

                            <Typography variant="body2" textAlign="center" mt={2}>
                                Already have an account?{" "}
                                <Link
                                    component="button"
                                    underline="hover"
                                    onClick={() => {
                                        console.log("Navigate to login");
                                    }}
                                >
                                    Login
                                </Link>
                            </Typography>
                        </form>
                    )}
                </Formik>
            </Paper>
        </Box>
    );
};

export default CustomerSignup;
