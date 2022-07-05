import * as yup from "yup";
import i18n from "translation/i18n";
import { StringUtils } from 'utils/StringUtils';
import { DateUtils } from 'utils//DateUtils';

const _ = require('lodash');

//#region Mixed
yup.addMethod(yup.mixed, 'notEmpty', function () {
    return this.test('notEmpty', '', function (value) {
        const { path, createError } = this;

        if (!_.isBoolean(value) && !_.isNumber(value) && _.isEmpty(value)) {
            return createError({
                path,
                message: i18n.t('common:messages.validate.notEmpty'),
            });
        }

        return true;
    });
});

yup.addMethod(yup.mixed, "custom", function (functionCustom) {
    return this.test("custom", "", function (value) {
        const { path, createError, parent } = this;
        
        let customPath = path;

        const {anotherPath, isValid, message} = functionCustom(value, parent);

        if (!_.isEmpty(anotherPath)) {
            customPath = anotherPath;
        }

        if(isValid === false) {
            return createError({path: customPath, message});
        }
        
        return true;
    });
});
//#endregion

//#region String
yup.addMethod(yup.string, "maxByte", function (size) {
    return this.test("maxByte", "", function (value) {
        const { path, createError } = this;

        let bytes = StringUtils.getBytesString(value);

        if (bytes > size) {
            return createError({ path, message: i18n.t("common:messages.validate.textLengthIsLarget") });
        }

        return true;
    });
});

yup.addMethod(yup.string, "trim", function (size) {
    return this.transform(function (value) {
        return _.toString(value).trim();
    });
});
//#endregion

//#region Date
yup.addMethod(yup.string, "minDate", function (fieldCompare, format = "") {
    return this.test("minDate", "", function (value) {
        const { path, createError, parent } = this;

        let date1 = DateUtils.convertStringToDate(_.toString(value), format);
        let date2 = DateUtils.convertStringToDate(_.toString(parent?.[fieldCompare]), format);

        if (_.isEmpty(parent?.[fieldCompare])) {
            return true;
        }

        if (date1 < date2) {
            return createError({ path, message: i18n.t("common:messages.validate.min").format(_.toString(parent?.[fieldCompare])) });
        }

        return true;
    });
});

yup.addMethod(yup.string, "maxDate", function (fieldCompare, format = "") {

    return this.test("maxDate", "", function (value) {
        const { path, createError, parent } = this;

        let date1 = DateUtils.convertStringToDate(_.toString(value), format);
        let date2 = DateUtils.convertStringToDate(_.toString(parent?.[fieldCompare]), format);

        if (_.isEmpty(parent?.[fieldCompare])) {
            return true;
        }

        if (date1 > date2) {
            return createError({ path, message: i18n.t("common:messages.validate.max").format(_.toString(parent?.[fieldCompare])) });
        }

        return true;
    });
});
//#endregion

//#region Number

//#endregion

export default yup;