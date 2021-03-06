import axios from 'axios';
import { showCircleLoading, closeCircleLoading } from "components/CircleLoading";
import { showError } from "components/MessageBox";
import { Config as ConfigConstants, App as AppConstants, Services as ConstantsServices } from "constants/Constants";
import i18n from "translation/i18n";
import { AuthenUtils } from 'utils/AuthenUtils';
import { LOGOUT } from "constants/AppPath";

const _ = require('lodash');

const configDefault = {
    queryRes: "res.data",
    dialogProcess: true,
    timeout: ConstantsServices.TIMEOUT_REST_API,
};

export const axiosClient = {
    login,
    logout,

    get,
    post,
    put,
    del,
};

//#region authen method
function login(path, data, callBackFunc) {
    let url = genApiUrl(path);

    showCircleLoading();

    const requestOptions = {
        timeout: ConstantsServices.TIMEOUT_REST_API,
        headers: { "Content-Type": "application/json" },
    };

    return axios.post(url, data, requestOptions).then(handleRestApi(callBackFunc, configDefault)).catch(handleException({}));
};

function logout(path = LOGOUT, data = {}, callBackFunc = AuthenUtils.logoutLocal) {
    if (beforeRest() === false) return;

    const config = genConfig({});

    let url = genApiUrl(path);

    showCircleLoading();

    const requestOptions = {
        timeout: config.timeout,
        headers: config.headers,
    };

    return axios.post(url, data, requestOptions).then(handleRestApi(callBackFunc, config)).catch(handleException({}));
};
//#endregion

function get(path, data, callBackFunc, config = {}, isFullRequest = false) {
    if (beforeRest() === false) return;

    let url = genApiUrl(path);
    url = genStringQuery(url, data);

    config = genConfig(config);

    if (config.dialogProcess) {
        showCircleLoading();
    }

    const requestOptions = {
        timeout: config.timeout,
        headers: config.headers,
        ...config.request,
    };

    return axios.get(url, requestOptions).then(handleRestApi(callBackFunc, config)).catch(handleException(config));
};

function post(path, data, callBackFunc, config = {}) {
    if (beforeRest() === false) return;

    let url = genApiUrl(path);
    config = genConfig(config);

    if (config.dialogProcess) {
        showCircleLoading();
    }

    const requestOptions = {
        timeout: config.timeout,
        headers: config.headers,
        ...config.request,
    };

    return axios.post(url, data, requestOptions).then(handleRestApi(callBackFunc, config)).catch(handleException(config));
};

function put(path, data, callBackFunc, config = {}) {
    if (beforeRest() === false) return;

    let url = genApiUrl(path);
    config = genConfig(config);

    if (config.dialogProcess) {
        showCircleLoading();
    }

    const requestOptions = {
        timeout: config.timeout,
        headers: config.headers,
        ...config.request,
    };

    return axios.put(url, data, requestOptions).then(handleRestApi(callBackFunc, config)).catch(handleException(config));
};

function del(path, data, callBackFunc, config = {}) {
    if (beforeRest() === false) return;

    let url = genApiUrl(path);
    url = genStringQuery(url, data);

    config = genConfig(config);

    if (config.dialogProcess) {
        showCircleLoading();
    }

    const requestOptions = {
        timeout: config.timeout,
        headers: config.headers,
        ...config.request,
    };

    return axios.delete(url, requestOptions).then(handleRestApi(callBackFunc, config)).catch(handleException(config));
};

//#region default function

const beforeRest = () => {
    const isLogging = AuthenUtils.checkLoginLocal();
    if (!isLogging) {
        alert(i18n.t("common:errors.sessionLoginIsExpired"));

        AuthenUtils.logoutLocal();
        return false;
    }

    return true;
};

const genConfig = (configOverrive) => {
    let config = {};

    config = { ...configDefault, ...configOverrive };

    const defaultHeader = {
        "Content-Type": "application/json",
        "Authorization": AuthenUtils.getUserTokenLocal()["accessToken"] || "",
    };
    config.headers = { ...defaultHeader, ...configOverrive.headers };

    return config;
};

const genStringQuery = (path, data) => {
    let fullPath = "";

    let url = new URL(path);
    fullPath = url.origin + url.pathname + "?" + url.searchParams.toString();

    if (data) {
        fullPath = fullPath + (url.search !== "" ? "&" : "") + new URLSearchParams(data).toString();
    }

    return fullPath;
};

const genApiUrl = (path) => {
    if (AppConstants.REGEX.URL.test(path)) {
        return path;
    }

    let url = ConfigConstants.URL_API.replace(/\/$/, "") + "/" + path.replace(/^\//, "");
    return url;
};

const handleRestApi = (callBackFunc, config) => (res) => {
    if (config.dialogProcess === true) {
        closeCircleLoading();
    }
    
    let result = _.get({res}, config.queryRes, {});

    if (callBackFunc) {
        callBackFunc(result);
    }
    else {
        return result;
    }
};

const handleException = (config) => (error) => {
    if (config.dialogProcess === true) {
        closeCircleLoading();
    }

    if (error?.response?.status === 401 || error?.response?.status === 403) {
        if (AuthenUtils.checkLoginLocal()) {
            alert(i18n.t("common:errors.sessionLoginIsExpired"));
            logout();
        }
    }
    else {
        console.log(error);
        showError(i18n.t("common:errors.exception"));
    }
};

//#endregion




