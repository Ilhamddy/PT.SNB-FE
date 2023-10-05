import { APIClient } from "../helpers/api_helper";

const api = new APIClient();

export default class ServiceBedahSentral {

    getWidgetDaftarOrderRadiologi = async (param) => {
        return await api.get(`/transaksi/radiologi/widget-daftar-order-radiologi?noregistrasi=${param}`);
    }

}