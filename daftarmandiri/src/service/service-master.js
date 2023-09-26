import { APIClient } from "../helpers/api_helper";

const api = new APIClient();

export default class ServiceMaster {
    
    getAllMaster = async () => {
        return await api.get("/master/combobox", );
    }
    
    
}
