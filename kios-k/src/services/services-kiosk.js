import { APIClient } from "../helpers/api_helper";

const api = new APIClient();
export default class ServiceKiosk {

    getComboKiosk = async (queries) => {
        return await api.get(`/transaksi/kiosk/combo-kiosk`, queries);
    }

    getCariPasienKiosk = async (queries) => {
        return await api.get(`/transaksi/kiosk/cari-pasien`, queries);
    }

}