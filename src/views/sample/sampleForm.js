import React, { useState, useEffect } from "react";
import { withTranslation } from "react-i18next";
import {
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "reactstrap";
import { closeDialog } from "components/Dialog";

const SampleForm = (props) => {
  const { t } = props;

  return (
    <>
      <ModalHeader>Modal title</ModalHeader>
      <ModalBody>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </ModalBody>
      <ModalFooter>
        <Button color="primary">
          Do Something
        </Button>{" "}
        <Button onClick={() => closeDialog("test-123")}>Cancel</Button>
      </ModalFooter>
    </>
  );
};

export default withTranslation(["common"])(SampleForm);
