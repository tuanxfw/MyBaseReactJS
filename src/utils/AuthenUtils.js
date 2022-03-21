import Cookies from 'universal-cookie';
import { Config } from "constants/Constants";

const cookies = new Cookies();

export const AuthenUtils = {
    checkLoginLocal,
    logoutLocal,

    setUserTokenLocal,
    getUserTokenLocal,
};

function setUserTokenLocal (token, timeout = 10000) {
    let cookieData = JSON.parse(cookies.get(Config.CODE) || "{}");
    cookieData.userToken = token;

    cookies.set(Config.CODE, JSON.stringify(cookieData), {maxAge: timeout});
};

function getUserTokenLocal () {
    let cookieData = cookies.get(Config.CODE);

    return cookieData?.userToken || {};
};

function checkLoginLocal () {
    const localStorageData = localStorage.getItem(Config.CODE);
    const cookieData = cookies.get(Config.CODE);

    if (localStorageData && cookieData) {
        return true;
    }

    return false;
};

function logoutLocal() {
    localStorage.removeItem(Config.CODE);
    cookies.remove(Config.CODE);

    document.location.reload(true);
};