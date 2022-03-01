import {axiosClient} from "services/rest/axios";
import {
    TEST_GET,
} from "constants/AppPath";

export const TestService = {
    testGet: () => {
        return axiosClient.post(TEST_GET, null);
    },

    
};