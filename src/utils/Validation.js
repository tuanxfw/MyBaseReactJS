import * as yup from "yup";
import i18n from "translation/i18n";

const _ = require('lodash');

yup.addMethod(yup.string, "maxByte", function (size) {
    return this.test("maxByte", "", function (value) {
        const { path, createError } = this;

        value = _.toString(value);

        let m = encodeURIComponent(value).match(/%[89ABab]/g);
        let bytes = value.length + (m ? m.length : 0);

        if (bytes > size) {
            return createError({ path, message: "Độ dài kí tự vượt quá cho phép" });
        }
        
        return true;
    });
});

yup.addMethod(yup.mixed, "notEmpty", function () {
    return this.test("notEmpty", "", function (value) {
        const { path, createError } = this;

        if (_.isEmpty(value)) {
            return createError({ path, message: i18n.t("common:common.msg.emptyMessage") });
        }

        return true;
    });
});

export default yup;