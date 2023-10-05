import { APIClient } from "../helpers/api_helper";

const api = new APIClient();

export default class ServiceBedahSentral {

    getwidgetOrderOperasi = async (param) => {
        return await api.get(`/transaksi/operasi/get-widget-order-operasi`,param);
    }

}