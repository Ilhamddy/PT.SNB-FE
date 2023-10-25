import { APIClient } from "../helpers/api_helper";

const api = new APIClient();

export default class ServiceTempatTidur {
    getTempatTidur = async (queries) => {
        return await api.get("/transaksi/sysadmin/get-tempat-tidur", queries)
    }

    getUnitTempatTidur = async (queries) => {
        return await api.get("/transaksi/sysadmin/get-unit-tempat-tidur", queries)
    }

    getComboTempatTidur = async (queries) => {
        return await api.get("/transaksi/sysadmin/get-combo-tempat-tidur", queries)
    }
    
    upsertTempatTidur = async (body) => {
        return await api.create("/transaksi/sysadmin/upsert-tempat-tidur", body)
    }

    getAllUnit = async (queries) => {
        return await api.get("/transaksi/sysadmin/get-all-unit", queries)
    }

    getComboDaftarUnit = async (queries) => {
        return await api.get("/transaksi/sysadmin/get-combo-daftar-unit", queries)
    }

    upsertUnit = async (body) => {
        return await api.create("/transaksi/sysadmin/upsert-unit", body)
    }

    getAllKamar = async (queries) => {
        return await api.get("/transaksi/sysadmin/get-all-kamar", queries)
    }

    getComboDaftarKamar = async (queries) => {
        return await api.get("/transaksi/sysadmin/get-combo-daftar-kamar", queries)
    }
}