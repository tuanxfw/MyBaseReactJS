import React from "react";
import CommonButton from "components/CommonButton";

const SampleButtons = (props) => {

    return (
        <>
            <CommonButton type="text">Text</CommonButton>
            <hr />

            <CommonButton type="iconText">
                <i className="fab fa-accessible-icon" />
                <span>Icon Text</span>
            </CommonButton>
            <hr />

            <CommonButton type="icon">
                <i className="fab fa-accessible-icon" />
            </CommonButton>
            <hr />

            <CommonButton type="actionTable">
                <i className="fab fa-accessible-icon" />
            </CommonButton>
            <CommonButton type="actionTable">
                <i className="fab fa-accessible-icon" />
            </CommonButton>
            <CommonButton type="actionTable" disabled>
                <i className="fab fa-accessible-icon" />
            </CommonButton>
        </>
    );
}

export default SampleButtons;
