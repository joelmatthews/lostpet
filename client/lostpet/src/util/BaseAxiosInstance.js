import axios from "axios";
import BaseRestService from "../services/BaseRestService";

const baseRestService = new BaseRestService();
const lostPetUrl = baseRestService.buildUrl();

export const lostPetInstance = axios.create({
    baseURL: lostPetUrl,
    timeout: 1000,

})

