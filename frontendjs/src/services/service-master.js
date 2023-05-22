import { APIClient } from "../helpers/api_helper";

const api = new APIClient();

export default class ServiceMaster {
    getAllMaster = async () => {
        return await api.get("/master/combobox");
    }

    getDesa = async (desa) => {
        return await api.get(`/master/desa-kelurahan?&param=${desa}`);
    }

    getKecamatan = async (desa) => {
        return await api.get(`/master/kecamatan`);
    }

    getComboRegistrasi = async (desa) => {
        return await api.get(`/master/combobox-registrasi`);
    }
    
}