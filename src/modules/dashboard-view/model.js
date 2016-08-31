import axios from 'axios'
import {getAxiosConfig} from 'dashboard-app/utils/http-request'
import {ENDPOINTS} from 'dashboard-app/config/axios-endpoints'
const saveDashboard = (params) => {
    const axiosConfig = getAxiosConfig(ENDPOINTS.SAVE_DASHBOARD, 'post', params)
    return axios(axiosConfig);
}
const getWidgetsConfiguration = (params) => {
    const axiosConfig = getAxiosConfig(ENDPOINTS.WIDGETS_CONF, 'get', params)
    return axios(axiosConfig);
}
const removeDashboard = (params) => {
    const axiosConfig = getAxiosConfig(ENDPOINTS.REMOVE_DASHBOARD, 'post', params)
    return axios(axiosConfig);
}
export {saveDashboard, getWidgetsConfiguration, removeDashboard}