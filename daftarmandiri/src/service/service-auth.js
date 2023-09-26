import { APIClient } from "../helpers/api_helper";

const api = new APIClient();

export default class ServiceAuth {
    
    loginUser = async (body) => {
        return await api.create(`/auth/login-user-pasien`, body, false);
    }

}
