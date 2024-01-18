import { APIClient } from "../helpers/api_helper";

const api = new APIClient();

export default class ServiceSystem {

    getLastUpdated = async (queries) => {
        return await api.get("/system/get-last-updated", queries)
    }
}
