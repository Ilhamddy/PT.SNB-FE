import { APIClient } from "../helpers/api_helper";

const api = new APIClient();

export default class ServiceAdminDaftarMandiri {

    uploadBerita = async (data) => {
        return await api.create(`/admindaftarmandiri/upload-berita`, data, {
            headers: {
              'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
            }
        }, {
            isActivation: false
        });
    }


    getBerita = async () => {
        return await api.get(`/admindaftarmandiri/get-berita`);
    }

    getBeritaNorec = async (queries) => {
        return await api.get(`/admindaftarmandiri/get-berita-norec`, queries);
    }
}
