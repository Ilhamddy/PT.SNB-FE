import { APIClient } from "../helpers/api_helper";

const api = new APIClient();
const baseurl =`/transaksi/gizi`
export default class ServiceGizi {
    getMasterGizi = async (queries) => {
        return await api.get(`${baseurl}/list-master-gizi`, queries);
    }
}