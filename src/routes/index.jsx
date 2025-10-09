import { Routes, Route } from "react-router-dom";
import Projects from "../pages/Projects";
import Contact from "../pages/Contact";
import About from "../pages/About";
import HomePage from "../pages/HomePage";

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
        </Routes>
    );
}
