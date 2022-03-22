import React, { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import { Input } from 'antd';
import NumberFormat from "react-number-format";
import { App as AppConstants } from "constants/Constants";

const CommonInputNumber = ({ onChange, ...props }) => {

    const isAllowed = (values) => {
        let valueNumber = values.floatValue;
        let valueString = values.value;
        let min = props.min;
        let max = props.max;

        if (props.maxlength && valueString.length > props.maxlength) {
            return false;
        }

        if (max !== undefined && valueNumber !== undefined && valueNumber > max) {
            //s_setOptions({...s_options, ...{value: max}});
            return false;
        }

        if (min !== undefined && valueNumber !== undefined && valueNumber < min) {
            //s_setOptions({...s_options, ...{value: min}});
            return false;
        }

        return true;
    }

    return <NumberFormat
        {...props}
        onValueChange={onChange ? (values) => { onChange(values); } : undefined}
        isAllowed={isAllowed}
        decimalSeparator={props.decimalSeparator || undefined}
        thousandSeparator={props.thousandSeparator || undefined}
    />;
}

CommonInputNumber.propTypes = {
    value: PropTypes.number,
    maxlength: PropTypes.number,
    min: PropTypes.number,
    max: PropTypes.number,
};

CommonInputNumber.defaultProps = {
    decimalSeparator: AppConstants.NUMBER_FORMAT.DECIMAL_SEPARATOR,
    thousandSeparator: AppConstants.NUMBER_FORMAT.THOUSAND_SEPARATOR,
    customInput: Input,
};

export default CommonInputNumber;