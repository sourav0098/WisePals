import axios from "axios";
import { API_ENDPOINTS } from "../utils/apiEndpoints";


export default axios.create({ baseURL: API_ENDPOINTS.BASE_URL });

//To make a request to an API endpoint that requires authentication
export const axiosPrivate = axios.create({ baseURL: API_ENDPOINTS.BASE_URL,
headers: {'content-Type': 'application/json'},
withCredentials: true,
});
