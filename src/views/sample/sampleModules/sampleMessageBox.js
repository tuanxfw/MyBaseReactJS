import React from "react";
import CommonButton from "components/CommonButton";
import {
    showInfo,
    showWarning,
    showConfirm,
    showError,
} from "components/MessageBox";

const SampleButtons = (props) => {

    return (
        <>
            <CommonButton onClick={() => showInfo("Info")}>showInfo</CommonButton>
            <hr />
            <CommonButton onClick={() => showWarning("Warning")}>showWarning</CommonButton>
            <hr />
            <CommonButton
                onClick={() =>
                    showConfirm("Confirm", () => console.log("call back confirmS"))
                }
            >
                showConfirm
            </CommonButton>
            <hr />
            <CommonButton onClick={() => showError("Error")}>showError</CommonButton>
        </>
    );
}

export default SampleButtons;
