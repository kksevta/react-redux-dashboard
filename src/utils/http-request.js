import {AxiosConfig, AuthAxiosConfig} from '../config/axios-endpoints'

const encodeParams = (value) => {
    var endcodedParms = value;
    if (value) {
        endcodedParms = encodeURIComponent(value);
    }
    return endcodedParms;
};
const serialize = (obj) => {
    if (obj) {
        var params = Object.keys(obj).map(function (key) {
            var value = obj[key];
            if (Array.isArray(obj[key])) {
                return key + '=' + encodeParams(JSON.stringify(value));
            };
            return key + '=' + encodeParams(value);
        }).join('&');
        if (params.length) return params;
    }
    return '';
};
const getAxiosConfig = (endpoint, method, params = {}) => {
    let axiosConfig;
    if (endpoint.URL.indexOf('auth') >= 0) {
        axiosConfig = Object.assign({}, AuthAxiosConfig);
    } else {
        axiosConfig = Object.assign({}, AxiosConfig);
    }
    axiosConfig.method = method;
    axiosConfig.url = endpoint.URL;
    if (method == 'post') {
        axiosConfig.data = serialize(params);
        axiosConfig.headers = endpoint.HEADERS;
    }
    else {
        axiosConfig.params = params;
        axiosConfig.data = params;
    }
    return axiosConfig;
}
export { encodeParams, serialize, getAxiosConfig }