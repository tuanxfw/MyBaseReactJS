import React from "react";
import { Select } from "antd";
import { ObjectUtils } from "utils/ObjectUtils";

const CommmonSelect = ({ dataRender, funcRender, ...props }) => {

  const onChangeValue = (e) => {
    if (props.onChange) {
      props.onChange(e || "");
    }

    ObjectUtils.objectIsNull(1);
  }

  return <>
    <Select
      {...props}
      className={"common-select " + props.className}
      onChange={onChangeValue}
    >
      {funcRender(dataRender)}
    </Select>
    <input hidden/>
  </>;
};

export default React.memo(CommmonSelect, ObjectUtils.compareProps);
//export default React.memo(CommmonSelect);

const filterSelectOption = (input, event) => {
  return String(event.value) === "header"
    || String(event.key).toLowerCase().includes(input.toLowerCase())
    || String(event.label).toLowerCase().includes(input.toLowerCase())
    || String(event.value).toLowerCase().includes(input.toLowerCase());
};

CommmonSelect.defaultProps = {
  showSearch: true,
  allowClear: true,
  filterOption: filterSelectOption
};
