import { APIClient } from "../helpers/api_helper";

const api = new APIClient();

export default class ServiceBedahSentral {

    getwidgetOrderOperasi = async (param) => {
        return await api.get(`/transaksi/operasi/get-widget-order-operasi`,param);
    }

    getDaftarOrderOperasi = async (param) => {
        return await api.get(`/transaksi/operasi/get-daftar-order-operasi`,param);
    }

    getComboOrderOperasi = async (param) => {
        return await api.get(`/transaksi/operasi/get-combo-order-operasi`,param);
    }

}