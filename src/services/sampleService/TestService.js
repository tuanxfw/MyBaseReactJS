import {axiosClient} from "services/rest/axios";
import {
    TEST_GET,
} from "constants/AppPath";

export const TestService = {
    testGet: () => {
        return axiosClient.get(TEST_GET, null);
        // let data = { test2: 2, test3: 3};
        // return axiosClient.get('http://localhost:85/api/Test/GetTest.php?test1=1', data);
    },
};