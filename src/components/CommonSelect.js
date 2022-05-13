import React, {forwardRef, useState, useMemo } from "react";
import { Select, Checkbox, Spin } from "antd";
import { ObjectUtils } from "utils/ObjectUtils";
import debounce from 'lodash/debounce';
import PropTypes from "prop-types";

const _ = require('lodash');

const CommmonSelect = forwardRef(({ dataRender, funcRender, lazyLoad, checkAll, ...props}, ref) => {

  const [s_isCheckAll, s_setIsCheckAll] = useState(false);

  const onChangeValue = (value, options) => {
    if (props.onChange && value !== "all") {
      props.onChange(value, options?.item);
    }

    if (props.mode === "multiple") {
      value.length === dataRender.length ? s_setIsCheckAll(true) : s_setIsCheckAll(false);;
    }
  };

  const onCheckAll = (e) => {
    let fieldValue = _.toString(checkAll);

    if (!props.onChange || fieldValue === "" || _.isEmpty(dataRender)) {
      return;
    }

    if (e.target.checked) {
      props.onChange(_.map(dataRender, obj => String(obj[fieldValue])), dataRender);

      s_setIsCheckAll(true);
    }
    else {
      props.onChange([], []);

      s_setIsCheckAll(false);
    }

  };

  const selectComponent = () => {
    let options = { ...props };
    options.className = "common-select " + props.className;
    options.onChange = onChangeValue;

    if (options.mode === "multiple" && !options.dropdownRender && checkAll) {
      options.dropdownRender = (menu) => <>
          {menu}
          <div className="common-select-check-all">
              <Checkbox checked={s_isCheckAll} onChange={onCheckAll}>Chọn tất cả</Checkbox>
          </div>
      </>;
  }

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
  </>;
});

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
  filterOption: filterSelectOption
};

CommmonSelect.propTypes = {
  showSearch: PropTypes.bool,
  allowClear: PropTypes.bool,
  dataRender: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.func
  ]),
  filterOption: PropTypes.func,
  funcRender: PropTypes.func,
  onChange: PropTypes.func,
  value: PropTypes.any,
  mode: PropTypes.oneOf(['single', 'multiple']),
  checkAll: PropTypes.string,
  disabled: PropTypes.bool
};