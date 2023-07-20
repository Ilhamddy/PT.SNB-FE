import { APIClient } from "../helpers/api_helper";

const api = new APIClient();
export default class ServiceCasemix {
    getListCariPasien = async (param) => {
        return await api.get(`/transaksi/casemix/list-pasien?nocm=${param}`);
    }

    getListDaftarPasien = async (param) => {
        return await api.get(`/transaksi/casemix/list-daftar-pasien?nocm=${param}`);
    }

    getListTarifPasien = async (param) => {
        return await api.get(`/transaksi/casemix/list-tarif18-pasien?norec=${param}`);
    }

    getListDiagnosa10 = async (param) => {
        return await api.get(`/transaksi/casemix/getList-diagnosax-pasien?norec=${param}`);
    }

    getListDiagnosa9 = async (param) => {
        return await api.get(`/transaksi/casemix/getList-diagnosaix-pasien?norec=${param}`);
    }

    postBridgingInacbg = async (params) => {
        return await api.create("/transaksi/casemix/save-bridging-inacbg", params);
    }
}