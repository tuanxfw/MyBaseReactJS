import React, { useState } from "react";
import CommonButton from "components/CommonButton";
import Dialog from "components/Dialog";

import SampleForm from "../sampleForm";

const SampleDialog = (props) => {

    const [s_dialog, s_setDialog] = useState();

    const onShowDialog = () => {
        let options = {
            title: "Modal Title",
            onComplete: () => {
                s_setDialog(null);
            },
            onCancel: () => {
                s_setDialog(null);
            }
        };

        s_setDialog(<Dialog>
            <SampleForm options={options}/>
        </Dialog>);
    }

    return (
        <>
            <CommonButton onClick={onShowDialog}>
                showDialog
            </CommonButton>

            {s_dialog}
        </>
    );
}

export default SampleDialog;
