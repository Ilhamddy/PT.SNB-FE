import { APIClient } from "../helpers/api_helper";

const api = new APIClient();

export default class ServiceTempatTidur {
    getTempatTidur = async (queries) => {
        return await api.get("/transaksi/tempattidur/get-tempat-tidur", queries)
    }

    getUnitTempatTidur = async (queries) => {
        return await api.get("/transaksi/tempattidur/get-unit-tempat-tidur", queries)
    }

    getComboTempatTidur = async (queries) => {
        return await api.get("/transaksi/tempattidur/get-combo-tempat-tidur", queries)
    }
    
    upsertTempatTidur = async (body) => {
        return await api.create("/transaksi/tempattidur/upsert-tempat-tidur", body)
    }
}