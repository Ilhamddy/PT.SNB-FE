import React from "react";
import { Navigate } from "react-router-dom";

import Login from "../pages/Login/Login";
import HomePage from "../pages/Home/HomePage";
import JadwalDokter from "../pages/JadwalDokter/JadwalDokter";

const publicRoutes = [
    { path: "/login/:page", component: <Login /> },
    { path: "/", component: <HomePage />},
    { path: "/jadwal-dokter", component: <JadwalDokter />}
    
]

export { publicRoutes };