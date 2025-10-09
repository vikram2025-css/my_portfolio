import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";

export default function Navbar() {
    return (
        <AppBar position="static" color="transparent" elevation={0}>
            <Toolbar>
                {/* Logo / Brand */}
                <Typography
                    variant="h6"
                    component={Link}
                    to="/"
                    sx={{ flexGrow: 1, textDecoration: "none", color: "inherit" }}
                >
                    MyPortfolio
                </Typography>

                {/* Navigation Links */}
                <Box>
                    <Button component={Link} to="/" color="inherit">
                        Home
                    </Button>
                    <Button component={Link} to="/projects" color="inherit">
                        Projects
                    </Button>
                    <Button component={Link} to="/about" color="inherit">
                        About
                    </Button>
                    <Button component={Link} to="/contact" color="inherit">
                        Contact
                    </Button>
                </Box>
            </Toolbar>
        </AppBar>
    );
}
