import { APIClient } from "../helpers/api_helper";

const api = new APIClient();

export default class ServiceFile {

    uploadImage = async (data) => {
        return await api.create(`/files/upload-image`, data, {
            headers: {
              'Content-Type': `multipart/form-data`,
            }
        });
    }

    getLog = async (queries) => {
        return await api.get(`/files/get-log`, queries)
    }
}
