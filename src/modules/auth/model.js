import axios from 'axios'
import {getAxiosConfig} from 'dashboard-app/utils/http-request'
import {ENDPOINTS} from 'dashboard-app/config/axios-endpoints'
const postLogin = (data) => {
    const axiosConfig = getAxiosConfig(ENDPOINTS.LOGIN, 'post', data)
    return axios(axiosConfig);
}
const postLogout = () => {
    const axiosConfig = getAxiosConfig(ENDPOINTS.LOGOUT, 'post')
    return axios(axiosConfig);
}
const isAuthenticated = () => {
    const axiosConfig = getAxiosConfig(ENDPOINTS.IS_AUTHENTICATED, 'post')
    return axios(axiosConfig);
}
export {postLogin, postLogout, isAuthenticated}