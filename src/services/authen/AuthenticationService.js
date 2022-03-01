import {axiosClient} from "services/rest/axios";
import {
    LOGIN,
    LOGOUT,
    GET_MENU,
} from "constants/AppPath";

export const AuthenticationService = {
    login: (data) => {
        return axiosClient.login(LOGIN, data);
    },

    logout: () => {
        return axiosClient.logout();
    },

    getMenu: (username) => {
        return axiosClient.get(GET_MENU, null);
    },
};