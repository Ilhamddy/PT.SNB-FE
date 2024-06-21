import { APIClient } from "frontendjs/src/helpers/api_helper";

const api = new APIClient();

export default class ServiceUserPegawai {
    
    upsertAbsenFotoLokasi = async (dataForm, dataJson) => {
        return await api.create("/pegawai/absen/foto-lokasi", dataForm, {
            headers: {
              'Content-Type': `multipart/form-data; boundary=${dataForm._boundary}`,
            }
        }, {
            isActivation: false,
            dataJson: dataJson
        });
    }
}
