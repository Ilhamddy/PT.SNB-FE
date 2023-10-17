import { combineReducers } from "redux";

// Front
import Layout from "./layouts/reducer";

// Authentication
import Login from "./auth/login/reducer";
import Account from "./auth/register/reducer";
import ForgetPassword from "./auth/forgetpwd/reducer";
import Profile from "./auth/profile/reducer";

//Calendar
import Calendar from "./calendar/reducer";
//Chat
import chat from "./chat/reducer";
//Ecommerce
import Ecommerce from "./ecommerce/reducer";

//Project
import Projects from "./projects/reducer";

// Tasks
import Tasks from "./tasks/reducer";
//Form advanced
import changeNumber from "./formAdvanced/reducer";

//Crypto
import Crypto from "./crypto/reducer";

//TicketsList
import Tickets from "./tickets/reducer";
//Crm
import Crm from "./crm/reducer";

//Invoice
import Invoice from "./invoice/reducer";

//Mailbox
import Mailbox from "./mailbox/reducer";

// Dashboard Analytics
import DashboardAnalytics from "./dashboardAnalytics/reducer";

// Dashboard CRM
import DashboardCRM from "./dashboardCRM/reducer";

// Dashboard Ecommerce
import DashboardEcommerce from "./dashboardEcommerce/reducer";

// Dashboard Cryto
import DashboardCrypto from "./dashboardCrypto/reducer";

// Dashboard Cryto
import DashboardProject from "./dashboardProject/reducer";

// Dashboard NFT
import DashboardNFT from "./dashboardNFT/reducer";

// Pages > Team
import Team from "./team/reducer";

// File Manager
import FileManager from "./fileManager/reducer"

// To do
import Todos from "./todos/reducer"

// Job
import Jobs from './job/reducer'

//API Key
import APIKey from "./apikey/reducer";

import Registrasi from "./registrasi/reducer";

import DaftarPasien from "./daftarPasien/reducer";

import Master from "./master/reducer";

import Emr from "./emr/reducer";

import KendaliDokumen from "./kendaliDokumen/reducer";
import Radiologi from "./radiologi/reducer";
import Laboratorium from "./laboratorium/reducer";
import Payment from "./payment/reducer";
import Casemix from "./casemix/reducer";
import Gudang from "./gudang/reducer";
import PageState from "./pageState/reducer"
import Distribusi from "./distribusi/reducer";
import Farmasi from "./farmasi/reducer"
import Viewer from "./viewer/reducer";
import BedahSentral from "./bedahSentral/reducer";
import DaftarPasienOnline from "./daftarPasienOnline/reducer"
import Berita from "./berita/reducer"
import sumberDayaManusia from "./sumberDayaManusia/reducer";


const rootReducer = combineReducers({
    // public
    Layout,
    Login,
    Account,
    ForgetPassword,
    Profile,
    Calendar,
    chat,
    Projects,
    Ecommerce,
    Tasks,
    changeNumber,
    Crypto,
    Tickets,
    Crm,
    Invoice,
    Mailbox,
    DashboardAnalytics,
    DashboardCRM,
    DashboardEcommerce,
    DashboardCrypto,
    DashboardProject,
    DashboardNFT,
    Team,
    FileManager,
    Todos,
    Jobs,
    APIKey,
    Registrasi,
    Master,
    DaftarPasien,
    Emr,
    KendaliDokumen,
    Radiologi,
    Laboratorium,
    Payment,
    Casemix,
    Gudang,
    Distribusi,
    PageState,
    Farmasi,
    Viewer,
    BedahSentral,
    DaftarPasienOnline,
    Berita,
    sumberDayaManusia
});

export default rootReducer;