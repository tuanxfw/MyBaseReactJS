import React, { useState, useEffect } from "react";
import { withTranslation } from "react-i18next";
import {
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import Dialog from "components/Dialog";
import CommonButton from "components/CommonButton";

const SampleForm = (props) => {
  const { t } = props;

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

    s_setDialog(<Dialog style={{maxWidth: "100%"}}>
      <ModalHeader toggle={options.onCancel}>{"okok"}</ModalHeader>
      <ModalBody>
        123123123
      </ModalBody>
    </Dialog>);
  };


  const onCancel = () => {
    props.options.onCancel();
  };

  return (
    <>
      <ModalHeader toggle={onCancel}>{props.options.title}</ModalHeader>
      <ModalBody>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </ModalBody>
      <ModalFooter>
        <CommonButton color="primary" onClick={onShowDialog}>
          Do Something
        </CommonButton>{" "}
        <CommonButton onClick={onCancel}>Cancel</CommonButton>
      </ModalFooter>

      {s_dialog}
    </>
  );
};

export default withTranslation(["common"])(SampleForm);
