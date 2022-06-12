import React, { useState, useRef } from "react";
import i18n from "translation/i18n";
import { Modal } from "reactstrap";
import {
  showConfirm,
} from "components/MessageBox";

import { v4 as uuidv4 } from 'uuid';
import ErrorBoundary from "components/default/ErrorBoundary";

const _ = require('lodash');

const Dialog = (props) => {

  const ref_id = useRef(uuidv4());

  const options = {
    zIndex: 1050,
    backdrop: "static",
    size: "xl",
    fullscreen: false,
    ...props
  }

  const onToggleDialog = () => {
    try {
      let xpath = `//*[@id="${ref_id.current}"]//button[@class="btn-close"]`;
      let element = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
      element.click();

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Modal
        id={ref_id.current}
        className="dialog-style"
        scrollable={false}
        isOpen={true}
        toggle={onToggleDialog}
        {...options}
      >
        <ErrorBoundary>
          {props.children}
        </ErrorBoundary>
      </Modal>
    </>
  );
};

export default Dialog;

export const checkDirty = (isDirty, cancelFunc) => {
  if (isDirty) {
    showConfirm(
      i18n.t("common:messages.confirmCancel"),
      cancelFunc
    );
  }
  else {
    cancelFunc();
  }
};