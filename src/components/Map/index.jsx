import { Box, Card, CardContent, Typography, Button } from "@mui/material";

export default function Map() {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                width: "100%",
                minHeight: 400,
            }}
        >
            {/* LEFT: MAP */}
            <Box
                sx={{
                    flex: 1,
                    height: { xs: 300, md: "auto" },
                    overflow: "hidden",
                    p: 3,

                }}
            >
                <iframe
                    width="100%"
                    height="100%"
                    style={{ border: 2, borderColor: "#0c0c0cff", }}
                    loading="lazy"

                    referrerPolicy="no-referrer-when-downgrade"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3559.536393510058!2d75.78727097530533!3d26.91243367647045!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396db4db2d13b68f%3A0xb0ef0b8a7c4fa2f4!2sJaipur%2C%20Rajasthan!5e0!3m2!1sen!2sin!4v1733200000000"
                ></iframe>

            </Box>

            {/* RIGHT: CARD */}
            <Box
                sx={{
                    flex: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    p: { xs: 2, md: 4 },
                }}
            >
                <Card
                    sx={{
                        width: "100%",
                        maxWidth: 420,
                        boxShadow: 3,
                        borderRadius: 2,
                    }}
                >
                    <CardContent>
                        <Typography variant="h5" fontWeight="bold" gutterBottom>
                            Our Location
                        </Typography>

                        <Typography variant="body1" color="text.secondary" mb={2}>
                            Visit our office located in a prime area with easy access to
                            transportation and major landmarks.
                        </Typography>

                        <Typography variant="body2" color="text.secondary" mb={3}>
                            📍 Jaipur, Rajasthan
                            <br />
                            🕒 Mon–Sat: 10:00 AM – 6:00 PM
                        </Typography>

                        <Button variant="contained">Get Directions</Button>
                    </CardContent>
                </Card>
            </Box>
        </Box>
    );
}
