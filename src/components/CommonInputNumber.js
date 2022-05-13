import React, { forwardRef, useEffect, useState } from "react";
import PropTypes from 'prop-types';
import { Input } from 'antd';
import NumberFormat from "react-number-format";
import { App as AppConstants } from "constants/Constants";

const CommonInputNumber = forwardRef(({ onChange, ...props }, ref) => {

    return <NumberFormat
        {...props}
        //ref={ref}
        onValueChange={onChange ? (values) => { onChange(values); } : undefined}
        decimalSeparator={props.decimalSeparator || undefined}
        thousandSeparator={props.thousandSeparator || undefined}
    />;
});

CommonInputNumber.defaultProps = {
    decimalSeparator: AppConstants.NUMBER_FORMAT.DECIMAL_SEPARATOR,
    thousandSeparator: AppConstants.NUMBER_FORMAT.THOUSAND_SEPARATOR,
    customInput: Input,
};

export default CommonInputNumber;