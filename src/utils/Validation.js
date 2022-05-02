import * as yup from "yup";

function maxByte(size) {
    return this.test("maxByte", size, function (value) {
        const { path, createError } = this;

        if (String(value).length > size) {
            return createError({ path, message: "Độ dài kí tự vượt quá cho phép" });
        }

        return true;
    });
}
yup.addMethod(yup.mixed, "maxByte", maxByte);

export default yup;