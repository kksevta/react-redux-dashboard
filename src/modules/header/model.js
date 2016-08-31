import axios from 'axios'
import {getAxiosConfig} from 'dashboard-app/utils/http-request'
import {ENDPOINTS} from 'dashboard-app/config/axios-endpoints'
const getDashboardsList = (params) => {
    const axiosConfig = getAxiosConfig(ENDPOINTS.DASHBOARDS_LIST, 'get', params)
    return axios(axiosConfig);
}
const callLogout = () => {
    const axiosConfig = getAxiosConfig(ENDPOINTS.LOGOUT, 'get')
    return axios(axiosConfig);
}
export {getDashboardsList, callLogout}