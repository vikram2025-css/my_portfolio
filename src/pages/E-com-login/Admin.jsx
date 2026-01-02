import React, { useState } from "react";
import {
    Box,
    Button,
    TextField,
    Typography,
    Paper,
    InputAdornment,
    IconButton,
    Alert
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Formik } from "formik";
import * as Yup from "yup";
//import { useMutation } from "@apollo/client";
//import { LOGIN_MUTATION } from "./mutations/auth";

const AdminLogin = () => {
    const [showPassword, setShowPassword] = useState(false);

    //const [login, { loading, error }] = useMutation(LOGIN_MUTATION);

    const validationSchema = Yup.object({
        email: Yup.string()
            .email("Invalid email")
            .required("Email is required"),
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
                <Typography variant="h5" textAlign="center" mb={2}>
                    Login
                </Typography>

                <Formik
                    initialValues={{ email: "", password: "" }}
                    validationSchema={validationSchema}
                    onSubmit={async (values) => {
                        try {
                            const { data } = await login({
                                variables: {
                                    email: values.email,
                                    password: values.password,
                                },
                            });

                            // ✅ Example: store token
                            localStorage.setItem("token", data.login.token);

                            console.log("User:", data.login.user);
                        } catch (err) {
                            console.error(err);
                        }
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
                            {error && (
                                <Alert severity="error" sx={{ mb: 2 }}>
                                    {error.message}
                                </Alert>
                            )}

                            <TextField
                                fullWidth
                                label="Email"
                                name="email"
                                margin="normal"
                                value={values.email}
                                onChange={handleChange}
                                error={touched.email && Boolean(errors.email)}
                                helperText={touched.email && errors.email}
                            />

                            <TextField
                                fullWidth
                                label="Password"
                                name="password"
                                margin="normal"
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

                            <Button
                                type="submit"
                                variant="contained"
                                fullWidth
                                disabled={loading}
                                sx={{ mt: 2 }}
                            >
                                {loading ? "Logging in..." : "Login"}
                            </Button>
                        </form>
                    )}
                </Formik>
            </Paper>
        </Box>
    );
};

export default AdminLogin;
