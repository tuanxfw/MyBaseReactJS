import {axiosClient} from "services/rest/axios";
import {
    TEST_GET,
} from "constants/AppPath";

export const TestService = {
    testGet: (data) => {
        return axiosClient.get(TEST_GET, data);
    },
};