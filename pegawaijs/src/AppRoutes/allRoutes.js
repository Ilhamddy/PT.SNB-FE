import React from "react";
import { Navigate } from "react-router-dom";

import Login from "../pages/Login/Login";
import Logout from "frontendjs/src/pages/Authentication/Logout";
import Dashboard from "../pages/Dashboard/Dashboard";

const publicRoutes = [
    { path: "/login", component: <Login /> },
    { path: "/logout", component: <Logout />},

]


const protectedRoutes = [
    {
        path: "/",
        exact: true,
        component: <Navigate to="/dashboard" />,
    },
    { path: "/dashboard", component: <Dashboard />}
    
]

export { publicRoutes, protectedRoutes };