import React, { useState } from "react";
import { motion } from "framer-motion";
import {
    Box,
    TextField,
    Button,
    Typography,
    Paper,
    Stack,
    InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import LocationOnIcon from "@mui/icons-material/LocationOn";

const API_KEY = "70796e6346b6279389b2c9bb362df985";

export default function WeatherApp() {
    const [city, setCity] = useState("");
    const [weather, setWeather] = useState(null);
    const [error, setError] = useState("");

    async function fetchWeatherByCity() {
        if (!city) {
            setError("Please enter a city name");
            setWeather(null);
            return;
        }
        try {
            const res = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
            );
            const data = await res.json();
            if (data.cod !== 200) throw new Error(data.message);
            setWeather(data);
            setError("");
        } catch (err) {
            setError(err.message);
            setWeather(null);
        }
    }

    function fetchWeatherByLocation() {
        if (!navigator.geolocation) {
            setError("Geolocation not supported by your browser");
            return;
        }
        navigator.geolocation.getCurrentPosition(async (position) => {
            const { latitude, longitude } = position.coords;
            try {
                const res = await fetch(
                    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`
                );
                const data = await res.json();
                if (data.cod !== 200) throw new Error(data.message);
                setWeather(data);
                setError("");
                setCity("");
            } catch (err) {
                setError(err.message);
                setWeather(null);
            }
        }, () => setError("Failed to get your location"));
    }

    const cloudVariants = {
        animate: {
            x: [0, 25, 0],
            opacity: [0.8, 1, 0.8],
            transition: {
                duration: 7,
                repeat: Infinity,
                repeatType: "mirror",
            },
        },
    };

    return (
        <Box
            sx={{

                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                background: "linear-gradient(135deg, #71b7e6, #9b59b6)",

                fontFamily: "'Roboto', sans-serif",

            }}
        >
            <Paper
                elevation={15}
                sx={{
                    width: 420,
                    padding: 3,
                    borderRadius: 4,
                    boxShadow:
                        "0 8px 30px rgba(0,0,0,0.12), 0 4px 6px rgba(0,0,0,0.1)",
                    background:
                        "linear-gradient(145deg, #ffffffdd, #f0f0f0dd)",
                    textAlign: "center",
                    mt: 8,
                }}
            >
                <Typography
                    variant="h3"
                    gutterBottom
                    sx={{ fontWeight: "700", letterSpacing: 2, color: "#333" }}
                >
                    Weather App
                </Typography>

                <Stack direction="row" spacing={2} justifyContent="center" mb={3}>
                    <TextField
                        label="Enter city"
                        variant="outlined"
                        size="medium"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        fullWidth
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon />
                                </InputAdornment>
                            ),
                        }}
                        sx={{
                            "& .MuiOutlinedInput-root": {
                                borderRadius: 3,
                                bgcolor: "#fefefe",
                                boxShadow: "0 2px 8px rgb(0 0 0 / 0.1)",
                            },
                            "& .Mui-focused fieldset": {
                                borderColor: "#9b59b6",
                                boxShadow: "0 0 8px #9b59b6",
                            },
                        }}
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        onClick={fetchWeatherByCity}
                        sx={{
                            borderRadius: 3,
                            padding: "14px 20px",
                            fontWeight: 600,
                            letterSpacing: 1,
                            boxShadow: "0 4px 15px rgba(155,89,182,0.4)",
                            "&:hover": {
                                backgroundColor: "#8e44ad",
                                boxShadow: "0 6px 20px rgba(155,89,182,0.6)",
                            },
                        }}
                    >
                        Search
                    </Button>
                </Stack>

                <Button
                    variant="outlined"
                    startIcon={<LocationOnIcon />}
                    fullWidth
                    onClick={fetchWeatherByLocation}
                    sx={{
                        mb: 3,
                        borderRadius: 3,
                        color: "#9b59b6",
                        borderColor: "#9b59b6",
                        fontWeight: 600,
                        letterSpacing: 1,
                        "&:hover": {
                            borderColor: "#8e44ad",
                            color: "#8e44ad",
                            backgroundColor: "#f7eaff",
                        },
                    }}
                >
                    Use Current Location
                </Button>

                {error && (
                    <Typography
                        color="error"
                        sx={{ mb: 3, fontWeight: 600, letterSpacing: 0.5 }}
                    >
                        {error}
                    </Typography>
                )}

                {weather && (
                    <Box
                        sx={{
                            p: 2,
                            borderRadius: 3,
                            backgroundColor: "rgba(255, 255, 255, 0.75)",
                            boxShadow: "0 4px 20px rgb(0 0 0 / 0.1)",
                            userSelect: "none",
                        }}
                    >
                        <motion.div
                            variants={cloudVariants}
                            animate="animate"
                            style={{
                                fontSize: 60,
                                marginBottom: 24,
                                filter: "drop-shadow(0 0 8px #a29bfe)",
                            }}
                            aria-label="Cloud animation"
                        >
                            ☁️
                        </motion.div>

                        <Typography
                            variant="h4"
                            color="#6c3483"
                            fontWeight={700}
                            mb={1}
                            textTransform="uppercase"
                            letterSpacing={1.5}
                        >
                            {weather.name}
                        </Typography>
                        <Typography
                            variant="h6"
                            mb={2}
                            sx={{ textTransform: "capitalize", color: "#9a77ff" }}
                        >
                            {weather.weather[0].description}
                        </Typography>

                        <motion.img
                            key={weather.weather[0].icon}
                            src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`}
                            alt="Weather icon"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.6 }}
                            style={{
                                marginBottom: 8,
                                filter: "drop-shadow(0 0 10px #9b59b6)",
                            }}
                        />
                        <Typography
                            variant="h5"
                            color="#4a235a"
                            fontWeight={700}
                            letterSpacing={1}
                        >
                            {weather.main.temp} °C
                        </Typography>
                    </Box>
                )}
            </Paper>
        </Box>
    );
}
