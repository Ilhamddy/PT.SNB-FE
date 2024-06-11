import { APIClient } from "../helpers/api_helper";

const api = new APIClient();

export default class ServiceAdminDaftarMandiri {

    uploadBerita = async (data) => {
        return await api.create(`/admindaftarmandiri/upload-beritas`, data);
    }

    getBerita = async () => {
        return await api.get(`/admindaftarmandiri/get-berita`);
    }

    getBeritaNorec = async (queries) => {
        return await api.get(`/admindaftarmandiri/get-berita-norec`, queries);
    }
}
