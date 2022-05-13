import React from "react";
import { StringUtils } from 'utils//StringUtils';

const _ = require('lodash');

const CommonValidTooltip = (props) => {
    return (
        <div className="tooltip-validate">
            <div className="tooltip-validate-content"  hidden={_.isEmpty(props.children)}>
                {props.children}
            </div>
        </div>

    );
}

export default CommonValidTooltip;
