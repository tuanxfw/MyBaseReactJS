import React, { forwardRef } from "react";
import PropTypes from 'prop-types';
import { Input } from 'antd';
import NumberFormat from "react-number-format";
import { App as AppConstants } from "constants/Constants";

const CommonInputNumber = forwardRef(({
    onChange: p_onChange,
    fieldValue: p_fieldValue,
    ...props
}, ref) => {

    const onValueChange = (values) => {
        if (p_onChange) {
            let value = p_fieldValue === "" ? values : values[p_fieldValue];
            p_onChange(value);
        }
    };

    return <NumberFormat
        {...props}
        onValueChange={onValueChange}
        decimalSeparator={props.decimalSeparator || undefined}
        thousandSeparator={props.thousandSeparator || undefined}
    />;
});

CommonInputNumber.defaultProps = {
    decimalSeparator: AppConstants.NUMBER_FORMAT.DECIMAL_SEPARATOR,
    thousandSeparator: AppConstants.NUMBER_FORMAT.THOUSAND_SEPARATOR,
    customInput: Input,
    fieldValue: "value"
};

CommonInputNumber.propTypes = {
    fieldValue: PropTypes.oneOf(['formattedValue', 'value', 'floatValue', '']),
};

export default CommonInputNumber;