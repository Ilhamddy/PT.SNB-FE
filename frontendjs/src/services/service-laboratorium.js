import { APIClient } from "../helpers/api_helper";

const api = new APIClient();

export default class ServiceLaboratorium {
    getWidgetDetailJenisProdukLab = async (param) => {
        return await api.get(`/transaksi/laboratorium/list-detail-jenis-produklab?nama=${param}`);
    }
}