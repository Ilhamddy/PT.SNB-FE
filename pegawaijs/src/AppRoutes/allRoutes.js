import React from "react";
import { Navigate } from "react-router-dom";

import Login from "../pages/Login/Login";
const publicRoutes = [
    { path: "/", component: <Login /> },
]

const protectedRoutes = [
]

export { publicRoutes, protectedRoutes };