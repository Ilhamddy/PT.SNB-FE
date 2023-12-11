import React from "react";
import { Navigate } from "react-router-dom";

import Login from "../pages/Login/Login";
import HomePage from "../pages/Home/HomePage";
import JadwalDokter from "../pages/JadwalDokter/JadwalDokter";
import DokterPage from "../pages/DokterPage/DokterPage";
import DaftarPasienLama from "../pages/DaftarPasienLama/DaftarPasienLama";
import RiwayatPendaftaran from "../pages/RiwayatPendaftaran/RiwayatPendaftaran";
import AkunPage from "../pages/AkunPage/AkunPage";
import EditAkunPage from "../pages/EditAkunPage/EditAkunPage";
import PenjaminPage from "../pages/PenjaminPage/PenjaminPage";
import BeritaPage from "../pages/BeritaPage/BeritaPage";
import AntreanOnlinePage from "../pages/AntreanOnlinePage/AntreanOnlinePage"; 
import DetailPendaftaran from "../pages/DetailPendaftaran/DetailPendaftaran";
import TempatTidurPage from "../pages/TempatTidurPage/TempatTidurPage";
import VerifikasiEmail from "../pages/Login/VerifikasiEmail";

const publicRoutes = [
    { path: "/login/:page", component: <Login /> },
    { path: "/", component: <HomePage />},
    { path: "/jadwal-dokter", component: <JadwalDokter />},
    { path: "/dokter/:idDokter", component: <DokterPage />},
    { path: "/berita/:norecberita", component: <BeritaPage />},
    { path: "/bed", component: <TempatTidurPage />},
]

const protectedRoutes = [
    { path: "/daftar/pasien-lama/:step", component: <DaftarPasienLama />},
    { path: "/riwayat-daftar", component: <RiwayatPendaftaran />},
    { path: "/akun", component: <AkunPage />},
    { path: "/akun/edit", component: <EditAkunPage />},
    { path: "/akun/penjamin", component: <PenjaminPage />},
    { path: "/akun/antrean-online", component: <AntreanOnlinePage />},
    { path: "/akun/detail-pendaftaran/:norec", component: <DetailPendaftaran />},
    { path: "/akun/verif-email", component: <VerifikasiEmail />},

]

export { publicRoutes, protectedRoutes };