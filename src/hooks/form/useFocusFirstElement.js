import { useEffect } from "react";

const _ = require('lodash');

export default function useFocusFirstElement(formName) {
    useEffect(() => {
        setTimeout(() => {
            const form = document.evaluate(`//form[@name="${formName}"]`, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;;

            try {
                form.focus()

                const elements = form.elements;
                for (let i = 0; i < elements.length; i++) {
                    if (elements[i].type !== 'hidden'
                        && elements[i].type !== 'button'
                        && !elements[i].disabled
                        && !elements[i].readonly
                        && !elements[i].hidden) {

                        elements[i].focus();
                        break;

                    }
                }
            } catch (e) { }
        }, 500)
    }, [])
}