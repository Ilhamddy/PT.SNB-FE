import { APIClient } from "../helpers/api_helper";

const api = new APIClient();

export default class ServiceAdminDaftarMandiri {

    uploadBerita = async (data) => {
        return await api.create(`/admindaftarmandiri/upload-beritas`, data, {
            headers: {
                "Content-Type": "application/json"
            }
        });
    }

    getBerita = async () => {
        return await api.get(`/admindaftarmandiri/get-berita`);
    }

    getBeritaNorec = async (queries) => {
        return await api.get(`/admindaftarmandiri/get-berita-norec`, queries);
    }
}
