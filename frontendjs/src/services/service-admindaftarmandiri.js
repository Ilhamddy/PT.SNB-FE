import { APIClient } from "../helpers/api_helper";

const api = new APIClient();

export default class ServiceAdminDaftarMandiri {

    uploadBerita = async (data) => {
        return await api.create(`/admindaftarmandiri/upload-berita`, data);
    }
    
}
