import { useEffect } from "react";

const _ = require('lodash');

export default function useFocusError(formId, errors) {
    useEffect(() => {
        if (!_.isEmpty(errors)) {

            try {

                const firstFieldError = Object.keys(errors).reduce((field, a) => {
                    return !!errors[field] ? field : a;
                }, null);

                if (firstFieldError !== null) {
                    try {
                        document.evaluate(`//*[@id="${formId}"]//*[@name="${firstFieldError}"]`, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.focus();
                    } catch (error) {
                        document.evaluate(`//*[@id="${formId}"]//*[@name="${firstFieldError}"]//input`, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.focus();
                    }
                }
            } catch (errors) { }
        }
    }, [errors])
}