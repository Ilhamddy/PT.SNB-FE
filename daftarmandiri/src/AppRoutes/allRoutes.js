import React from "react";
import { Navigate } from "react-router-dom";

import Login from "../pages/Login/Login";
import HomePage from "../pages/Home/HomePage";
import JadwalDokter from "../pages/JadwalDokter/JadwalDokter";
import DokterPage from "../pages/DokterPage/DokterPage";
import DaftarPasienLama from "../pages/DaftarPasienLama/DaftarPasienLama";

const publicRoutes = [
    { path: "/login/:page", component: <Login /> },
    { path: "/", component: <HomePage />},
    { path: "/jadwal-dokter", component: <JadwalDokter />},
    { path: "/dokter/:idDokter", component: <DokterPage />},
    { path: "/daftar/pasien-lama", component: <DaftarPasienLama />},
    
]

export { publicRoutes };