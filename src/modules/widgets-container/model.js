import axios from 'axios'
import {getAxiosConfig} from 'dashboard-app/utils/http-request'
import {ENDPOINTS} from 'dashboard-app/config/axios-endpoints'
const getWidgetsData = (params) => {
    const axiosConfig = getAxiosConfig(ENDPOINTS.GET_WIDGET_DATA, 'get', params)
    return axios(axiosConfig);
}
export {getWidgetsData}