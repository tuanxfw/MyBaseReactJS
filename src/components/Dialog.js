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
      return <DialogItem key={uuidv4()} id={item.id} options={item.options}>{item.content}</DialogItem>
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

const DialogItem = ({id: p_id, ...props}) => {
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
        <button hidden name="closeDialog" id={p_id} onClick={() => s_setIsOpen(false)} />
        <ErrorBoundary>
          {props.children}
        </ErrorBoundary>
      </Modal>
    </>
  );
}

export const showDialog = (dialogContent, dialogId = uuidv4(), dialogOptions = null) => {
  let dialogItems = [...store.getState().dialog.dialogItems];

  const optionsDefault = {
    size: "xl",
  }

  dialogItems.push({
    id: dialogId,
    content: dialogContent,
    options: { ...optionsDefault, ...dialogOptions },
  });

  store.dispatch(setDialogItems(dialogItems));

  return dialogId;
};

export const closeDialog = (dialogId, callback) => {
  if (dialogId) {
    document.getElementById(dialogId).click();
  }
  else {
    document.evaluate('//button[@name="closeDialog"]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.click();
  }

  setTimeout(
    () => {
      let dialogItems = [...store.getState().dialog.dialogItems];

      if (!dialogId) {
        dialogId = dialogItems[dialogItems.length - 1].id;
      }

      let newDialogItem = _.filter(dialogItems, (obj) => obj.id !== dialogId);
      store.dispatch(setDialogItems(newDialogItem));

      if (callback) {
        callback();
      }
    },
    200
  );
};