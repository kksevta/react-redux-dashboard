const API_URL = "http://localhost:3000/"
const ENDPOINTS = {
    LOGIN: {
        URL: "auth/login",
        HEADERS: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    },
    LOGOUT: {
        URL: "auth/logout",
        HEADERS: {}
    },
    IS_AUTHENTICATED: {
        URL: "auth/isauthenticated",
        HEADERS: {}
    },
    DASHBOARDS_LIST: {
        URL: "dashboardslist",
        HEADERS: {}
    },
    WIDGETS_CONF: {
        URL: "widgetsconf",
        HEADERS: {}
    },
    SAVE_DASHBOARD: {
        URL: "savedashboard",
        HEADERS: {}
    },
    REMOVE_DASHBOARD: {
        URL: "removedashboard",
        HEADERS: {}
    },
    GET_WIDGET_DATA: {
        URL: "getwidgetsdata",
        HEADERS: {}
    }
}
const DEFAULT_DASHBOARD_NAME = 'NEW_DASHBOARD'
const AxiosConfig = {
    url: '',
    method: 'get',
    baseURL: API_URL,
    withCredentials: true, // default
    transformResponse: [function (data) {
        if (data == 'Unauthorized') {
            window.location.href = '/login';
        }
        else {
            return JSON.parse(data);
        }
    }],
}
const AuthAxiosConfig = {
    url: '',
    method: 'get',
    baseURL: API_URL,
    withCredentials: true, // default
}
export { API_URL, ENDPOINTS, AxiosConfig, DEFAULT_DASHBOARD_NAME, AuthAxiosConfig }