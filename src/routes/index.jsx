import { Routes, Route } from "react-router-dom";
import PublicLayout from "../Layout/PublicLayout";
import Projects from "../pages/Projects";
import Contact from "../pages/Contact";
import About from "../pages/About";
import HomePage from "../pages/HomePage";
import GridTable from "../components/GridTable";
import Weather from "../components/Weather";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";

export default function AppRoutes() {
    return (
        <Routes>
            <Route element={<PublicLayout />}>





                <Route path="/" element={<HomePage />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/login" element={<Login />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/signup" element={<SignUp />} />

                <Route path="/gridtable" element={<GridTable />} />
                <Route path="/weather" element={<Weather />} />
            </Route>
        </Routes>
    );
}
