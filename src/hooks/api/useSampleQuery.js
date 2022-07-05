import { useQuery } from 'react-query';
import i18n from "translation/i18n";
import { showError } from "components/MessageBox";
import { Services as ServicesConst } from "constants/Constants";
import { TestService } from "services/sampleService/TestService";

const { SUCCESS } = ServicesConst.RESPONSE_CODE;

export const useTestFetch = (getValues) => {

    const getDataTest = async (param) => {
        let result = "";

        let res = await TestService.testGet(param);

        try {
            if (res.code === SUCCESS) {
                result = res.data;
            }
            else {
                showError(res.message);
            }
        }
        catch (error) {
            showError(i18n.t("common:errors.exception"));
        }

        return result;
    };


    return useQuery(
        ["useTestFetch"],
        () => {
            let param = getValues();

            return getDataTest(param);
        },
        { enabled: false }
    );

};