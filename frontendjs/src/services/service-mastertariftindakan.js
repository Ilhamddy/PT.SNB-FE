import { APIClient } from "../helpers/api_helper";

const api = new APIClient();

export default class ServiceMTT {

    getTotalHargaProduk = async (queries) => {
        return await api.get("/master/tariftindakan/get-total-harga-produk", queries);
    }

    getComboTarifTindakan = async (queries) => {
        return await api.get("/master/tariftindakan/get-combo-tarif-tindakan", queries)
    }
}