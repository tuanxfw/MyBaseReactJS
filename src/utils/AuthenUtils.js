import Cookies from 'universal-cookie';
import { App } from "constants/Constants";

const cookies = new Cookies();

export const AuthenUtils = {
    checkLoginLocal,
    logoutLocal,

    setUserTokenLocal,
    getUserTokenLocal,
};

function setUserTokenLocal (token, timeout = 10000) {
    let cookieData = JSON.parse(cookies.get(App.CODE) || "{}");
    cookieData.userToken = token;

    cookies.set(App.CODE, JSON.stringify(cookieData), {maxAge: timeout});
};

function getUserTokenLocal () {
    let cookieData = cookies.get(App.CODE);

    return cookieData?.userToken || {};
};

function checkLoginLocal () {
    const localStorageData = localStorage.getItem(App.CODE);
    const cookieData = cookies.get(App.CODE);

    if (localStorageData && cookieData) {
        return true;
    }

    return false;
};

function logoutLocal() {
    localStorage.removeItem(App.CODE);
    cookies.remove(App.CODE);

    document.location.reload(true);
};