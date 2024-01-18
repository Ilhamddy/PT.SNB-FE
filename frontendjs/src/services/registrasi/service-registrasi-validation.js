import { APIClient } from "../../helpers/api_helper";

const api = new APIClient();

export default class ServiceRegistrasiValidation {
    baseUrl = "/transaksi/registrasi/validation"
    
    getNIK = async (queries) => {
        return await api.get(this.baseUrl + "/get-nik", queries)
    }

    getNoRMLast = async (queries) => {
        return await api.get(this.baseUrl + "/get-no-rm-last", queries)
    }

    getNoBPJS = async (queries) => {
        return await api.get(this.baseUrl + "/get-no-bpjs", queries)
    }
}