import React from "react";
import { Navigate } from "react-router-dom";

import PagesAwal from "../pages/PagesAwal/PagesAwal";
import PagesPemilihanAntrean from "../pages/PagesAntrean/PagesPemilihanAntrean/PagesPemilihanAntrean";
import PagesPoliklinik from "../pages/PagesAntrean/PagesPoliklinik/PagesPoliklinik";
import PagesPenjamin from "../pages/PagesAntrean/PagesPenjamin/PagesPenjamin";
import PagesPenjaminPendaftaran from "../pages/PagesPendaftaran/PagesPenjaminPendaftaran/PagesPenjaminPendaftaran";
import PagesUmum from "../pages/PagesPendaftaran/PagesUmum/PagesUmum";


const publicRoutes = [
    { path: "/pages-awal", component: <PagesAwal /> },
    { path: "/pages-pemilihan-antrean", component: <PagesPemilihanAntrean /> },
    { path: "/pages-poliklinik", component: <PagesPoliklinik /> },
    { path: "/pages-penjamin", component: <PagesPenjamin /> },
    { path: "/pages-penjamin-pendaftaran", component: <PagesPenjaminPendaftaran /> },
    { path: "/pages-pendaftaran-umum", component: <PagesUmum /> },

    {
        path: "/",
        exact: true,
        component: <Navigate to="/pages-awal" />,
      },
      { path: "*", component: <Navigate to="/pages-awal" /> },

]

export { publicRoutes };