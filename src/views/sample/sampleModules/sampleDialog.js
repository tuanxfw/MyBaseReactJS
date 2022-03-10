import React from "react";
import CommonButton from "components/CommonButton";
import { showDialog, closeDialog } from "components/Dialog";

import SampleForm from "../sampleForm";

const SampleDialog = (props) => {

    return (
        <>
            <CommonButton onClick={
                () => {
                    showDialog(<SampleForm />, "test-123")
                }
            }>showDialog
            </CommonButton>
        </>
    );
}

export default SampleDialog;
