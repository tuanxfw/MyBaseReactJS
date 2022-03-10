import React from "react";
import CommonButton from "components/CommonButton";
import { showCircleLoading, closeCircleLoading } from "components/CircleLoading";

const SampleProcess = (props) => {

    return (
        <>
            <CommonButton onClick={() => {
                showCircleLoading();
                let time = setTimeout(() => {
                    closeCircleLoading();
                    clearTimeout(time);
                }, 3000)
            }}>
                showCircleLoading
            </CommonButton>
        </>
    );
}

export default SampleProcess;
