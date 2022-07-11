import React from "react";
import { Spin } from 'antd';
  
const WrappedLoading = ({isLoading, ...props}) => {
    return (
        <>
            <Spin
                spinning={isLoading}
                {...props}
            >
                {props.children}
            </Spin>
        </>
    );
}

export default WrappedLoading;
