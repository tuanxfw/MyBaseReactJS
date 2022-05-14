import React from "react";
import { Spin } from 'antd';

const WrappedLoading = (props) => {
    return (
        <>
            <Spin spinning={props.isLoading}>
                {props.children}
            </Spin>
        </>
    );
}

export default WrappedLoading;
