import { APIClient } from "../helpers/api_helper";

const api = new APIClient();

export default class ServiceSatuSehat {
    getListInstalasi = async (queries) => {
        return await api.get("/transaksi/satu-sehat/get-list-instalasi", queries)
    }
}