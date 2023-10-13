import { APIClient } from "../helpers/api_helper";

const api = new APIClient();

export default class ServiceFarmasi {

    uploadImage = async (data) => {
        return await api.create(`/files/upload-image`, data, {
            headers: {
              'accept': 'application/json',
              'Accept-Language': 'en-US,en;q=0.8',
              'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
            }
        });
    }
    
}
