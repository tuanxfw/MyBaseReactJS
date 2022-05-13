import React from "react";
import { ObjectUtils } from "utils/ObjectUtils";
import { TreeSelect } from "antd";

const { SHOW_ALL, SHOW_PARENT, SHOW_CHILD } = TreeSelect;

const _ = require('lodash');

const CommonTreeSelect = ({
  dataRender,
  funcRender,
  showCheckedStrategy,
  ...props
}) => {

  const onChangeValue = (value) => {
    if (_.isEmpty(value) && props.onChange) {
      props.onChange(value, value);
    }
  };

  const onSelectOption = (value, element) => {
    if (props.onChange) {
      props.onChange(_.toString(value), element?.item);
    }
  };

  return (
    <>
      <TreeSelect
        {...props}
        className="common-tree-select"
        showCheckedStrategy={showCheckedStrategy === "child" ? SHOW_CHILD : showCheckedStrategy === "parent" ? SHOW_PARENT : SHOW_ALL}
        onSelect={onSelectOption}
        onChange={onChangeValue}
      >
        {funcRender(dataRender)}
      </TreeSelect>
    </>
  );
};

//export default CommonTreeSelect;
export default React.memo(CommonTreeSelect, ObjectUtils.compareProps);

const filterTreeNode = (input, event) => {
  //console.log({input, event});
  return String(event.title.props.children)
    .toLowerCase()
    .includes(input.toLowerCase());
};

CommonTreeSelect.defaultProps = {
  showSearch: true,
  allowClear: true,
  maxTagCount: 'responsive',
  treeDefaultExpandAll: false,
  multiple: false,
  treeCheckable: false,
  showCheckedStrategy: "all",
  treeLine: { showLeafIcon: false },
  dropdownStyle: { maxHeight: 400, overflow: "auto" },
  filterTreeNode: filterTreeNode,
  dataRender: [],
  funcRender: () => { },
};

