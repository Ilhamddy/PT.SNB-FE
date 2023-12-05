import { APIClient } from "../helpers/api_helper";

const api = new APIClient();

export default class ServiceSatuSehat {
    getListInstalasi = async (queries) => {
        return await api.get("/transaksi/satu-sehat/get-list-instalasi", queries)
    }
    upsertOrganizationInstalasi = async (body) => {
        return await api.create("/transaksi/satu-sehat/update-organization", body)
    }
    getListUnit = async (queries) => {
        return await api.get("/transaksi/satu-sehat/get-list-unit", queries)
    }
    upsertLocationUnit = async (body) => {
        return await api.create("/transaksi/satu-sehat/update-location-unit", body)
    }
}