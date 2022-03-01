import React, { useState, useMemo } from "react";
import store from "redux/store";
import { withTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Modal } from "reactstrap";
import {
  getDialogItems,
} from "redux/selectors/dialogSelectors";
import {
  setDialogItems
} from "redux/actions/dialogActions";
import { v4 as uuidv4 } from 'uuid';
import ErrorBoundary from "components/default/ErrorBoundary";

const _ = require('lodash');

const Dialog = (props) => {

  const r_dialogItems = useSelector(getDialogItems);

  //#region Event

  //#endregion

  //#region Method
  const genContent = (lstContent) => {
    const lstDialog = lstContent.map((item) => {
      return <DialogItem id={item.id} options={item.options}>{item.content}</DialogItem>
    });

    return lstDialog;
  }
  //#endregion

  return (
    <>
      {/* {genContent(r_dialogItems)} */}
      {useMemo(() => genContent(r_dialogItems), [r_dialogItems])}
    </>
  );
};

export default withTranslation(["common"])(Dialog);

const DialogItem = (props) => {
  const [s_isOpen, s_setIsOpen] = useState(true);

  return (
    <>
      <Modal
        className="dialog-style"
        backdrop={"static"}
        scrollable={false}
        zIndex={1050}
        isOpen={s_isOpen}
        {...props.options}
      >
        <button hidden id={props.id} onClick={() => s_setIsOpen(false)} />
        <ErrorBoundary>
          {props.children}
        </ErrorBoundary>
      </Modal>
    </>
  );
}

export const showDialog = (dialogContent, dialogId = uuidv4(), dialogOptions = null) => {
  let dialogItems = [...store.getState().dialog.dialogItems];

  dialogItems.push({
    id: dialogId,
    content: dialogContent,
    options: dialogOptions,
  });

  store.dispatch(setDialogItems(dialogItems));

  return dialogId;
};

export const closeDialog = (dialogId, callback) => {
  document.getElementById(dialogId).click();

  setTimeout(
    () => {
      let dialogItems = [...store.getState().dialog.dialogItems];

      let newDialogItem = _.filter(dialogItems, (obj) => obj.id !== dialogId);
      store.dispatch(setDialogItems(newDialogItem));

      if (callback) {
        callback();
      }
    },
    200
  );
};