import { APIClient } from "../helpers/api_helper";

const api = new APIClient();

export default class ServiceAdminDaftarMandiri {

    uploadBerita = async (data, dataJson) => {
        return await api.create(`/admindaftarmandiri/upload-berita`, data, {
            headers: {
              'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
            }
        }, {
            isActivation: false,
            dataJson: dataJson
        });
    }


    getBerita = async () => {
        return await api.get(`/admindaftarmandiri/get-berita`);
    }

    getBeritaNorec = async (queries) => {
        return await api.get(`/admindaftarmandiri/get-berita-norec`, queries);
    }
}
