import React from "react";
import { Navigate } from "react-router-dom";

//Dashboard
import DashboardAnalytics from "../pages/DashboardAnalytics";
import DashboardCrm from "../pages/DashboardCrm";
import DashboardEcommerce from "../pages/DashboardEcommerce";
import DashboardJobs from '../pages/DashboardJob'

import DashboardCrypto from "../pages/DashboardCrypto";
import DashboardProject from "../pages/DashboardProject";
import DashboardNFT from "../pages/DashboardNFT";

//Calendar
// Email box
import MailInbox from "../pages/EmailInbox";
import BasicAction from "../pages/Email/EmailTemplates/BasicAction";
import EcommerceAction from "../pages/Email/EmailTemplates/EcommerceAction";

//Chat
import Chat from "../pages/Chat";
import Calendar from "../pages/Calendar";

// Project
import ProjectList from "../pages/Projects/ProjectList";
import ProjectOverview from "../pages/Projects/ProjectOverview";
import CreateProject from "../pages/Projects/CreateProject";

//Task
import TaskDetails from "../pages/Tasks/TaskDetails";
import TaskList from "../pages/Tasks/TaskList";

//Transactions
import Transactions from '../pages/Crypto/Transactions';
import BuySell from '../pages/Crypto/BuySell';
import CryproOrder from '../pages/Crypto/CryptoOrder';
import MyWallet from '../pages/Crypto/MyWallet';
import ICOList from '../pages/Crypto/ICOList';
import KYCVerification from '../pages/Crypto/KYCVerification';

//Crm Pages
import CrmCompanies from "../pages/Crm/CrmCompanies";
import CrmContacts from "../pages/Crm/CrmContacts";
import CrmDeals from "../pages/Crm/CrmDeals/index";
import CrmLeads from "../pages/Crm/CrmLeads/index";

//Invoices
import InvoiceList from "../pages/Invoices/InvoiceList";
import InvoiceCreate from "../pages/Invoices/InvoiceCreate";
import InvoiceDetails from "../pages/Invoices/InvoiceDetails";

// Support Tickets
import ListView from '../pages/SupportTickets/ListView';
import TicketsDetails from '../pages/SupportTickets/TicketsDetails';

// //Ecommerce Pages
import EcommerceProducts from "../pages/Ecommerce/EcommerceProducts/index";
import EcommerceProductDetail from "../pages/Ecommerce/EcommerceProducts/EcommerceProductDetail";
import EcommerceAddProduct from "../pages/Ecommerce/EcommerceProducts/EcommerceAddProduct";
import EcommerceOrders from "../pages/Ecommerce/EcommerceOrders/index";
import EcommerceOrderDetail from "../pages/Ecommerce/EcommerceOrders/EcommerceOrderDetail";
import EcommerceCustomers from "../pages/Ecommerce/EcommerceCustomers/index";
import EcommerceCart from "../pages/Ecommerce/EcommerceCart";
import EcommerceCheckout from "../pages/Ecommerce/EcommerceCheckout";
import EcommerceSellers from "../pages/Ecommerce/EcommerceSellers/index";
import EcommerceSellerDetail from "../pages/Ecommerce/EcommerceSellers/EcommerceSellerDetail";

// NFT Marketplace Pages
import Marketplace from "../pages/NFTMarketplace/Marketplace";
import Collections from "../pages/NFTMarketplace/Collections";
import CreateNFT from "../pages/NFTMarketplace/CreateNFT";
import Creators from "../pages/NFTMarketplace/Creators";
import ExploreNow from "../pages/NFTMarketplace/ExploreNow";
import ItemDetails from "../pages/NFTMarketplace/Itemdetails";
import LiveAuction from "../pages/NFTMarketplace/LiveAuction";
import Ranking from "../pages/NFTMarketplace/Ranking";
import WalletConnect from "../pages/NFTMarketplace/WalletConnect";

// Base Ui
import UiAlerts from "../pages/BaseUi/UiAlerts/UiAlerts";
import UiBadges from "../pages/BaseUi/UiBadges/UiBadges";
import UiButtons from "../pages/BaseUi/UiButtons/UiButtons";
import UiColors from "../pages/BaseUi/UiColors/UiColors";
import UiCards from "../pages/BaseUi/UiCards/UiCards";
import UiCarousel from "../pages/BaseUi/UiCarousel/UiCarousel";
import UiDropdowns from "../pages/BaseUi/UiDropdowns/UiDropdowns";
import UiGrid from "../pages/BaseUi/UiGrid/UiGrid";
import UiImages from "../pages/BaseUi/UiImages/UiImages";
import UiTabs from "../pages/BaseUi/UiTabs/UiTabs";
import UiAccordions from "../pages/BaseUi/UiAccordion&Collapse/UiAccordion&Collapse";
import UiModals from "../pages/BaseUi/UiModals/UiModals";
import UiOffcanvas from "../pages/BaseUi/UiOffcanvas/UiOffcanvas";
import UiPlaceholders from "../pages/BaseUi/UiPlaceholders/UiPlaceholders";
import UiProgress from "../pages/BaseUi/UiProgress/UiProgress";
import UiNotifications from "../pages/BaseUi/UiNotifications/UiNotifications";
import UiMediaobject from "../pages/BaseUi/UiMediaobject/UiMediaobject";
import UiEmbedVideo from "../pages/BaseUi/UiEmbedVideo/UiEmbedVideo";
import UiTypography from "../pages/BaseUi/UiTypography/UiTypography";
import UiList from "../pages/BaseUi/UiLists/UiLists";
import UiGeneral from "../pages/BaseUi/UiGeneral/UiGeneral";
import UiRibbons from "../pages/BaseUi/UiRibbons/UiRibbons";
import UiUtilities from "../pages/BaseUi/UiUtilities/UiUtilities";

// Advance Ui
import UiNestableList from "../pages/AdvanceUi/UiNestableList/UiNestableList";
import UiScrollbar from "../pages/AdvanceUi/UiScrollbar/UiScrollbar";
import UiAnimation from "../pages/AdvanceUi/UiAnimation/UiAnimation";
import UiTour from "../pages/AdvanceUi/UiTour/UiTour";
import UiSwiperSlider from "../pages/AdvanceUi/UiSwiperSlider/UiSwiperSlider";
import UiRatings from "../pages/AdvanceUi/UiRatings/UiRatings";
import UiHighlight from "../pages/AdvanceUi/UiHighlight/UiHighlight";

// Widgets
import Widgets from '../pages/Widgets/Index';

//Forms
import BasicElements from "../pages/Forms/BasicElements/BasicElements";
import FormSelect from "../pages/Forms/FormSelect/FormSelect";
import FormEditor from "../pages/Forms/FormEditor/FormEditor";
import CheckBoxAndRadio from "../pages/Forms/CheckboxAndRadio/CheckBoxAndRadio";
import Masks from "../pages/Forms/Masks/Masks";
import FileUpload from "../pages/Forms/FileUpload/FileUpload";
import FormPickers from "../pages/Forms/FormPickers/FormPickers";
import FormRangeSlider from "../pages/Forms/FormRangeSlider/FormRangeSlider";
import Formlayouts from "../pages/Forms/FormLayouts/Formlayouts";
import FormValidation from "../pages/Forms/FormValidation/FormValidation";
import FormWizard from "../pages/Forms/FormWizard/FormWizard";
import FormAdvanced from "../pages/Forms/FormAdvanced/FormAdvanced";
import Select2 from "../pages/Forms/Select2/Select2";

//Tables
import BasicTables from '../pages/Tables/BasicTables/BasicTables';
import GridTables from '../pages/Tables/GridTables/GridTables';
import ListTables from '../pages/Tables/ListTables/ListTables';
import DataTables from "../pages/Tables/DataTables/DataTables";

//Icon pages
import RemixIcons from "../pages/Icons/RemixIcons/RemixIcons";
import BoxIcons from "../pages/Icons/BoxIcons/BoxIcons";
import MaterialDesign from "../pages/Icons/MaterialDesign/MaterialDesign";
import FeatherIcons from "../pages/Icons/FeatherIcons/FeatherIcons";
import LineAwesomeIcons from "../pages/Icons/LineAwesomeIcons/LineAwesomeIcons";
import CryptoIcons from "../pages/Icons/CryptoIcons/CryptoIcons";

//Maps
import GoogleMaps from "../pages/Maps/GoogleMaps/GoogleMaps";
import VectorMaps from "../pages/Maps/VectorMaps/VectorMaps";
import LeafletMaps from "../pages/Maps/LeafletMaps/LeafletMaps";

//AuthenticationInner pages
import BasicSignIn from '../pages/AuthenticationInner/Login/BasicSignIn';
import CoverSignIn from '../pages/AuthenticationInner/Login/CoverSignIn';
import BasicSignUp from '../pages/AuthenticationInner/Register/BasicSignUp';
import CoverSignUp from "../pages/AuthenticationInner/Register/CoverSignUp";
import BasicPasswReset from '../pages/AuthenticationInner/PasswordReset/BasicPasswReset';

//pages
import Starter from '../pages/Pages/Starter/Starter';
import SimplePage from '../pages/Pages/Profile/SimplePage/SimplePage';
import Settings from '../pages/Pages/Profile/Settings/Settings';
import Team from '../pages/Pages/Team/Team';
import Timeline from '../pages/Pages/Timeline/Timeline';
import Faqs from '../pages/Pages/Faqs/Faqs';
import Pricing from '../pages/Pages/Pricing/Pricing';
import Gallery from '../pages/Pages/Gallery/Gallery';
import Maintenance from '../pages/Pages/Maintenance/Maintenance';
import ComingSoon from '../pages/Pages/ComingSoon/ComingSoon';
import SiteMap from '../pages/Pages/SiteMap/SiteMap';
import SearchResults from '../pages/Pages/SearchResults/SearchResults';
import PrivecyPolicy from '../pages/Pages/PrivacyPolicy.js'
import TermsCondition from '../pages/Pages/TermsCondition'

import CoverPasswReset from '../pages/AuthenticationInner/PasswordReset/CoverPasswReset';
import BasicLockScreen from '../pages/AuthenticationInner/LockScreen/BasicLockScr';
import CoverLockScreen from '../pages/AuthenticationInner/LockScreen/CoverLockScr';
import BasicLogout from '../pages/AuthenticationInner/Logout/BasicLogout';
import CoverLogout from '../pages/AuthenticationInner/Logout/CoverLogout';
import BasicSuccessMsg from '../pages/AuthenticationInner/SuccessMessage/BasicSuccessMsg';
import CoverSuccessMsg from '../pages/AuthenticationInner/SuccessMessage/CoverSuccessMsg';
import BasicTwosVerify from '../pages/AuthenticationInner/TwoStepVerification/BasicTwosVerify';
import CoverTwosVerify from '../pages/AuthenticationInner/TwoStepVerification/CoverTwosVerify';
import Basic404 from '../pages/AuthenticationInner/Errors/Basic404';
import Cover404 from '../pages/AuthenticationInner/Errors/Cover404';
import Alt404 from '../pages/AuthenticationInner/Errors/Alt404';
import Error500 from '../pages/AuthenticationInner/Errors/Error500';

import BasicPasswCreate from "../pages/AuthenticationInner/PasswordCreate/BasicPasswCreate";
import CoverPasswCreate from "../pages/AuthenticationInner/PasswordCreate/CoverPasswCreate";
import Offlinepage from "../pages/AuthenticationInner/Errors/Offlinepage";

//login
import Login from "../pages/Authentication/Login";
import ForgetPasswordPage from "../pages/Authentication/ForgetPassword";
import Logout from "../pages/Authentication/Logout";
import Register from "../pages/Authentication/Register";
import LoginBased from "../pages/Authentication/LoginBased";

//Charts
import LineCharts from "../pages/Charts/ApexCharts/LineCharts";
import AreaCharts from "../pages/Charts/ApexCharts/AreaCharts";
import ColumnCharts from "../pages/Charts/ApexCharts/ColumnCharts";
import BarCharts from "../pages/Charts/ApexCharts/BarCharts";
import MixedCharts from "../pages/Charts/ApexCharts/MixedCharts";
import TimelineCharts from "../pages/Charts/ApexCharts/TimelineCharts";
import CandlestickChart from "../pages/Charts/ApexCharts/CandlestickChart";
import BoxplotCharts from "../pages/Charts/ApexCharts/BoxplotCharts";
import BubbleChart from "../pages/Charts/ApexCharts/BubbleChart";
import ScatterCharts from "../pages/Charts/ApexCharts/ScatterCharts";
import HeatmapCharts from "../pages/Charts/ApexCharts/HeatmapCharts";
import TreemapCharts from "../pages/Charts/ApexCharts/TreemapCharts";
import PieCharts from "../pages/Charts/ApexCharts/PieCharts";
import RadialbarCharts from "../pages/Charts/ApexCharts/RadialbarCharts";
import RadarCharts from "../pages/Charts/ApexCharts/RadarCharts";
import PolarCharts from "../pages/Charts/ApexCharts/PolarCharts";

import ChartsJs from "../pages/Charts/ChartsJs/index";
import Echarts from "../pages/Charts/ECharts/index";

//Job pages
import Statistics from "../pages/Jobs/Statistics";
import JobList from "../pages/Jobs/JobList/List";
import JobGrid from "../pages/Jobs/JobList/Grid";
import JobOverview from "../pages/Jobs/JobList/Overview";
import CandidateList from "../pages/Jobs/CandidateList/ListView";
import CandidateGrid from "../pages/Jobs/CandidateList/GridView";
import NewJobs from "../pages/Jobs/NewJob";
import JobCategories from "../pages/Jobs/JobCategories";
import Application from "../pages/Jobs/Application";
import CompaniesList from "../pages/Jobs/CompaniesList";

import ApiKey from '../pages/APIKey/index'

// Landing Index
import OnePage from "../pages/Landing/OnePage";
import NFTLanding from "../pages/Landing/NFTLanding";
import JobLanding from '../pages/Landing/Job'

// User Profile
import UserProfile from "../pages/Authentication/user-profile";

import FileManager from "../pages/FileManager";
import ToDoList from "../pages/ToDo";
// Pasien
import PasienLama from "../app/Registrasi/PasienLama";
import RegistrasiForm from "../pages/Registrasi/RegistrasiForm/RegistrasiForm";
import RegistrasiList from "../pages/Registrasi/RegistrasiList/RegistrasiList";
import PasienBaruForm from "../pages/Registrasi/PasienBaru/PasienBaruForm";
import RegistrasiPasien from "../pages/Registrasi/RegistrasiPasien/RegistrasiPasien";
import BuktiPendaftaran3 from "../pages/Print/BuktiPendaftaran3";
import DaftarPasienRJ from "../pages/ListDaftarPasien/DaftarPasienRJ/DaftarPasienRJ";
import Emr from "../pages/Emr";
import DaftarPasienRI from "../pages/ListDaftarPasien/DaftarPasienRI/DaftarPasienRI";
import RegistrasiPenjaminFK from "../pages/Registrasi/RegistrasiPenjaminFK/RegistrasiPenjaminFK";
import DaftarPasienRegistrasi from "../pages/ListDaftarPasien/DaftarPasienRegistrasi/DaftarPasienRegistrasi";
import DaftarPasienMutasi from "../pages/ListDaftarPasien/DaftarPasienMutasi/DaftarPasienMutasi";
import RegistrasiMutasiPasien from "../pages/Registrasi/RegistrasiMutasiPasien/RegistrasiMutasiPasien";
import DaftarPasienIGD from "../pages/ListDaftarPasien/DaftarPasienIGD/DaftarPasienIGD";
import PasienBaruBayi from "../pages/Registrasi/PasienBaruBayi/PasienBaruBayi";

// rekammedis
import KendaliDokumen from "../pages/RekamMedis/KendaliDokumen/KendaliDokumen";
import LaporanPasienDaftar from "../pages/RekamMedis/Laporan/LaporanPasienDaftar/LaporanPasienDaftar";
import LaporanPasienBatal from "../pages/RekamMedis/Laporan/LaporanPasienBatal/LaporanPasienBatal";
import LaporanPasienKunjungan from "../pages/RekamMedis/Laporan/LaporanPasienKunjungan/LaporanPasienKunjungan";

// RL
import RL1_2 from "../pages/RekamMedis/Laporan/RL1_2/RL1_2";
import RL1_3 from "../pages/RekamMedis/Laporan/RL1_3/RL1_3";
import RL2 from "../pages/RekamMedis/Laporan/RL2/RL2";
import RL3_1 from "../pages/RekamMedis/Laporan/RL3_1/RL3_1";
import RL3_2 from "../pages/RekamMedis/Laporan/RL3_2/RL3_2";
import RL3_3 from "../pages/RekamMedis/Laporan/RL3_3/RL3_3";
import RL3_4 from "../pages/RekamMedis/Laporan/RL3_4/RL3_4";
import RL3_5 from "../pages/RekamMedis/Laporan/RL3_5/RL3_5";
import RL3_6 from "../pages/RekamMedis/Laporan/RL3_6/RL3_6";
import RL3_7 from "../pages/RekamMedis/Laporan/RL3_7/RL3_7";
import RL3_8 from "../pages/RekamMedis/Laporan/RL3_8/RL3_8";
import RL3_9 from "../pages/RekamMedis/Laporan/RL3_9/RL3_9";
import RL4_A from "../pages/RekamMedis/Laporan/RL4_A/RL4_A.jsx";
import RL4_B from "../pages/RekamMedis/Laporan/RL4_B/RL4_B.jsx";
import RL3_14 from "../pages/RekamMedis/Laporan/RL3_14/RL3_14";
import RL3_15 from "../pages/RekamMedis/Laporan/RL3_15/RL3_15";
import RL3_11 from "../pages/RekamMedis/Laporan/RL3_11/RL3_11";
import RL3_10 from "../pages/RekamMedis/Laporan/RL3_10/RL3_10";

import RL5_1 from "../pages/RekamMedis/Laporan/RL5_1/RL5_1";
import RL5_2 from "../pages/RekamMedis/Laporan/RL5_2/RL5_2";
import RL5_3 from "../pages/RekamMedis/Laporan/RL5_3/RL5_3";
import RL5_4 from "../pages/RekamMedis/Laporan/RL5_4/RL5_4";
// 
// radiologi
import DaftarOrderRadiologi from "../pages/Radiologi/DaftarOrderRadiologi/DaftarOrderRadiologi";
import DaftarPasienRadiologi from "../pages/Radiologi/DaftarPasienRadiologi/DaftarPasienRadiologi";
import TransaksiPelayanRadiologi from "../pages/Radiologi/TransaksiPelayanRadiologi/TransaksiPelayanRadiologi";
import DaftarPasienPulang from "../pages/DaftarPasienPulang/DaftarPasienPulang";

// Laboratorium
import DaftarOrderLaboratorium from "../pages/Laboratorium/DaftarOrderLaboratorium/DaftarOrderLaboratorium";
import DaftarPasienLaboratorium from "../pages/Laboratorium/DaftarPasienLaboratorium/DaftarPasienLaboratorium";
import TransaksiPelayanLaboratorium from "../pages/Laboratorium/TransaksiPelayanLaboratorium/TransaksiPelayanLaboratorium";
import MasterDataLayananLaboratorium from "../pages/Laboratorium/MasterDataLayanan/MasterDataLayananLaboratorium.js";
import MasterNilaiNormal from "../pages/Laboratorium/MasterNilaiNormal/MasterNilaiNormal";
import SettingLayananLab from "../pages/Laboratorium/SettingLayananLab";
import Satuan from "../pages/Laboratorium/SettingLayananLab/Satuan";
import SetNilaiNormal from "../pages/Laboratorium/SetNilaiNormal/SetNilaiNormal";
// casemix
import KlaimInacbg from "../pages/Casemix/KlaimInacbg/KlaimInacbg";
import DaftarPiutangPasien from "../pages/DaftarPiutangPasien/DaftarPiutangPasien";
import BayarPiutang from "../pages/BayarPiutang/BayarPiutang";

// payment
import VerifikasiPelayanan from "../pages/VerifikasiPelayanan/VerifikasiPelayanan";
import DaftarTagihanPasien from "../pages/DaftarTagihanPasien/DaftarTagihanPasien";
import Bayar from "../pages/Bayar/Bayar";

// laporan Kasir
import LaporanPendapatan from "../pages/Kasir/Laporan/LaporanPendapatan/LaporanPendapatan";
import LaporanRemunerasi from "../pages/Remunerasi/LaporanRemunerasi/LaporanRemunerasi";
import VerifikasiRemunerasi from "../pages/Remunerasi/VerifikasiRemunerasi/VerifikasiRemunerasi";

import SettingProduk from "../pages/Produk/SettingProduk";
import ListProduk from "../pages/Produk/ListProduk";
import PenerimaanProduk from "../pages/PenerimaanProduk/PenerimaanProduk";
import PenerimaanProdukList from "../pages/PenerimaanProduk/PenerimaanProdukList";
import KartuStok from "../pages/KartuStok/KartuStok";
import DistribusiOrder from "../pages/Distribusi/DistribusiOrder";
import DistribusiOrderList from "../pages/Distribusi/DistribusiList";
import DistribusiKirim from "../pages/Distribusi/DistribusiKirim";
import StokUnitList from "../pages/StokUnit/StokUnit";
import StokOpname from "../pages/StokOpname/StokOpname";
import OrderResep from "../pages/Emr/Penunjang/OrderResep/OrderResep";
import VerifikasiResep from "../pages/VerifikasiResep/VerifikasiResep";
import AllOrderResepList from "../pages/AllOrderResepList/AllOrderResepList";
import PenjualanObatBebas from "../pages/PenjualanObatBebas/PenjualanObatBebas";
import ListVerifObat from "../pages/ListVerifObat/ListVerifObat";
import DaftarPasienFarmasi from "../pages/ListDaftarPasien/DaftarPasienFarmasi/DaftarPasienFarmasi";
import TambahObatFarmasi from "../pages/TambahObatFarmasi/TambahObatFarmasi";
import MappingLayanan from "../pages/RekamMedis/MappingLayanan/MappingLayanan.jsx";
import Dashboard from "../pages/Dashboard/Dashboard";
import Viewer from "../pages/Viewer/Viewer";
import PemanggilanViewer from "../pages/PemanggilanViewer/PemanggilanViewer";

// Gawat Darurat
import DaftarPasienTriage from "../pages/GawatDarurat/DaftarPasienTriage/DaftarPasienTriage";
import TriageIGD from "../pages/GawatDarurat/TriageIGD/TriageIGD";

// Bedah Sentral
import DaftarOrderOperasi from "../pages/BedahSentral/DaftarOrderOperasi/DaftarOrderOperasi";
import DaftarPasienOperasi from "../pages/BedahSentral/DaftarPasienOperasi/DaftarPasienOperasi";
import VerifikasiPasienOnline from "../pages/VerifikasiPasienOnline/VerifikasiPasienOnline";
import UploadBeritaPage from "../pages/UploadBeritaPage/UploadBeritaPage";
import ListBeritaPage from "../pages/ListBeritaPage/ListBeritaPage";
import ViewerPoli from "../pages/ViewerPoli/ViewerPoli";

// Sumber Daya Manusia
import DaftarPegawai from "../pages/SumberDayaManusia/DaftarPegawai/DaftarPegawai";
import BiodataPegawai from "../pages/SumberDayaManusia/BiodataPegawai/BiodataPegawai";
import AddObatFarmasi from "../pages/AddObatFarmasi/AddObatFarmasi";
import MasterJadwalDokter from "../pages/JadwalDokter/MasterJadwalDokter";
import ViewerOperasi from "../pages/ViewerOperasi/ViewerOperasi";

// sysadmin
import DaftarBed from "../pages/DaftarBed/DaftarBed";
import DaftarUnit from "../pages/DaftarUnit/DaftarUnit";
import DaftarKamar from "../pages/DaftarKamar/DaftarKamar";
import RoleAcces from "../pages/SysAdmin/RoleAcces/RoleAcces";
import ViewerBed from "../pages/ViewerBed/ViewerBed";
import PemesananBarang from "../pages/PemesananBarang/PemesananBarang";
import Logger from "../pages/Logger/Logger";
import DasborUtama from "../pages/DasborEIS/DasborUtama/DasborUtama.jsx";
import DasborPegawai from "../pages/DasborEIS/DasborPegawai/DasborPegawai.jsx";
import LiburPegawai from "../pages/LiburPegawai/LiburPegawai.jsx";
import DasborFarmasi from "../pages/DasborEIS/DasborFarmasi/DasborFarmasi.jsx";
import DasborPendapatan from "../pages/DasborEIS/DasborPendapatan/DasborPendapatan.jsx";
import MasterDataLayanan from "../pages/MasterDataLayanan/MasterDataLayanan.jsx";

import Index from "../pages/Emr/AsesmenBayiBaruLahir/index.jsx"
import MasterSettingLayanan from "../pages/MasterSettingLayanan/MasterSettingLayanan.jsx";
import MasterTarifTindakan from "../pages/MasterTarifTindakan/MasterTarifTindakan.jsx";
import MasterTarifTindakanTambah from "../pages/MasterTarifTindakanTambah/MasterTarifTindakanTambah.jsx";
import LaporanPengadaan from "../pages/LaporanPengadaan/LaporanPengadaan.jsx";
import LaporanPenerimaan from "../pages/LaporanPenerimaan/LaporanPenerimaan.jsx";
import DasborPeta from "../pages/DasborEIS/DasborPeta/DasborPeta.jsx";
import SetorKasir from "../pages/SetorKasir/SetorKasir.jsx";
import Organization from "../pages/SatuSehat/Organization/Organization.jsx";
import Location from "../pages/SatuSehat/Location/Location.jsx";
import Practitioner from "../pages/SatuSehat/Practitioner/Practitioner.jsx";
import PenjualanObatBebasList from "../pages/PenjualanObatBebas/PenjualanObatBebasList.jsx";
import RL3_13 from "../pages/RekamMedis/Laporan/RL3_13/RL3_13.jsx";
import PenerimaanReturProduk from "../pages/PemesananReturProduk/PenerimaanReturProduk.jsx";
import MasterHasilLab from "../pages/Laboratorium/MasterHasilLab/MasterHasilLab.jsx";
import Odontogram from "../pages/Odontogram/Odontogram.jsx";
import DaftarOrderBankDarah from "../pages/BankDarah/DaftarOrderBankDarah/DaftarOrderBankDarah.jsx";
import DaftarPasienBankDarah from "../pages/BankDarah/DaftarPasienBankDarah/DaftarPasienBankDarah.jsx";
import OrderMenuGizi from "../pages/Gizi/OrderMenuGizi/OrderMenuGizi.jsx";
import DaftarOrderMenuGizi from "../pages/Gizi/DaftarOrderMenuGizi/DaftarOrderMenuGizi.jsx";
import DaftarKirimMenuGizi from "../pages/Gizi/DaftarKirimMenuGizi/DaftarKirimMenuGizi.jsx";
import PenerimaanBankDarah from "../pages/BankDarah/PenerimaanBankDarah/PenerimaanBankDarah.jsx";
import PenerimaanProdukBankDarah from "../pages/BankDarah/PenerimaanProdukBankDarah/PenerimaanProdukBankDarah.jsx";
import PenerimaanReturProdukBankDarah from "../pages/BankDarah/PenerimaanReturProdukBankDarah/PenerimaanReturProdukBankDarah.jsx";
import PemesananBarangBankDarah from "../pages/BankDarah/PemesananBarangBankDarah/PemesananBarangBankDarah.jsx";
import TransaksiPelayananBankDarah from "../pages/BankDarah/TransaksiPelayananBankDarah/TransaksiPelayananBankDarah.jsx";
import DaftarOrderPatologi from "../pages/Patologi/DaftarOrderPatologi/DaftarOrderPatologi.jsx";
import DaftarPasienPatologi from "../pages/Patologi/DaftarPasienPatologi/DaftarPasienPatologi.jsx";
import TransaksiPelayananPatologi from "../pages/Patologi/TransaksiPelayanPatologi/TransaksiPelayanPatologi.jsx";
import ViewerAntreanObat from "../pages/ViewerAntreanObat/ViewerAntreanObat.jsx";


const authProtectedRoutes = [
  { path: "/dashboard-analytics", component: <DashboardAnalytics /> },
  { path: "/dashboard-crm", component: <DashboardCrm /> },
  { path: "/dashboard", component: <Dashboard /> },
  { path: "/index", component: <DashboardEcommerce /> },
  { path: "/dashboard-crypto", component: <DashboardCrypto /> },
  { path: "/dashboard-projects", component: <DashboardProject /> },
  { path: "/dashboard-nft", component: <DashboardNFT /> },
  { path: "/dashboard-job", component: <DashboardJobs /> },
  { path: "/apps-calendar", component: <Calendar /> },
  { path: "/apps-ecommerce-products", component: <EcommerceProducts /> },
  { path: "/apps-ecommerce-product-details", component: <EcommerceProductDetail /> },
  { path: "/apps-ecommerce-add-product", component: <EcommerceAddProduct /> },
  { path: "/apps-ecommerce-orders", component: <EcommerceOrders /> },
  { path: "/apps-ecommerce-order-details", component: <EcommerceOrderDetail /> },
  { path: "/apps-ecommerce-customers", component: <EcommerceCustomers /> },
  { path: "/apps-ecommerce-cart", component: <EcommerceCart /> },
  { path: "/apps-ecommerce-checkout", component: <EcommerceCheckout /> },
  { path: "/apps-ecommerce-sellers", component: <EcommerceSellers /> },
  { path: "/apps-ecommerce-seller-details", component: <EcommerceSellerDetail /> },

  { path: "/apps-file-manager", component: <FileManager /> },
  { path: "/apps-todo", component: <ToDoList /> },


  //Chat
  { path: "/apps-chat", component: <Chat /> },

  //EMail
  { path: "/apps-mailbox", component: <MailInbox /> },
  { path: "/apps-email-basic", component: <BasicAction /> },
  { path: "/apps-email-ecommerce", component: <EcommerceAction /> },

  //Projects
  { path: "/apps-projects-list", component: <ProjectList /> },
  { path: "/apps-projects-overview", component: <ProjectOverview /> },
  { path: "/apps-projects-create", component: <CreateProject /> },

  //Task
  { path: "/apps-tasks-list-view", component: <TaskList /> },
  { path: "/apps-tasks-details", component: <TaskDetails /> },

  //Crm
  { path: "/apps-crm-contacts", component: <CrmContacts /> },
  { path: "/apps-crm-companies", component: <CrmCompanies /> },
  { path: "/apps-crm-deals", component: <CrmDeals /> },
  { path: "/apps-crm-leads", component: <CrmLeads /> },

  //Invoices
  { path: "/apps-invoices-list", component: <InvoiceList /> },
  { path: "/apps-invoices-details", component: <InvoiceDetails /> },
  { path: "/apps-invoices-create", component: <InvoiceCreate /> },

  //Supports Tickets
  { path: "/apps-tickets-list", component: <ListView /> },
  { path: "/apps-tickets-details", component: <TicketsDetails /> },

  //transactions
  { path: "/apps-crypto-transactions", component: <Transactions /> },
  { path: "/apps-crypto-buy-sell", component: <BuySell /> },
  { path: "/apps-crypto-orders", component: <CryproOrder /> },
  { path: "/apps-crypto-wallet", component: <MyWallet /> },
  { path: "/apps-crypto-ico", component: <ICOList /> },
  { path: "/apps-crypto-kyc", component: <KYCVerification /> },

  // NFT Marketplace
  { path: "/apps-nft-marketplace", component: <Marketplace /> },
  { path: "/apps-nft-collections", component: <Collections /> },
  { path: "/apps-nft-create", component: <CreateNFT /> },
  { path: "/apps-nft-creators", component: <Creators /> },
  { path: "/apps-nft-explore", component: <ExploreNow /> },
  { path: "/apps-nft-item-details", component: <ItemDetails /> },
  { path: "/apps-nft-auction", component: <LiveAuction /> },
  { path: "/apps-nft-ranking", component: <Ranking /> },
  { path: "/apps-nft-wallet", component: <WalletConnect /> },

  //charts
  { path: "/charts-apex-line", component: <LineCharts /> },
  { path: "/charts-apex-area", component: <AreaCharts /> },
  { path: "/charts-apex-column", component: <ColumnCharts /> },
  { path: "/charts-apex-bar", component: <BarCharts /> },
  { path: "/charts-apex-mixed", component: <MixedCharts /> },
  { path: "/charts-apex-timeline", component: <TimelineCharts /> },
  { path: "/charts-apex-candlestick", component: <CandlestickChart /> },
  { path: "/charts-apex-boxplot", component: <BoxplotCharts /> },
  { path: "/charts-apex-bubble", component: <BubbleChart /> },
  { path: "/charts-apex-scatter", component: <ScatterCharts /> },
  { path: "/charts-apex-heatmap", component: <HeatmapCharts /> },
  { path: "/charts-apex-treemap", component: <TreemapCharts /> },
  { path: "/charts-apex-pie", component: <PieCharts /> },
  { path: "/charts-apex-radialbar", component: <RadialbarCharts /> },
  { path: "/charts-apex-radar", component: <RadarCharts /> },
  { path: "/charts-apex-polar", component: <PolarCharts /> },

  { path: "/charts-chartjs", component: <ChartsJs /> },
  { path: "/charts-echarts", component: <Echarts /> },


  // Base Ui
  { path: "/ui-alerts", component: <UiAlerts /> },
  { path: "/ui-badges", component: <UiBadges /> },
  { path: "/ui-buttons", component: <UiButtons /> },
  { path: "/ui-colors", component: <UiColors /> },
  { path: "/ui-cards", component: <UiCards /> },
  { path: "/ui-carousel", component: <UiCarousel /> },
  { path: "/ui-dropdowns", component: <UiDropdowns /> },
  { path: "/ui-grid", component: <UiGrid /> },
  { path: "/ui-images", component: <UiImages /> },
  { path: "/ui-tabs", component: <UiTabs /> },
  { path: "/ui-accordions", component: <UiAccordions /> },
  { path: "/ui-modals", component: <UiModals /> },
  { path: "/ui-offcanvas", component: <UiOffcanvas /> },
  { path: "/ui-placeholders", component: <UiPlaceholders /> },
  { path: "/ui-progress", component: <UiProgress /> },
  { path: "/ui-notifications", component: <UiNotifications /> },
  { path: "/ui-media", component: <UiMediaobject /> },
  { path: "/ui-embed-video", component: <UiEmbedVideo /> },
  { path: "/ui-typography", component: <UiTypography /> },
  { path: "/ui-lists", component: <UiList /> },
  { path: "/ui-general", component: <UiGeneral /> },
  { path: "/ui-ribbons", component: <UiRibbons /> },
  { path: "/ui-utilities", component: <UiUtilities /> },

  // Advance Ui
  { path: "/advance-ui-nestable", component: <UiNestableList /> },
  { path: "/advance-ui-scrollbar", component: <UiScrollbar /> },
  { path: "/advance-ui-animation", component: <UiAnimation /> },
  { path: "/advance-ui-tour", component: <UiTour /> },
  { path: "/advance-ui-swiper", component: <UiSwiperSlider /> },
  { path: "/advance-ui-ratings", component: <UiRatings /> },
  { path: "/advance-ui-highlight", component: <UiHighlight /> },

  // Widgets
  { path: "/widgets", component: <Widgets /> },

  // Forms
  { path: "/forms-elements", component: <BasicElements /> },
  { path: "/forms-select", component: <FormSelect /> },
  { path: "/forms-editors", component: <FormEditor /> },
  { path: "/forms-checkboxes-radios", component: <CheckBoxAndRadio /> },
  { path: "/forms-masks", component: <Masks /> },
  { path: "/forms-file-uploads", component: <FileUpload /> },
  { path: "/forms-pickers", component: <FormPickers /> },
  { path: "/forms-range-sliders", component: <FormRangeSlider /> },
  { path: "/forms-layouts", component: <Formlayouts /> },
  { path: "/forms-validation", component: <FormValidation /> },
  { path: "/forms-wizard", component: <FormWizard /> },
  { path: "/forms-advanced", component: <FormAdvanced /> },
  { path: "/forms-select2", component: <Select2 /> },

  //Tables
  { path: "/tables-basic", component: <BasicTables /> },
  { path: "/tables-gridjs", component: <GridTables /> },
  { path: "/tables-listjs", component: <ListTables /> },
  { path: "/tables-datatables", component: <DataTables /> },

  //Icons
  { path: "/icons-remix", component: <RemixIcons /> },
  { path: "/icons-boxicons", component: <BoxIcons /> },
  { path: "/icons-materialdesign", component: <MaterialDesign /> },
  { path: "/icons-feather", component: <FeatherIcons /> },
  { path: "/icons-lineawesome", component: <LineAwesomeIcons /> },
  { path: "/icons-crypto", component: <CryptoIcons /> },

  //Maps
  { path: "/maps-google", component: <GoogleMaps /> },
  { path: "/maps-vector", component: <VectorMaps /> },
  { path: "/maps-leaflet", component: <LeafletMaps /> },

  //Pages
  { path: "/pages-starter", component: <Starter /> },
  { path: "/pages-profile", component: <SimplePage /> },
  { path: "/pages-profile-settings", component: <Settings /> },
  { path: "/pages-team", component: <Team /> },
  { path: "/pages-timeline", component: <Timeline /> },
  { path: "/pages-faqs", component: <Faqs /> },
  { path: "/pages-gallery", component: <Gallery /> },
  { path: "/pages-pricing", component: <Pricing /> },
  { path: "/pages-sitemap", component: <SiteMap /> },
  { path: "/pages-search-results", component: <SearchResults /> },
  { path: "/pages-privecy-policy", component: <PrivecyPolicy /> },
  { path: "/pages-terms-condition", component: <TermsCondition /> },

  //User Profile
  { path: "/profile", component: <UserProfile /> },

  // this route should be at the end of all other routes
  // eslint-disable-next-line react/display-name
  {
    path: "/",
    exact: true,
    component: <Navigate to="/dashboard" />,
  },
  { path: "*", component: <Navigate to="/dashboard" /> },

  //Job pages
  { path: "/apps-job-statistics", component: <Statistics /> },
  { path: "/apps-job-lists", component: <JobList /> },
  { path: "/apps-job-grid-lists", component: <JobGrid /> },
  { path: "/apps-job-details", component: <JobOverview /> },
  { path: "/apps-job-candidate-lists", component: <CandidateList /> },
  { path: "/apps-job-candidate-grid", component: <CandidateGrid /> },
  { path: "/apps-job-application", component: <Application /> },
  { path: "/apps-job-new", component: <NewJobs /> },
  { path: "/apps-job-companies-lists", component: <CompaniesList /> },
  { path: "/apps-job-categories", component: <JobCategories /> },

  //APIkey
  { path: "/apps-api-key", component: <ApiKey /> },

  // Registrasi
  { path: "/Zm9ybXMtcGFzaWVuLWxhbWE=", component: <PasienLama /> },


  { path: "/registrasi/pasien/:id", component: <RegistrasiForm /> },
  { path: "/registrasi/pasien-lama", component: <RegistrasiList /> },
  { path: "/registrasi/pasien-baru", component: <PasienBaruForm /> },
  { path: "/registrasi/pasien-baru-triage/:norectriage", component: <PasienBaruForm /> },
  { path: "/registrasi/pasien-baru/:idpasien", component: <PasienBaruForm /> },
  { path: "/registrasi/pasien-baru-triage/:idpasien/:norectriage", component: <PasienBaruForm /> },
  { path: "/registrasi/pasien-ruangan/:id", component: <RegistrasiPasien /> },
  { path: "/registrasi/pasien-ruangan/:id/:norec", component: <RegistrasiPasien /> },
  { path: "/registrasi/pasien-ruangan-triage/:id/:norectriage", component: <RegistrasiPasien /> },
  { path: "/registrasi/input-penjamin/:id/:norec", component: <RegistrasiPenjaminFK /> },
  { path: "/bukti-pendaftaran/:noregistrasi", component: <BuktiPendaftaran3 /> },
  { path: "/listdaftarpasien/daftar-pasien-rj", component: <DaftarPasienRJ /> },
  { path: "/emr-pasien/:norecdp/:norecap", component: <Emr /> },
  { path: "/emr-pasien/:norecdp/:norecap/:tab", component: <Emr /> },
  { path: "/listdaftarpasien/daftar-pasien-ri", component: <DaftarPasienRI /> },
  { path: "/listdaftarpasien/daftar-pasien-pulang", component: <DaftarPasienPulang /> },
  { path: "/listdaftarpasien/daftarpasienregistrasi", component:<DaftarPasienRegistrasi/>},
  { path: "/listdaftarpasien/daftar-pasien-farmasi", component:<DaftarPasienFarmasi/>},
  { path: "/registrasi/pasien-baru-bayi", component: <PasienBaruBayi /> },
  //viewer
  { path: "/cmVnaXN0cmFzaS92aWV3ZXI=", component: <Viewer />, isLayout: false},
  { path: "/cmVnaXN0cmFzaS92aWV3ZXIvcGVtYW5nZ2lsYW4=", component: <PemanggilanViewer />, isLayout: false},
  { path: "/viewer/poli", component: <ViewerPoli />, isLayout: false},
  { path: "/viewer/operasi", component: <ViewerOperasi />, isLayout: false},
  { path: "/viewer/bed", component: <ViewerBed />, isLayout: false},
  { path: "/viewer/obat", component: <ViewerAntreanObat />, isLayout: false},


  { path: "/bGlzdGRhZnRhcnBhc2llbi9kYWZ0YXJwYXNpZW5tdXRhc2k=", component:<DaftarPasienMutasi/>},
  { path: "/registrasi/mutasi-pasien/:id/:norec", component: <RegistrasiMutasiPasien/> },
  { path: "/listdaftarpasien/daftar-pasien-igd", component: <DaftarPasienIGD /> },
  { path: "/bGlzdGRhZnRhcnBhc2llbi9kYWZ0YXItcGFzaWVuLWlnZA==", component: <VerifikasiPasienOnline />},
 
  { path: "/admin-konten/berita", component: <UploadBeritaPage />},
  { path: "/admin-konten/berita/:norecberita", component: <UploadBeritaPage />},
  { path: "/admin-konten/list-berita", component: <ListBeritaPage />},


  // rekam medis
  { path: "/rekammedis/kendalidokumen", component: <KendaliDokumen /> },
  { path: "/cmVrYW1tZWRpcy9sYXBvcmFuLXBhc2llbi1kYWZ0YXI=", component: <LaporanPasienDaftar/>},
  { path: "/cmVrYW1tZWRpcy9sYXBvcmFuLXBhc2llbi1iYXRhbA==", component: <LaporanPasienBatal/>},
  { path: "/cmVrYW1tZWRpcy9sYXBvcmFuLXBhc2llbi1rdW5qdW5nYW4=", component: <LaporanPasienKunjungan/>},
  { path: "/rekammedis/laporan-rl/rl1_2", component: <RL1_2 />},
  { path: "/rekammedis/laporan-rl/rl1_3", component: <RL1_3 />},
  { path: "/rekammedis/laporan-rl/rl2", component: <RL2 />},
  { path: "/cmVrYW1tZWRpcy9sYXBvcmFuLXJsL3JsMy4x", component: <RL3_1/>},
  { path: "/cmVrYW1tZWRpcy9sYXBvcmFuLXJsL3JsMy4y", component: <RL3_2/>},
  { path: "/cmVrYW1tZWRpcy9sYXBvcmFuLXJsL3JsMy4z", component: <RL3_3 />},
  { path: "/rekammedis/laporan-rl/rl3_4", component: <RL3_4 />},
  { path: "/rekammedis/laporan-rl/rl3_5", component: <RL3_5 />},
  { path: "/rekammedis/laporan-rl/rl3_6", component: <RL3_6/>},
  { path: "/rekammedis/laporan-rl/rl3_7", component: <RL3_7/>},
  { path: "/rekammedis/laporan-rl/rl3_8", component: <RL3_8/>},
  { path: "/rekammedis/laporan-rl/rl3_9", component: <RL3_9/>},
  { path: "/rekammedis/laporan-rl/rl4_A", component: <RL4_A/>},
  { path: "/rekammedis/laporan-rl/rl4_B", component: <RL4_B/>},
  { path: "/cmVrYW1tZWRpcy9tYXBwaW5nLXJs", component: <MappingLayanan />},
  { path: "/rekammedis/laporan-rl/rl3_14", component: <RL3_14/>},
  { path: "/rekammedis/laporan-rl/rl3_15", component: <RL3_15/>},
  { path: "/rekammedis/laporan-rl/rl3_13", component: <RL3_13/>},
  

  { path: "/rekammedis/laporan-rl/rl3_11", component: <RL3_11/>},
  { path: "/rekammedis/laporan-rl/rl3_10", component: <RL3_10/>},

  { path: "/rekammedis/laporan-rl/rl5_1", component: <RL5_1/>},
  { path: "/rekammedis/laporan-rl/rl5_2", component: <RL5_2/>},
  { path: "/rekammedis/laporan-rl/rl5_3", component: <RL5_3/>},
  { path: "/rekammedis/laporan-rl/rl5_4", component: <RL5_4/>},

  // radiologi
  { path: "/radiologi/daftarorderradiologi", component: <DaftarOrderRadiologi /> },
  { path: "/radiologi/daftarpasienradiologi", component: <DaftarPasienRadiologi /> },
  { path: "/transaksi-pelayanan-radiologi/:norecdp/:norecap", component: <TransaksiPelayanRadiologi /> },

  // patologi
  { path: "/patologi/daftarorderpatologi", component: <DaftarOrderPatologi /> },
  { path: "/patologi/daftarpasienpatologi", component: <DaftarPasienPatologi /> },
  { path: "/patologi/transaksi/:norecdp/:norecap", component: <TransaksiPelayananPatologi /> },

  // laboratorium
  { path: "/laboratorium/daftarorderlaboratorium", component: <DaftarOrderLaboratorium /> },
  { path: "/laboratorium/daftarpasienlaboratorium", component: <DaftarPasienLaboratorium /> },
  { path: "/dHJhbnNha3NpLXBlbGF5YW5hbi1sYWJvcmF0b3JpdW0=/:norecdp/:norecap", component: <TransaksiPelayanLaboratorium /> },
  { path: "/laboratorium/masterlayananlab", component: <MasterDataLayananLaboratorium/>},
  { path: "/laboratorium/masternilainormal/:idproduk/:layanan/:kodeexternal/:detailjenis", component:<MasterNilaiNormal/>},
  { path: "/laboratorium/seeting-layanan-lab", component:<SettingLayananLab/>},
  { path: "/laboratorium/setnilainormal/:idproduk/:layanan/:kodeexternal/:detailjenis", component:<SetNilaiNormal/>},
  { path: "/laboratorium/masterhasillab/:idproduk/:layanan/:kodeexternal/:detailjenis", component:<MasterHasilLab/>},
  // payment
  { path: "/payment/verif-tagihan/:norecdp", component: <VerifikasiPelayanan /> },
  { path: "/payment/daftar-tagihan", component: <DaftarTagihanPasien /> },
  { path: "/payment/bayar/:norecnota", component: <Bayar /> },
  { path: "/payment/bayar/:norecnota/:norecbayar", component: <Bayar /> },
  { path: "/payment/daftar-piutang/:location", component: <DaftarPiutangPasien />},
  { path: "/payment/bayar-piutang/:norecpiutang/:norecnota", component: <BayarPiutang /> },
  { path: "/payment/bayar-piutang/:norecpiutang/:norecnota/:norecbayar", component: <BayarPiutang /> },
  { path: "/payment/laporan-pendapatan", component: <LaporanPendapatan /> },
  { path: "/payment/laporan-remunerasi", component: <LaporanRemunerasi /> },
  { path: "/payment/verifikasi-remunerasi", component: <VerifikasiRemunerasi /> },
  { path: "/payment/setor-kasir", component: <SetorKasir />},

  // casemix
  { path: "/casemix/klaiminacbg", component: <KlaimInacbg /> },

  // gudang farmasi
  { path: "/farmasi/gudang/setting-produk/:tabopen/:paramobat", component: <SettingProduk /> },
  { path: "/farmasi/gudang/setting-produk/:tabopen", component: <SettingProduk /> },
  { path: "/farmasi/gudang/list-produk", component: <ListProduk /> },

  { path: "/farmasi/gudang/pemesanan-barang", component: <PemesananBarang />},
  { path: "/farmasi/gudang/penerimaan-produk", component: <PenerimaanProduk /> },
  { path: "/farmasi/gudang/penerimaan-produk-pemesanan/:norecpesan", component: <PenerimaanProduk /> },
  { path: "/farmasi/gudang/penerimaan-produk/:norecpenerimaan", component: <PenerimaanProduk /> },
  { path: "/farmasi/gudang/penerimaan-produk-retur/:norecpenerimaan", component: <PenerimaanReturProduk />},
  { path: "/farmasi/gudang/penerimaan-produk-retur/:norecpenerimaan/:norecretur", component: <PenerimaanReturProduk />},
  { path: "/farmasi/gudang/penerimaan-produk-list", component: <PenerimaanProdukList /> },
  { path: "/farmasi/gudang/kartu-stok", component: <KartuStok />},
  { path: "/farmasi/gudang/stok-unit", component: <StokUnitList />},
  { path: "/farmasi/gudang/stok-opname/:tabopen", component: <StokOpname />},
  { path: "/farmasi/gudang/stok-opname/:tabopen/:norecstokopname", component: <StokOpname />},
  { path: "/farmasi/gudang/pemesanan-barang/:norecpesan", component: <PemesananBarang />},
  { path: "/logistik/gudang/laporan-pengadaan", component: <LaporanPengadaan />},
  { path: "/logistik/gudang/laporan-penerimaan", component: <LaporanPenerimaan />},


  // gudang logistik
  { path: "/logistik/gudang/pemesanan-barang", component: <PemesananBarang isLogistik />},
  { path: "/logistik/gudang/penerimaan-produk", component: <PenerimaanProduk isLogistik /> },
  { path: "/logistik/gudang/penerimaan-produk-pemesanan/:norecpesan", component: <PenerimaanProduk isLogistik /> },
  { path: "/logistik/gudang/penerimaan-produk/:norecpenerimaan", component: <PenerimaanProduk isLogistik /> },
  { path: "/logistik/gudang/penerimaan-produk-retur/:norecpenerimaan", component: <PenerimaanReturProduk isLogistik />},
  { path: "/logistik/gudang/penerimaan-produk-retur/:norecpenerimaan/:norecretur", component: <PenerimaanReturProduk isLogistik />},
  { path: "/logistik/gudang/penerimaan-produk-list", component: <PenerimaanProdukList isLogistik /> },

  // distribusi logistik
  { path: "/logistik/gudang/distribusi-order", component: <DistribusiOrder isLogistik/> },
  { path: "/logistik/gudang/distribusi-order-edit", component: <DistribusiOrder isLogistik isEdit/> },
  { path: "/logistik/gudang/distribusi-order/:norecorder", component: <DistribusiOrder isLogistik/> },
  { path: "/logistik/gudang/distribusi-order-unit", component: <DistribusiOrder isUnit isLogistik/> },
  { path: "/logistik/gudang/distribusi-kirim/:norecorder", component: <DistribusiKirim isLogistik/> },
  { path: "/logistik/gudang/distribusi-kirim-edit/:noreckirim", component: <DistribusiKirim isLogistik isEdit/> },
  { path: "/logistik/gudang/distribusi-kirim-langsung", component: <DistribusiKirim isLogistik/> },
  { path: "/logistik/gudang/distribusi-kirim-langsung/:noreckirim", component: <DistribusiKirim isLogistik/> },
  { path: "/logistik/gudang/distribusi-kirim-verif/:noreckirim", component: <DistribusiKirim isVerif isLogistik/> },

  { path: "/logistik/gudang/distribusi-order-list", component: <DistribusiOrderList isLogistik /> },
  { path: "/logistik/gudang/unit-order-list", component: <DistribusiOrderList isUnit isLogistik/> },

  // distribusi 
  { path: "/farmasi/gudang/distribusi-order", component: <DistribusiOrder /> },
  { path: "/farmasi/gudang/distribusi-order-edit/:norecorder", component: <DistribusiOrder isEdit/> },
  { path: "/farmasi/gudang/distribusi-order/:norecorder", component: <DistribusiOrder/> },
  { path: "/farmasi/gudang/distribusi-order-unit", component: <DistribusiOrder isUnit /> },
  { path: "/farmasi/gudang/distribusi-kirim/:norecorder", component: <DistribusiKirim /> },
  { path: "/farmasi/gudang/distribusi-kirim-edit/:noreckirim", component: <DistribusiKirim isEdit/> },
  { path: "/farmasi/gudang/distribusi-kirim-langsung", component: <DistribusiKirim /> },
  { path: "/farmasi/gudang/distribusi-kirim-langsung/:noreckirim", component: <DistribusiKirim /> },
  { path: "/farmasi/gudang/distribusi-kirim-verif/:noreckirim", component: <DistribusiKirim isVerif /> },
  
  { path: "/farmasi/gudang/distribusi-order-list", component: <DistribusiOrderList /> },
  { path: "/farmasi/gudang/unit-order-list", component: <DistribusiOrderList isUnit/> },

  //farmasi
  { path: "/farmasi/verif-order-resep", component: <VerifikasiResep /> },
  { path: "/farmasi/verif-order-resep/:norecorder", component: <VerifikasiResep /> },
  { path: "/farmasi/order-list", component: <AllOrderResepList /> },
  { path: "/farmasi/penjualan-obat-bebas", component: <PenjualanObatBebas /> },
  { path: "/farmasi/penjualan-obat-bebas/:norecjualbebas", component: <PenjualanObatBebas /> },

  { path: "/farmasi/penjualan-obat-bebas-list", component: <PenjualanObatBebasList /> },

  { path: "/farmasi/list-verif-obat/:norecdp", component: <ListVerifObat />},
  { path: "/farmasi/tambah-obat-farmasi/:norecap", component: <TambahObatFarmasi />},
  { path: "/farmasi/tambah-obat-farmasi/:norecap/:norecresep", component: <TambahObatFarmasi />},
  { path: "/farmasi/add-obat-farmasi", component: <AddObatFarmasi />},

  // Gawat Darurat
  { path: "/gawatdarurat/daftar-pasien-igd", component: <DaftarPasienIGD /> },
  { path: "/gawatdarurat/daftar-pasien-triage", component: <DaftarPasienTriage /> },
  { path: "/gawatdarurat/input-pasien-triage", component: <TriageIGD /> },
  { path: "/gawatdarurat/input-pasien-triage-edit/:norec", component: <TriageIGD /> },

  // Bedah Sentral
  { path: "/bedahsentral/daftar-order-operasi", component: <DaftarOrderOperasi /> },
  { path: "/bedahsentral/daftar-pasien-operasi", component: <DaftarPasienOperasi /> },

  // Sumber Daya Manusia
  { path: "/sumberdayamanusia/daftar-pegawai", component: <DaftarPegawai /> },
  { path: "/sumberdayamanusia/biodata-pegawai", component: <BiodataPegawai /> },
  { path: "/sumberdayamanusia/jadwal-dokter", component: <MasterJadwalDokter />},
  { path: "/sumberdayamanusia/biodata-pegawai/:idPegawai", component: <BiodataPegawai /> },
  { path: "/sumberdayamanusia/libur-pegawai", component: <LiburPegawai /> },


  // sysadmin
  { path: "/sysadmin/daftar-bed", component: <DaftarBed />},
  { path: "/sysadmin/daftar-unit", component: <DaftarUnit />},
  { path: "/sysadmin/daftar-kamar", component: <DaftarKamar />},
  { path: "/sysadmin/role-acces", component: <RoleAcces />},
  { path: "/logger", component: <Logger />},
  { path: "/master/data-layanan", component: <MasterDataLayanan />},
  { path: "/master/tarif-tindakan", component: <MasterTarifTindakan />},
  { path: "/master/tarif-tindakan/tambah", component: <MasterTarifTindakanTambah />},
  { path: "/master/tarif-tindakan/tambah/:idtotal", component: <MasterTarifTindakanTambah />},
  { path: "/master/setting-layanan/:tabopen", component: <MasterSettingLayanan />},
  { path: "/master/setting-layanan/:tabopen/:id", component: <MasterSettingLayanan />},

  // satu sehat
  { path: "/satusehat/organization", component: <Organization />},
  { path: "/satusehat/location", component: <Location />},
  { path: "/satusehat/practitioner", component: <Practitioner />},


  //dashboard eis
  { path: "/eis/dasbor/dasbor-utama", component: <DasborUtama />},
  { path: "/eis/dasbor/dasbor-pegawai", component: <DasborPegawai />},
  { path: "/eis/dasbor/dasbor-farmasi", component: <DasborFarmasi />},
  { path: "/eis/dasbor/dasbor-pendapatan", component: <DasborPendapatan />},
  { path: "/eis/dasbor/dasbor-peta", component: <DasborPeta />},

  //gigi
  { path: "/gigi/odontogram", component: <Odontogram />},

  // bank darah
  { path: "/bankdarah/pemesanan-barang", component: <PemesananBarangBankDarah />},
  { path: "/bankdarah/daftarorderbankdarah", component: <DaftarOrderBankDarah /> },
  { path: "/bankdarah/daftarpasienbankdarah", component: <DaftarPasienBankDarah /> },
  { path: "/bankdarah/penerimaan-darah-list", component: <PenerimaanBankDarah /> },
  { path: "/bankdarah/penerimaan-produk", component: <PenerimaanProdukBankDarah /> },
  { path: "/bankdarah/penerimaan-produk/:norecpenerimaan", component: <PenerimaanProdukBankDarah /> },
  { path: "/bankdarah/penerimaan-produk-retur/:norecpenerimaan", component: <PenerimaanReturProdukBankDarah />},
  { path: "/bankdarah/penerimaan-produk-retur/:norecpenerimaan/:norecretur", component: <PenerimaanReturProdukBankDarah />},
  { path: "/bankdarah/pemesanan-barang/:norecpesan", component: <PemesananBarangBankDarah />},
  { path: "/bankdarah/penerimaan-produk-pemesanan/:norecpesan", component: <PenerimaanProdukBankDarah /> },
  { path: "/bankdarah/transaksi-pelayanan-bank-darah/:norecdp/:norecap", component: <TransaksiPelayananBankDarah /> },

  //gizi
  { path: "/gizi/ordermenugizi", component: <OrderMenuGizi /> },
  { path: "/gizi/daftarordermenugizi", component: <DaftarOrderMenuGizi /> },
  { path: "/gizi/daftarkirimmenuGizi", component: <DaftarKirimMenuGizi />},

];

const publicRoutes = [
  // Authentication Page
  { path: "/logout", component: <Logout /> },
  { path: "/login", component: <Login /> },
  { path: "/forgot-password", component: <ForgetPasswordPage /> },
  { path: "/register", component: <Register /> },
  { path: "/login-based", component: <LoginBased /> },

  //AuthenticationInner pages
  { path: "/auth-signin-basic", component: <BasicSignIn /> },
  { path: "/auth-signin-cover", component: <CoverSignIn /> },
  { path: "/auth-signup-basic", component: <BasicSignUp /> },
  { path: "/auth-signup-cover", component: <CoverSignUp /> },
  { path: "/auth-pass-reset-basic", component: <BasicPasswReset /> },
  { path: "/auth-pass-reset-cover", component: <CoverPasswReset /> },
  { path: "/auth-lockscreen-basic", component: <BasicLockScreen /> },
  { path: "/auth-lockscreen-cover", component: <CoverLockScreen /> },
  { path: "/auth-logout-basic", component: <BasicLogout /> },
  { path: "/auth-logout-cover", component: <CoverLogout /> },
  { path: "/auth-success-msg-basic", component: <BasicSuccessMsg /> },
  { path: "/auth-success-msg-cover", component: <CoverSuccessMsg /> },
  { path: "/auth-twostep-basic", component: <BasicTwosVerify /> },
  { path: "/auth-twostep-cover", component: <CoverTwosVerify /> },
  { path: "/auth-404-basic", component: <Basic404 /> },
  { path: "/auth-404-cover", component: <Cover404 /> },
  { path: "/auth-404-alt", component: <Alt404 /> },
  { path: "/auth-500", component: <Error500 /> },
  { path: "/pages-maintenance", component: <Maintenance /> },
  { path: "/pages-coming-soon", component: <ComingSoon /> },

  { path: "/landing", component: <OnePage /> },
  { path: "/nft-landing", component: <NFTLanding /> },
  { path: "/job-landing", component: <JobLanding /> },

  { path: "/auth-pass-change-basic", component: <BasicPasswCreate /> },
  { path: "/auth-pass-change-cover", component: <CoverPasswCreate /> },
  { path: "/auth-offline", component: <Offlinepage /> },
];

export { authProtectedRoutes, publicRoutes };