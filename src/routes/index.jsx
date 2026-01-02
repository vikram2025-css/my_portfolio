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

import AdminLogin from "../pages/E-com-login/Admin";
import CustomerLogin from "../pages/E-com-login/Customer";
import Customersignup from "../pages/E-com-signUp/Customer";

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


                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/customer/login" element={<CustomerLogin />} />
                <Route path="/customer/signUp" element={<Customersignup />} />

            </Route>




            {/* <Route element={<DeliveryPlatformLayout />} >

                <Route path="/delivery-platform" element={<DeliveryPlatform />} />
                {
                    path: '/admin',
                element: <AdminLayout />,
                children: [
                {
                    path: '/dashboard',
                element: <AdminDashboard />
              }
                ]
          },
                {
                    path: '/admin/login',
                element: <AdminLogin />
          },
                {
                    path: '/customer',
                element: <CustomerLayout />,
                children: [
                {
                    path: '/dashboard',
                element: <CustomerDashboard />
              }
                ]
          },
                {
                    path: '/customer/login',
                element: <CustomerLogin />
          },
                {
                    path: '/customer/signup',
                element: <CustomerSignup />
          },
                {
                    path: '/restaurant',
                element: <RestuarantLayout />,
                children: [
                {
                    path: '/dashboard',
                element: <RestaurantDashboard />
              }
                ]
          },
                {
                    path: '/restaurant/login',
                element: <RestaurantLogin />
          },
                {
                    path: '/restaurant/signup',
                element: <RestaurantSignup />
          },
                ]

            </Route> */}


        </Routes>
    );
}
