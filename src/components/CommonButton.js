import React, { useEffect, useState } from "react";
import ButtonText from "components/button/ButtonText";
import ButtonIconText from "components/button/ButtonIconText";
import ButtonIcon from "components/button/ButtonIcon";
import ActionTable from "components/button/ActionTable";

const CommonButton = ({code: p_code, type: p_type, onClick: p_onClick, ...rest}) => {

  //#region Method
  const selectButton = () => {

    if (checkPerMission(p_code) === false) {
      return;
    }

    let options = { ...rest };

    options.onClick = commonOnClick;

    let button = null;

    switch (p_type) {
      case "iconText":
        button = <ButtonIconText {...options} />;
        break;

      case "icon":
        button = <ButtonIcon {...options} />;
        break;

      case "actionTable":
        button = <ActionTable {...options} />;
        break;

      default: //text
        button = <ButtonText {...options} />;
        break;
    }

    return button;
  };
  //#endregion

  //#region Event
  const commonOnClick = (e) => {
    
    writeLog(p_code);

    if (p_onClick) {
      p_onClick(e);
    }
  };
  //#endregion

  //#region Method
  const checkPerMission = (code) => {
    return true;
  };

  const writeLog = (code) => {
    
  };
  //#endregion

  return selectButton();
};

export default CommonButton;
