import { APIClient } from "../helpers/api_helper";

const api = new APIClient();

export default class ServiceMaster {
    getComboTambahLayanan = async (queries) => {
        return await api.get("/master/layanan/get-combo-tambah-layanan", queries);
    }
    
    upsertLayanan = async (data) => {
        return await api.create("/master/layanan/upsert-layanan", data)
    }

    getLayanan = async (queries) => {
        return await api.get("/master/layanan/get-layanan", queries)
    }
}