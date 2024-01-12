import { APIClient } from "../helpers/api_helper";

const api = new APIClient();

export default class ServiceBPJS {
    getPasienBPJS = async (queries) => {
        return await api.get(`/transaksi/bridging/bpjs/peserta`, queries);
    }
}