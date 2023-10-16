import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { isAllowedAccess } from "../helpers/permission_helper";
import { getUserPermissions } from "../helpers/parse_menu";

const Navdata = () => {
    const history = useNavigate();
    //state data
    const [isDashboard, setIsDashboard] = useState(false);
    const [isRegistrasi, setIsRegistrasi] = useState(false);
    const [isListDaftarPasien, setListDaftarPasien] = useState(false);
    const [isRekamMedis, setRekamMedis] = useState(false);
    const [isLaporan, setLaporan] = useState(false);
    const [isLaporanRL, setLaporanRL] = useState(false);
    const [isPembayaran, setPembayaran] = useState(false);
    const [isLaporanKasir, setLaporanKasir] = useState(false);
    const [isRadiologi, setRadiologi] = useState(false);
    const [isLaboratorium, setLaboratorium] = useState(false);
    const [isCasemix, setCasemix] = useState(false);
    const [isGudang, setIsGudang] = useState(false);
    const [isFarmasi, setIsFarmasi] = useState(false);
    const [isApps, setIsApps] = useState(false);
    const [isAuth, setIsAuth] = useState(false);
    const [isPages, setIsPages] = useState(false);
    const [isBaseUi, setIsBaseUi] = useState(false);
    const [isAdvanceUi, setIsAdvanceUi] = useState(false);
    const [isForms, setIsForms] = useState(false);
    const [isTables, setIsTables] = useState(false);
    const [isCharts, setIsCharts] = useState(false);
    const [isIcons, setIsIcons] = useState(false);
    const [isMaps, setIsMaps] = useState(false);
    const [isMultiLevel, setIsMultiLevel] = useState(false);
    const [isListGawatDarurat, setListGawatDarurat] = useState(false);
    const [isListBedahSentral, setListBedahSentral] = useState(false);
    const [isListAdminKonten, setIsListAdminKonten] = useState(false);
    const [isSumberDayaManusia, setSumberDayaManusia] = useState(false);

    // Apps
    const [isEmail, setEmail] = useState(false);
    const [isSubEmail, setSubEmail] = useState(false);
    const [isEcommerce, setIsEcommerce] = useState(false);
    const [isProjects, setIsProjects] = useState(false);
    const [isTasks, setIsTasks] = useState(false);
    const [isCRM, setIsCRM] = useState(false);
    const [isCrypto, setIsCrypto] = useState(false);
    const [isInvoices, setIsInvoices] = useState(false);
    const [isSupportTickets, setIsSupportTickets] = useState(false);
    const [isNFTMarketplace, setIsNFTMarketplace] = useState(false);
    const [isJobs, setIsJobs] = useState(false);
    const [isJobList, setIsJobList] = useState(false);
    const [isCandidateList, setIsCandidateList] = useState(false);

    // Authentication
    const [isSignIn, setIsSignIn] = useState(false);
    const [isSignUp, setIsSignUp] = useState(false);
    const [isPasswordReset, setIsPasswordReset] = useState(false);
    const [isPasswordCreate, setIsPasswordCreate] = useState(false);
    const [isLockScreen, setIsLockScreen] = useState(false);
    const [isLogout, setIsLogout] = useState(false);
    const [isSuccessMessage, setIsSuccessMessage] = useState(false);
    const [isVerification, setIsVerification] = useState(false);
    const [isError, setIsError] = useState(false);

    // Pages
    const [isProfile, setIsProfile] = useState(false);
    const [isLanding, setIsLanding] = useState(false);

    // Charts
    const [isApex, setIsApex] = useState(false);

    // Multi Level
    const [isLevel1, setIsLevel1] = useState(false);
    const [isLevel2, setIsLevel2] = useState(false);

    const [iscurrentState, setIscurrentState] = useState('Dashboard');

    function updateIconSidebar(e) {
        if (e && e.target && e.target.getAttribute("subitems")) {
            const ul = document.getElementById("two-column-menu");
            const iconItems = ul.querySelectorAll(".nav-icon.active");
            let activeIconItems = [...iconItems];
            activeIconItems.forEach((item) => {
                item.classList?.remove("active");
                var id = item.getAttribute("subitems");
                if (document.getElementById(id))
                    document.getElementById(id).classList?.remove("show");
            });
        }
    }

    useEffect(() => {
        document.body.classList?.remove('twocolumn-panel');
        if (iscurrentState !== 'Dashboard') {
            setIsDashboard(false);
        }
        if (iscurrentState !== 'Registrasi') {
            setIsRegistrasi(false);
        }
        if (iscurrentState !== 'ListDaftarPasien') {
            setListDaftarPasien(false);
        }
        if (iscurrentState !== 'Apps') {
            setIsApps(false);
        }
        if (iscurrentState !== 'Auth') {
            setIsAuth(false);
        }
        if (iscurrentState !== 'Pages') {
            setIsPages(false);
        }
        if (iscurrentState !== 'BaseUi') {
            setIsBaseUi(false);
        }
        if (iscurrentState !== 'AdvanceUi') {
            setIsAdvanceUi(false);
        }
        if (iscurrentState !== 'Forms') {
            setIsForms(false);
        }
        if (iscurrentState !== 'Tables') {
            setIsTables(false);
        }
        if (iscurrentState !== 'Charts') {
            setIsCharts(false);
        }
        if (iscurrentState !== 'Icons') {
            setIsIcons(false);
        }
        if (iscurrentState !== 'Maps') {
            setIsMaps(false);
        }
        if (iscurrentState !== 'MuliLevel') {
            setIsMultiLevel(false);
        }
        if (iscurrentState === 'Widgets') {
            history("/widgets");
            document.body.classList?.add('twocolumn-panel');
        }
        if (iscurrentState !== 'Landing') {
            setIsLanding(false);
        }
    }, [
        history,
        iscurrentState,
        isDashboard,
        isRegistrasi,
        isListDaftarPasien,
        isRekamMedis,
        isLaporan,
        isRadiologi,
        isLaboratorium,
        isCasemix,
        isApps,
        isAuth,
        isPages,
        isBaseUi,
        isAdvanceUi,
        isForms,
        isTables,
        isCharts,
        isIcons,
        isMaps,
        isMultiLevel
    ]);

    const menuItems = [
        {
            label: "Menu",
            isHeader: true,
        },
        {
            id: "dashboard",
            label: "Dashboards",
            icon: "las la-tachometer-alt",
            link: "/#",
            stateVariables: isDashboard,
            click: function (e) {
                e.preventDefault();
                setIsDashboard(!isDashboard);
                setIscurrentState('Dashboard');
                updateIconSidebar(e);
            },
        },
        {
            id: "registrasi",
            label: "Registrasi",
            icon: "bx bx-been-here",
            link: "/#",
            click: function (e) {
                e.preventDefault();
                setIsRegistrasi(!isRegistrasi);
                setIscurrentState('Registrasi');
                updateIconSidebar(e);
            },
            stateVariables: isRegistrasi,
            isAllowed: () => {
                return isAllowedAccess(getUserPermissions(), [
                    "REGISTRASI_VIEW",
                ]);
            },
            subItems: [
                {
                    id: "registrasi-pasien-baru",
                    label: "Pasien Baru",
                    link: "/registrasi/pasien-baru",
                    parentId: "registrasi",
                    isAllowed: () => {
                        return isAllowedAccess(getUserPermissions(), [
                            "REGISTRASI_VIEW", "REGISTRASI_CREATE"
                        ]);
                    }
                },
                {
                    id: "registrasi-pasien-lama",
                    label: "Pasien Lama",
                    link: "/registrasi/pasien-lama",
                    parentId: "registrasi",
                    isAllowed: () => {
                        return isAllowedAccess(getUserPermissions(), [
                            "REGISTRASI_VIEW",
                        ]);
                    }
                },
                {
                    id: "registrasi-online",
                    label: "Registrasi Online",
                    link: "/bGlzdGRhZnRhcnBhc2llbi9kYWZ0YXItcGFzaWVuLWlnZA==",
                    parentId: "registrasi",
                    isAllowed: () => {  
                        return isAllowedAccess(getUserPermissions(), [
                            "REGISTRASI_VIEW",
                        ]);
                    }
                },

            ],
        },
        {
            id: "listdaftarpasien",
            label: "List Daftar Pasien",
            icon: "ri-hotel-bed-fill",
            link: "/#",
            click: function (e) {
                e.preventDefault();
                setListDaftarPasien(!isListDaftarPasien);
                setIscurrentState('ListDaftarPasien');
                updateIconSidebar(e);
            },
            stateVariables: isListDaftarPasien,
            isAllowed: () => {
                return isAllowedAccess(getUserPermissions(), [
                    "REGISTRASI_VIEW"
                ]);
            },
            subItems: [
                {
                    id: "daftar-pasien-registrasi",
                    label: "Daftar Pasien Registrasi",
                    link: "/listdaftarpasien/daftarpasienregistrasi",
                    parentId: "listdaftarpasien",
                    isAllowed: () => {
                        return isAllowedAccess(getUserPermissions(), [
                            "REGISTRASI_VIEW",
                        ]);
                    }
                },
                {
                    id: "registrasi-pasien-lama",
                    label: "Daftar Pasien Gawat Darurat",
                    link: "/listdaftarpasien/daftar-pasien-igd",
                    parentId: "listdaftarpasien",
                    isAllowed: () => {
                        return isAllowedAccess(getUserPermissions(), [
                            "REGISTRASI_VIEW"
                        ]);
                    }
                },
                {
                    id: "registrasi-pasien-lama",
                    label: "Daftar Pasien Rawat Jalan",
                    link: "/listdaftarpasien/daftar-pasien-rj",
                    parentId: "listdaftarpasien",
                    isAllowed: () => {
                        return isAllowedAccess(getUserPermissions(), [
                            "REGISTRASI_VIEW"
                        ]);
                    }
                },
                {
                    id: "daftar-pasien-registrasi",
                    label: "Daftar Pasien Mutasi",
                    link: "/bGlzdGRhZnRhcnBhc2llbi9kYWZ0YXJwYXNpZW5tdXRhc2k=",
                    parentId: "listdaftarpasien",
                },
                {
                    id: "registrasi-pasien-lama",
                    label: "Daftar Pasien Rawat Inap",
                    link: "/listdaftarpasien/daftar-pasien-ri",
                    parentId: "listdaftarpasien",
                    isAllowed: () => {
                        return isAllowedAccess(getUserPermissions(), [
                            "REGISTRASI_VIEW",
                        ]);
                    }
                },
                {
                    id: "daftar-pasien-pulang",
                    label: "Daftar Pasien Pulang",
                    link: "/listdaftarpasien/daftar-pasien-pulang",
                    parentId: "listdaftarpasien",
                    isAllowed: () => {
                        return isAllowedAccess(getUserPermissions(), [
                            "REGISTRASI_VIEW",
                        ]);
                    }
                },
                {
                    id: "daftar-pasien-farmasi",
                    label: "Daftar Pasien Farmasi",
                    link: "/listdaftarpasien/daftar-pasien-farmasi",
                    parentId: "listdaftarpasien",
                    isAllowed: () => {
                        return isAllowedAccess(getUserPermissions(), [
                            "REGISTRASI_VIEW",
                        ]);
                    }
                },
            ],
        },
        {
            id: "rekammedis",
            label: "Rekam Medis",
            icon: "ri-hotel-bed-fill",
            link: "/#",
            click: function (e) {
                e.preventDefault();
                setRekamMedis(!isRekamMedis);
                setIscurrentState('isRekamMedis');
                updateIconSidebar(e);
            },
            stateVariables: isRekamMedis,
            isAllowed: () => {
                return isAllowedAccess(getUserPermissions(), [
                    "REGISTRASI_VIEW","REKAMMEDIS_VIEW"
                ]);
            },
            subItems: [
                {
                    id: "rekammedis-kendalidokumen",
                    label: "Kendali Dokumen",
                    link: "/rekammedis/kendalidokumen",
                    parentId: "rekammedis",
                    isAllowed: () => {
                        return isAllowedAccess(getUserPermissions(), [
                            "REGISTRASI_VIEW",
                        ]);
                    }
                },
                {
                    id: "rekammedis-mapping",
                    label: "Mapping RL",
                    link: "/cmVrYW1tZWRpcy9tYXBwaW5nLXJs",
                    parentId: "rekammedis",
                    isAllowed: () => {
                        return isAllowedAccess(getUserPermissions(), [
                            "REGISTRASI_VIEW",
                        ]);
                    }
                },
                {
                    id: "rekammedis-laporan",
                    label: "Laporan",
                    icon: "lab la-delicious",
                    link: "/#",
                    parentId: "rekammedis",
                    isChildItem: true,
                    click: function (e) {
                        e.preventDefault();
                        setLaporan(!isLaporan);
                    },
                    stateVariables: isLaporan,
                    isAllowed: () => {
                        return isAllowedAccess(getUserPermissions(), [
                            "REGISTRASI_VIEW",
                        ]);
                    },
                    childItems: [
                        {
                            id: "rekammedis-laporan-pasien-daftar",
                            label: "Laporan Pasien Daftar",
                            link: "/cmVrYW1tZWRpcy9sYXBvcmFuLXBhc2llbi1kYWZ0YXI=",
                            parentId: "rekammedis-laporan",
                            isAllowed: () => {
                                return isAllowedAccess(getUserPermissions(), [
                                    "REGISTRASI_VIEW",
                                ]);
                            },
                        },
                        {
                            id: "rekammedis-laporan-pasien-batal",
                            label: "Laporan Pasien Batal",
                            link: "/cmVrYW1tZWRpcy9sYXBvcmFuLXBhc2llbi1iYXRhbA==",
                            parentId: "rekammedis-laporan",
                            isAllowed: () => {
                                return isAllowedAccess(getUserPermissions(), [
                                    "REGISTRASI_VIEW",
                                ]);
                            },
                        },
                        {
                            id: "rekammedis-laporan-pasien-kunjungan",
                            label: "Laporan Pasien Kunjungan",
                            link: "/cmVrYW1tZWRpcy9sYXBvcmFuLXBhc2llbi1rdW5qdW5nYW4=",
                            parentId: "rekammedis-laporan",
                            isAllowed: () => {
                                return isAllowedAccess(getUserPermissions(), [
                                    "REGISTRASI_VIEW",
                                ]);
                            },
                        },
                        {
                            id: "rekammedis-laporan-rl",
                            label: "Laporan RL",
                            link: "/#",
                            parentId: "rekammedis-laporan-rl",
                            isChildItem: true,
                            click: function (e) {
                                e.preventDefault();
                                setLaporanRL(!isLaporanRL);
                            },
                            stateVariables: isLaporanRL,
                            childItems: [
                                { id: 2, label: "Laporan RL3.1", link: "/cmVrYW1tZWRpcy9sYXBvcmFuLXJsL3JsMy4x", parentId: "rekammedis-laporan-rl3-1" },
                                { id: 3, label: "Laporan RL3.2", link: "/cmVrYW1tZWRpcy9sYXBvcmFuLXJsL3JsMy4y", parentId: "rekammedis-laporan-rl3-2" },
                            ],
                        },
                    ],
                }
            ]
        },
        // KASIR
        {
            id: "listpembayaran",
            label: "List pembayaran",
            icon: "ri-bank-card-2-fill",
            link: "/#",
            click: function (e) {
                e.preventDefault();
                setPembayaran(!isPembayaran);
                setIscurrentState('isRekamMedis');
                updateIconSidebar(e);
            },
            stateVariables: isPembayaran,
            isAllowed: () => {
                return isAllowedAccess(getUserPermissions(), [
                    "REGISTRASI_VIEW","KASIR_VIEW"
                ]);
            },
            subItems: [
                {
                    id: "daftar-pembayaran",
                    label: "Daftar Tagihan",
                    link: "/payment/daftar-tagihan",
                    parentId: "listpembayaran",
                    isAllowed: () => {
                        return isAllowedAccess(getUserPermissions(), [
                            "REGISTRASI_VIEW",
                        ]);
                    }
                },
                {
                    id: "daftar-piutang",
                    label: "Daftar Piutang Pasien",
                    link: "/payment/daftar-piutang/pasien",
                    parentId: "listpembayaran",
                    isAllowed: () => {
                        return isAllowedAccess(getUserPermissions(), [
                            "REGISTRASI_VIEW",
                        ]);
                    }
                },
                {
                    id: "daftar-piutang",
                    label: "Daftar Piutang Asuransi",
                    link: "/payment/daftar-piutang/asuransi",
                    parentId: "listpembayaran",
                    isAllowed: () => {
                        return isAllowedAccess(getUserPermissions(), [
                            "REGISTRASI_VIEW",
                        ]);
                    }
                }
            ]
        },
        {
            id: "laboratorium",
            label: "Laboratorium",
            icon: "las la-flask",
            link: "/#",
            click: function (e) {
                e.preventDefault();
                setLaboratorium(!isLaboratorium);
                setIscurrentState('isLaboratorium');
                updateIconSidebar(e);
            },
            stateVariables: isLaboratorium,
            isAllowed: () => {
                return isAllowedAccess(getUserPermissions(), [
                    "REGISTRASI_VIEW","LABORATORIUM_VIEW"
                ]);
            },
            subItems: [
                {
                    id: "laboratorium-daftarorderlaboratorium",
                    label: "Daftar Order Laboratorium",
                    link: "/laboratorium/daftarorderlaboratorium",
                    parentId: "laboratorium",
                    isAllowed: () => {
                        return isAllowedAccess(getUserPermissions(), [
                            "REGISTRASI_VIEW",
                        ]);
                    }
                },
                {
                    id: "laboratorium-daftarpasienlaboratorium",
                    label: "Daftar Pasien Laboratorium",
                    link: "/laboratorium/daftarpasienlaboratorium",
                    parentId: "laboratorium",
                    isAllowed: () => {
                        return isAllowedAccess(getUserPermissions(), [
                            "REGISTRASI_VIEW",
                        ]);
                    }
                },
                {
                    id: "laboratorium-masterlayananlab",
                    label: "Master Layanan Laboratorium",
                    link: "/laboratorium/masterlayananlab",
                    parentId: "laboratorium",
                    isAllowed: () => {
                        return isAllowedAccess(getUserPermissions(), [
                            "REGISTRASI_VIEW",
                        ]);
                    }
                },
            ]
        },
        {
            id: "radiologi",
            label: "Radiologi",
            icon: "las la-radiation-alt",
            link: "/#",
            click: function (e) {
                e.preventDefault();
                setRadiologi(!isRadiologi);
                setIscurrentState('isRadiologi');
                updateIconSidebar(e);
            },
            stateVariables: isRadiologi,
            isAllowed: () => {
                return isAllowedAccess(getUserPermissions(), [
                    "REGISTRASI_VIEW","RADIOLOGI_VIEW"
                ]);
            },
            subItems: [
                {
                    id: "radiologi-daftarorderradiologi",
                    label: "Daftar Order Radiologi",
                    link: "/radiologi/daftarorderradiologi",
                    parentId: "radiologi",
                    isAllowed: () => {
                        return isAllowedAccess(getUserPermissions(), [
                            "REGISTRASI_VIEW",
                        ]);
                    }
                },
                {
                    id: "radiologi-daftarpasienradiologi",
                    label: "Daftar Pasien Radiologi",
                    link: "/radiologi/daftarpasienradiologi",
                    parentId: "radiologi",
                    isAllowed: () => {
                        return isAllowedAccess(getUserPermissions(), [
                            "REGISTRASI_VIEW",
                        ]);
                    }
                },
            ]
        },
        {
            id: "farmasi",
            label: "Farmasi",
            icon: "ri-toggle-fill",
            link: "/#",
            click: function (e) {
                e.preventDefault();
                setIsFarmasi(!isFarmasi);
                setIscurrentState('isFarmasi');
                updateIconSidebar(e);
            },
            stateVariables: isFarmasi,
            isAllowed: () => {
                return isAllowedAccess(getUserPermissions(), [
                    "REGISTRASI_VIEW","FARMASI_VIEW"
                ]);
            },
            subItems: [
                {
                    id: "List Order",
                    label: "List Order",
                    link: "/farmasi/order-list",
                    parentId: "farmasi",
                    isAllowed: () => {
                        return isAllowedAccess(getUserPermissions(), [
                            "REGISTRASI_VIEW",
                        ]);
                    }
                },
                {
                    id: "Penjualan Obat Bebas",
                    label: "Penjualan Obat Bebas",
                    link: "/farmasi/penjualan-obat-bebas",
                    parentId: "farmasi",
                    isAllowed: () => {
                        return isAllowedAccess(getUserPermissions(), [
                            "REGISTRASI_VIEW",
                        ]);
                    }
                },
            ]
        },
        {
            id: "gudang",
            label: "Gudang Farmasi",
            icon: "ri-building-4-fill",
            link: "/#",
            click: function (e) {
                e.preventDefault();
                setIsGudang(!isGudang);
                setIscurrentState('isGudang');
                updateIconSidebar(e);
            },
            stateVariables: isGudang,
            isAllowed: () => {
                return isAllowedAccess(getUserPermissions(), [
                    "REGISTRASI_VIEW","GUDANG_FARMASI_VIEW"
                ]);
            },
            subItems: [
                {
                    id: "Produk",
                    label: "Master Produk",
                    link: "/farmasi/gudang/list-produk",
                    parentId: "gudang",
                    isAllowed: () => {
                        return isAllowedAccess(getUserPermissions(), [
                            "REGISTRASI_VIEW",
                        ]);
                    }
                },
                {
                    id: "penerimaanproduk",
                    label: "Penerimaan produk",
                    link: "/farmasi/gudang/penerimaan-produk-list",
                    parentId: "gudang",
                    isAllowed: () => {
                        return isAllowedAccess(getUserPermissions(), [
                            "REGISTRASI_VIEW",
                        ]);
                    }
                },
                {
                    id: "distribusiorder",
                    label: "Distribusi Order",
                    link: "/farmasi/gudang/distribusi-order-list",
                    parentId: "gudang",
                    isAllowed: () => {
                        return isAllowedAccess(getUserPermissions(), [
                            "REGISTRASI_VIEW",
                        ]);
                    }
                },
                {
                    id: "stokunit",
                    label: "Stok Unit",
                    link: "/farmasi/gudang/stok-unit",
                    parentId: "gudang",
                    isAllowed: () => {
                        return isAllowedAccess(getUserPermissions(), [
                            "REGISTRASI_VIEW",
                        ]);
                    }
                },
                {
                    id: "stokopname",
                    label: "Stok Opname",
                    link: "/farmasi/gudang/stok-opname/daftar-stok-opname",
                    parentId: "gudang",
                    isAllowed: () => {
                        return isAllowedAccess(getUserPermissions(), [
                            "REGISTRASI_VIEW",
                        ]);
                    }
                },
                {
                    id: "kartustok",
                    label: "Kartu Stok",
                    link: "/farmasi/gudang/kartu-stok",
                    parentId: "gudang",
                    isAllowed: () => {
                        return isAllowedAccess(getUserPermissions(), [
                            "REGISTRASI_VIEW",
                        ]);
                    }
                },
            ]
        },
        {
            id: "listlaporankasir",
            label: "Laporan",
            icon: "ri-survey-fill",
            link: "/#",
            click: function (e) {
                e.preventDefault();
                setLaporanKasir(!isLaporanKasir);
                setIscurrentState('isLaporanKasir');
                updateIconSidebar(e);
            },
            stateVariables: isLaporanKasir,
            isAllowed: () => {
                return isAllowedAccess(getUserPermissions(), [
                    "REGISTRASI_VIEW","KASIR_VIEW"
                ]);
            },
            subItems: [
                {
                    id: "laporanPendapatanKasir",
                    label: "Laporan Pendapatan Kasir",
                    link: "/payment/laporan-pendapatan",
                    parentId: "listlaporankasir",
                    isAllowed: () => {
                        return isAllowedAccess(getUserPermissions(), [
                            "REGISTRASI_VIEW",
                        ]);
                    }
                },
            ]
        },
        // end
        {
            id: "casemix",
            label: "Casemix",
            icon: "ri-secure-payment-line",
            link: "/#",
            click: function (e) {
                e.preventDefault();
                setCasemix(!isCasemix);
                setIscurrentState('isCasemix');
                updateIconSidebar(e);
            },
            stateVariables: isCasemix,
            isAllowed: () => {
                return isAllowedAccess(getUserPermissions(), [
                    "REGISTRASI_VIEW","REKAMMEDIS_VIEW"
                ]);
            },
            subItems: [
                {
                    id: "casemix-klaiminacbg",
                    label: "Klaim Inacbg",
                    link: "/casemix/klaiminacbg",
                    parentId: "casemix",
                    isAllowed: () => {
                        return isAllowedAccess(getUserPermissions(), [
                            "REGISTRASI_VIEW",
                        ]);
                    }
                },
            ]
        },
        // loket.rj
        {
            id: "loket_rj",
            label: "List Daftar Pasien",
            icon: "lab la-delicious",
            link: "/#",
            click: function (e) {
                e.preventDefault();
                setListDaftarPasien(!isListDaftarPasien);
                setIscurrentState('ListDaftarPasien');
                updateIconSidebar(e);
            },
            stateVariables: isListDaftarPasien,
            isAllowed: () => {
                return isAllowedAccess(getUserPermissions(), [
                    "RAWAT_JALAN_VIEW"
                ]);
            },
            subItems: [
                {
                    id: "registrasi-pasien-lama",
                    label: "Daftar Pasien Rawat Jalan",
                    link: "/listdaftarpasien/daftar-pasien-rj",
                    parentId: "listdaftarpasien",
                    // isAllowed: () => {
                    //     return isAllowedAccess(getUserPermissions(), [
                    //         "REGISTRASI_VIEW",
                    //     ]);
                    // }
                },
            ],
        },
        // loket.ri
        {
            id: "loket_ri",
            label: "List Daftar Pasien",
            icon: "lab la-delicious",
            link: "/#",
            click: function (e) {
                e.preventDefault();
                setListDaftarPasien(!isListDaftarPasien);
                setIscurrentState('ListDaftarPasien');
                updateIconSidebar(e);
            },
            stateVariables: isListDaftarPasien,
            isAllowed: () => {
                return isAllowedAccess(getUserPermissions(), [
                    "RAWAT_INAP_VIEW"
                ]);
            },
            subItems: [
                {
                    id: "registrasi-pasien-lama",
                    label: "Daftar Pasien Rawat Inap",
                    link: "/listdaftarpasien/daftar-pasien-ri",
                    parentId: "listdaftarpasien",
                },
            ],
        },
        // loket.igd
        {
            id: "loket_igd",
            label: "Gawat Darurat",
            icon: "ri-police-car-fill",
            link: "/#",
            click: function (e) {
                e.preventDefault();
                setListGawatDarurat(!isListGawatDarurat);
                setIscurrentState('ListGawatDarurat');
                updateIconSidebar(e);
            },
            stateVariables: isListGawatDarurat,
            isAllowed: () => {
                return isAllowedAccess(getUserPermissions(), [
                    "REGISTRASI_VIEW","GAWATDARURAT_VIEW"
                ]);
            },
            subItems: [
                {
                    id: "registrasi-pasien-lama",
                    label: "Daftar Pasien Triage",
                    link: "/gawatdarurat/daftar-pasien-triage",
                    parentId: "ListGawatDarurat",
                },
                {
                    id: "registrasi-pasien-lama",
                    label: "Daftar Pasien Gawat Darurat",
                    link: "/gawatdarurat/daftar-pasien-igd",
                    parentId: "ListGawatDarurat",
                },
            ],
        },
        // Bedah Sentral
        {
            id: "loket_bedah",
            label: "Bedah Sentral",
            icon: "ri-service-fill",
            link: "/#",
            click: function (e) {
                e.preventDefault();
                setListBedahSentral(!isListBedahSentral);
                setIscurrentState('ListBedahSentral');
                updateIconSidebar(e);
            },
            stateVariables: isListBedahSentral,
            isAllowed: () => {
                return isAllowedAccess(getUserPermissions(), [
                    "REGISTRASI_VIEW","BEDAHSENTRAL_VIEW"
                ]);
            },
            subItems: [
                {
                    id: "registrasi-pasien-lama",
                    label: "Daftar Order Operasi",
                    link: "/bedahsentral/daftar-order-operasi",
                    parentId: "ListBedahSentral",
                },
                {
                    id: "registrasi-pasien-lama",
                    label: "Daftar Pasien Operasi",
                    link: "/bedahsentral/daftar-pasien-operasi",
                    parentId: "ListBedahSentral",
                },
            ],
        },
        {
            id: "admin-konten",
            label: "Konten",
            icon: "bx bx-been-here",
            link: "/#",
            click: function (e) {
                e.preventDefault();
                setIsListAdminKonten(!isListAdminKonten);
                setIscurrentState('AdminKonten');
                updateIconSidebar(e);
            },
            stateVariables: isListAdminKonten,
            isAllowed: () => {
                return isAllowedAccess(getUserPermissions(), [
                    "REGISTRASI_VIEW",
                ]);
            },
            subItems: [
                {
                    id: "berita",
                    label: "Berita",
                    link: "/admin-konten/list-berita",
                    parentId: "registrasi",
                    isAllowed: () => {
                        return isAllowedAccess(getUserPermissions(), [
                            "REGISTRASI_VIEW", "REGISTRASI_CREATE"
                        ]);
                    }
                },

            ],
        },
        // SDM
        {
            id: "loket_sdm",
            label: "Bedah Sentral",
            icon: "ri-service-fill",
            link: "/#",
            click: function (e) {
                e.preventDefault();
                setSumberDayaManusia(!isSumberDayaManusia);
                setIscurrentState('SumberDayaManusia');
                updateIconSidebar(e);
            },
            stateVariables: isSumberDayaManusia,
            isAllowed: () => {
                return isAllowedAccess(getUserPermissions(), [
                    "REGISTRASI_VIEW","SDM_VIEW"
                ]);
            },
            subItems: [
                {
                    id: "registrasi-pasien-lama",
                    label: "Daftar Pegawai",
                    link: "/sumberdayamanusia/daftar-pegawai",
                    parentId: "SumberDayaManusia",
                },
            ],
        },
    ];
    return <React.Fragment>{menuItems}</React.Fragment>;
};
export default Navdata;