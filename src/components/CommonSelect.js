import React from "react";
import { Select } from "antd";

const CommmonSelect = (props) => {

  const onChangeValue = (e) => {
    if (props.onChange) {
      props.onChange(e || "");
    }
  }

  return <>
    <Select
      className={"common-select " + props.className}
      {...props}
      onChange={onChangeValue}
    />
  </>;
};

export default CommmonSelect;

const filterSelectOption = (input, event) => {
  return String(event.key).toLowerCase().includes(input.toLowerCase())
  || String(event.label).toLowerCase().includes(input.toLowerCase())
  || String(event.value).toLowerCase().includes(input.toLowerCase());
};

CommmonSelect.defaultProps = {
  showSearch: true,
  allowClear: true,
  filterOption: filterSelectOption
};
