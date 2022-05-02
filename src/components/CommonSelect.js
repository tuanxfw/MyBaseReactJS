import React, { useState, useMemo } from "react";
import { Select, Spin } from "antd";
import { ObjectUtils } from "utils/ObjectUtils";
import debounce from 'lodash/debounce';

const CommmonSelect = ({ dataRender, funcRender, lazyLoad, ...props }) => {

  const onChangeValue = (value) => {
    if (props.onChange && value !== "all") {
      props.onChange(value);
    }
  }

  const onSelectOption = (value, element) => {
    if (props.onSelect) {
      props.onSelect(value, element?.item);
    }
    if (props.onChange && value === "all") {
      props.onChange(value);
    }
  }

  const selectComponent = () => {
    let options = { ...props };
    options.className = "common-select " + props.className;
    options.onChange = onChangeValue;
    options.onSelect = onSelectOption;

    if (!lazyLoad) {
      return <NormalSelect {...options}>
        {funcRender(dataRender)}
      </NormalSelect>
    }
    else {
      options.filterOption = false;
      options.funcRender = funcRender;
      options.dataRender = dataRender;

      return <LazySelect {...options} />
    }
  };

  return <>
    {selectComponent()}
    {/* <input hidden /> */}
  </>;
};

export default React.memo(CommmonSelect, ObjectUtils.compareProps);

const NormalSelect = (props) => {
  return <Select {...props} />;
};

const LazySelect = ({ dataRender, funcRender, ...props }) => {
  const [r_fetching, r_setFetching] = useState(false);
  const [r_data, r_setData] = useState([]);

  const onSearch = useMemo(() => {
    const loadOptions = async (value) => {
      r_setFetching(true);
      r_setData([]);

      let newData = await dataRender(value);

      r_setFetching(false);
      r_setData(newData);
    };

    return debounce(loadOptions, 1000);
  }, []);

  return <Select
    onSearch={onSearch}
    notFoundContent={r_fetching ? <Spin size="small" /> : null}
    {...props}>
    {funcRender(r_data)}
  </Select>
};

const filterSelectOption = (input, event) => {
  return String(event.value) === "header"
    || String(event.label).toLowerCase().includes(input.toLowerCase())
    || String(event.value).toLowerCase().includes(input.toLowerCase());
};

CommmonSelect.defaultProps = {
  showSearch: true,
  allowClear: true,
  maxTagCount: 'responsive',
  //optionLabelProp: "label",
  //labelInValue: true,
  filterOption: filterSelectOption
};
