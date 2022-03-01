import axios from 'axios';
import { showCircleLoading, closeCircleLoading } from "components/CircleLoading";
import { showError } from "components/MessageBox";
import { Services as ConstantsServices } from "constants/Constants";
import { Trans } from "translation/i18n";
import { AuthenUtils } from 'utils/AuthenUtils';
import { LOGIN } from "constants/AppPath";

export const axiosClient = {
    login,
    logout,

    get,
    post,
};

//#region authen method
function login (path, data, callBackFunc) {
    let url = genApiUrl(path);

    showCircleLoading();
    
    const requestOptions = {
        timeout: ConstantsServices.TIMEOUT_REST_API,
        headers: {"Content-Type": "application/json"},
    };

    return axios.post(url, data, requestOptions).then(handleRestApi(callBackFunc)).catch(handleException);
};

function logout ( path = LOGIN, data = {}, callBackFunc = AuthenUtils.logoutLocal() ) {
    beforeRest();

    const config = genConfig({});

    let url = genApiUrl(path);

    showCircleLoading();
    
    const requestOptions = {
        timeout: config.timeout,
        headers: config.headers
    };

    return axios.post(url, data, requestOptions).then(handleRestApi(callBackFunc)).catch(handleException);
};
//#endregion

function get (path, data, callBackFunc, config = {}) {
    beforeRest();

    let url = genApiUrl(path);
    config = genConfig(config);

    if (config.dialogProcess) {
        showCircleLoading();
    }
    
    const requestOptions = {
        timeout: config.timeout,
        headers: config.headers
    };

    return axios.get(url, requestOptions).then(handleRestApi(callBackFunc)).catch(handleException);
};

function post (path, data, callBackFunc, config = {}) {
    beforeRest();

    let url = genApiUrl(path);
    config = genConfig(config);

    if (config.dialogProcess) {
        showCircleLoading();
    }
    
    const requestOptions = {
        timeout: config.timeout,
        headers: config.headers
    };

    return axios.post(url, data, requestOptions).then(handleRestApi(callBackFunc)).catch(handleException);
};

//#region default method

const beforeRest = () => {
    const isLogging = AuthenUtils.checkLoginLocal();
    if (!isLogging) {
        AuthenUtils.logoutLocal();
    }
};

const genConfig = (configOverrive) => {
    let config = {};

    const configDefault = {
        dialogProcess: true,
        timeout: ConstantsServices.TIMEOUT_REST_API,
    };
    config = {...configDefault, ...configOverrive};

    const defaultHeader = { 
        "Content-Type": "application/json",
        "Authorization": AuthenUtils.getUserTokenLocal()["accessToken"] || "",
    };
    config.headers = {...defaultHeader, ...configOverrive.headers};

    return config;
};

const genApiUrl = (path) => {
    let url = process.env.REACT_APP_URL_API.replace(/\/$/, "") + "/" + path.replace(/^\//, "");
    return url;
};

const handleRestApi = (callBackFunc) => (res) => {
    closeCircleLoading();

    let result = res.data;

    if (callBackFunc) {
        callBackFunc(result);
    }
    else {
        return result;
    }
};

const handleException = (error) => {
    closeCircleLoading();

    if (error?.response?.status === 401 || error?.response?.status === 403) {
        alert(<Trans ns="common" name="common:errors.sessionLoginIsExpired" />);
        logout();
    }
    else {
        console.log(error);
        showError(<Trans ns="common" name="common:errors.exception" />);
    }
};

//#endregion


