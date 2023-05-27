import { config as devConfig } from "../config/Dev";
import { config as prodConfig } from "../config/Prod";

const config = import.meta.env.MODE === 'production' ? prodConfig : devConfig;

class BaseRestService {
    constructor() {
        this.API_BASE_URL = config.baseURL;
    }

    buildUrl(endpoint = '') {
        return `${this.API_BASE_URL}/${endpoint}`
    }
}

export default BaseRestService;