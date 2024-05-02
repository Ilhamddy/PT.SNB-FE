import { APIClient } from "../helpers/api_helper";

const api = new APIClient();

export default class ServiceGigi {
    
    getAllGigi = async (queries) => {
        return await api.get(`/transaksi/gigi/get-all-gigi`, queries);
    }

}
