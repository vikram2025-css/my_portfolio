import { Routes, Route } from "react-router-dom";
import PublicLayout from "../Layout/PublicLayout";
import Projects from "../pages/Projects";
import Contact from "../pages/Contact";
import About from "../pages/About";
import HomePage from "../pages/HomePage";
import GridTable from "../components/GridTable";
import HospitalPage from "../pages/HospitalPage";
import Weather from "../components/Weather";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import Threejs from "../pages/Threejs";
import ClientsSection from "../pages/ClientSection";

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
                <Route path="/hospitalpage" element={<HospitalPage />} />
                <Route path="/weather" element={<Weather />} />
                <Route path="/threejs" element={<Threejs />} />
                <Route path="/clients" element={<ClientsSection />} />
            </Route>
        </Routes>
    );
}
