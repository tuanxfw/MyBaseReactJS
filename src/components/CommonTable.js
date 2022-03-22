import React, { useState, useEffect, useRef } from "react";
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import { Col, Row } from "reactstrap";
import { Input, Button } from "antd";
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import { App as AppConstants } from "constants/Constants"
import CommonButton from 'components/CommonButton';
import CommonInputNumber from 'components/CommonInputNumber';
import CommonSelect from 'components/CommonSelect';
import CommonDatePicker from 'components/CommonDatePicker';
import CommonTooltip from 'components/CommonTooltip';
import { renderSingleColumnOptions } from "components/selectAntd/CustomOptions";
import CustomTableNoPaging from "components/table/CustomTableNoPaging";
import CustomTablePagingApi from "components/table/CustomTablePagingApi";
import CustomTablePagingClient from "components/table/CustomTablePagingClient";
import { ObjectUtils } from "utils/ObjectUtils";
import { DateUtils } from 'utils/DateUtils';
import { Trans } from "translation/i18n";

const _ = require('lodash');

const CommonTable = ({
    pagingType: p_pagingType,
    pagingConfig: p_pagingConfig,
    watch: p_watch,
    ...props
}) => {
    const sampleDataColumn = [
        {
            dataField: "", //tên trường
            header: "",
            headerStyle: {},

            cellRender: { //không cần custom cell thì có thể bỏ
                style: {}, //style cho cell, không cần thì có thể bỏ
                function: (cell, row, rowIndex) => { }, //hàm render (không cần custom thì có thể bỏ) 
            },

            filter: {
                type: "text", //loại element filter text/number/select/date
                advanced: {}, //cấu hình đặc biệt cho element filter (không cần có thể bỏ)
                function: (data, condition) => { }, //trong trường hợp muốn custom hàm filter (không cần có thể bỏ) 
            },
            sort: { //(không cần có thể bỏ)
                type: "text", // text/number/date (type = text hoặc number có thể bỏ qua)
                formatDate: "DD/MM/YYYY", //formart date của trường cần date cần sort, chỉ áp dụng cho sort.type: date
                function: (row) => { }, //trong trường hợp muốn custom hàm sort (không cần có thể bỏ) 
            },
            visible: true,
            editor: null,
        }
    ];

    const optionsMatchMode = [
        {//like
            value: "{str}",
            name: "%%",
        },
        {//==
            value: "^{str}$",
            name: "==",
        },
        {//!=
            value: "^((?!{str}).)*$",
            name: "!=",
        },
        {//start
            value: "^{str}",
            name: "%.",
        },
        {//end
            value: "{str}$",
            name: ".%",
        },
    ];

    const [s_pagingInfo, s_setPagingInfo] = useState({ current: 1, pageSize: AppConstants.DATATABLE.PAGE_SIZE_DEFAULT });

    let ref_idTable = useRef(props.id || uuidv4());
    let ref_filterConidtion = useRef({});
    let ref_mathMode = useRef({});
    let ref_sortCondition = useRef({});
    let ref_dataSelected = useRef([]);

    //#region useEffect
    useEffect(() => { //trigger when p_pagingConfig change
        if (p_pagingConfig) {
            s_setPagingInfo(p_pagingConfig);
        }
    }, [p_pagingConfig]);

    useEffect(() => { //trigger when props.data or props.columns change
        return () => { //before changeS
            resetTable();
            s_setPagingInfo({ current: 1, pageSize: AppConstants.DATATABLE.PAGE_SIZE_DEFAULT });
        };
    }, [props.data, props.columns]);
    //#endregion

    //#region Gen component
    const genColumnObject = (data) => {
        let columnsData = [...data];

        if (columnsData.length === 0) {
            columnsData = [
                {
                    dataField: '',
                    header: ''
                }
            ];
        }

        const columns = columnsData.map((item) => {
            const { header, sort, filter, cellRender, ...col } = item;

            if (col.dataField === "#") {
                cellRender.function = genRowIndex;
            }

            if (typeof header === "string") {
                col.text = header;
            }
            else {
                col.text = col.dataField;
            }

            col.headerFormatter = () => <>
                <Row key={uuidv4()} className="header-column" xs={1}>
                    {genSort(col, sort)}
                    <Col key={uuidv4()} className="header-field">
                        {genHeaderName(header)}
                    </Col>
                    <Col key={uuidv4()} onKeyDown={onFilter}>
                        {genFilter(col, filter)}
                    </Col>
                </Row>
            </>;

            col.formatter = (cell, row, rowIndex) => <CommonTooltip className="cell">
                {genCellContent(cell, row, rowIndex, cellRender)}
            </CommonTooltip>;

            if (col.visible === undefined) col.visible = true;

            return col;
        });

        return columns;
    };

    const genSort = (column, sort) => {

        let icon = "fa-solid fa-sort";

        switch (ref_sortCondition.current[column.dataField]) {
            case "desc":
                icon = "fa-solid fa-arrow-down-wide-short";
                break;

            case "asc":
                icon = "fa-solid fa-arrow-down-short-wide";
                break;

            default:
                break;
        }

        if (sort) {
            return <Button
                key={uuidv4()}
                className="btn-sort"
                name="btnSortTable"
                data-info={JSON.stringify({
                    fieldName: column.dataField,
                })}
            >
                <i disabled className={icon} />
            </Button>;
        }

        return null;
    };

    const genHeaderName = (header) => {
        return <h6 className="header-text">{header}</h6>
    };

    const genHeaderGroup = (idTable, newHeaderGroup, columns) => {
        let oldHeaderGroup = document.evaluate(`//*[@id="${idTable}"]/thead/tr[@class="headerGroup"]`, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

        if (oldHeaderGroup) {
            for (let i = 0; i < oldHeaderGroup.snapshotLength; i++) {
                oldHeaderGroup.snapshotItem(i).remove();
            }
        }

        if (newHeaderGroup) {
            let header = document.evaluate(`//*[@id="${idTable}"]/thead/tr`, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
            header.insertAdjacentHTML('beforebegin', newHeaderGroup);

            let table = document.evaluate(`//*[@id="${idTable}"]`, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue; //.offsetWidth
            table.style.tableLayout = "auto";

            let lstWidthCol = [];
            columns.map((col) => {
                lstWidthCol.push(col?.headerStyle?.width || "350px");
            });

            table.style.width = `calc(${lstWidthCol.join(' + ')})`;
        }
        else {
            let table = document.evaluate(`//*[@id="${idTable}"]`, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue; //.offsetWidth
            table.style.tableLayout = "fixed";
            table.style.width = "100%";
        }
    };

    const genFilter = (column, filter) => {

        if (!filter) {
            return null;
        }

        let defaultMatchMode = ref_mathMode.current[column.dataField] || optionsMatchMode[0].value;
        let defaultConditionFilter = ref_filterConidtion.current[column.dataField] || filter?.advanced?.defaultValue || "";

        let filterComponent = null;
        let styleMatchMode = {};
        let styleCondition = {};

        switch (filter.type) {
            case "number":
                styleMatchMode = { width: "60px" };
                styleCondition = { width: "calc(100% - 42px - 60px)" };

                if (filter.function) {
                    styleMatchMode = { display: "none" };
                    styleCondition = { width: "calc(100% - 42px)" };
                };

                filterComponent = <>
                    <CommonSelect
                        style={styleMatchMode}
                        defaultValue={defaultMatchMode}
                        allowClear={false} showSearch={false}
                        onChange={(value) => buildMathMode(column.dataField, value)}
                        dataRender={optionsMatchMode}
                        funcRender={renderSingleColumnOptions("value", "name")} />
                    <CommonInputNumber
                        key={uuidv4()}
                        style={styleCondition}
                        allowClear
                        onChange={(values) => buildFilterCondition(column.dataField, String(values.floatValue || ""))}
                        defaultValue={defaultConditionFilter}
                        {...filter.advanced} />
                </>
                break;

            case "select":
                filterComponent = <CommonSelect
                    key={uuidv4()}
                    style={{ width: "calc(100% - 42px)" }}
                    onChange={(value) => buildFilterCondition(column.dataField, value)}
                    defaultValue={defaultConditionFilter}
                    {...filter.advanced} />
                break;

            case "date":
                filterComponent = <CommonDatePicker
                    key={uuidv4()}
                    style={{ width: "calc(100% - 42px)" }}
                    onChange={(value) => buildFilterCondition(column.dataField, value)}
                    defaultValue={defaultConditionFilter}
                    {...filter.advanced} />
                break;

            default: //text
                styleMatchMode = { width: "60px" };
                styleCondition = { width: "calc(100% - 42px - 60px)" };

                if (filter.function) {
                    styleMatchMode = { display: "none" };
                    styleCondition = { width: "calc(100% - 42px)" };
                };

                filterComponent = <>
                    <CommonSelect
                        style={styleMatchMode} id="testSelect"
                        defaultValue={defaultMatchMode}
                        allowClear={false} showSearch={false}
                        onChange={(value) => buildMathMode(column.dataField, value)}
                        dataRender={optionsMatchMode}
                        funcRender={renderSingleColumnOptions("value", "name")} />
                    <Input
                        style={styleCondition}
                        key={uuidv4()}
                        onChange={(e) => buildFilterCondition(column.dataField, e.target.value)}
                        allowClear
                        defaultValue={defaultConditionFilter}
                        {...filter.advanced} />
                </>
                break;
        }

        return <Input.Group key={uuidv4()} compact className="filter-field">
            {filterComponent}
            <CommonButton
                key={uuidv4()}
                style={{ width: "42px" }}
                type="icon"
                name="btnFilterTable"
            >
                <i key={uuidv4()} className="fa-solid fa-magnifying-glass" />
            </CommonButton>
        </Input.Group>
    };

    const genCellContent = (cell, row, rowIndex, cellRender) => {
        if (cellRender?.function) {
            return <div style={cellRender?.style}>{cellRender.function(cell, row, rowIndex)}</div>;
        }

        return <div style={cellRender?.style}>{cell}</div>;
    };

    const genRowIndex = (cell, row, rowIndex) => <>{(s_pagingInfo.current - 1) * s_pagingInfo.pageSize + rowIndex + 1}</>;

    const genItemPaging = (page, type, element) => {
        let resultElement = null;

        switch (type) {//'page' | 'prev' | 'next' | 'jump-prev' | 'jump-next'

            case "prev":
                resultElement = <Button className="ant-pagination-item-link">
                    <i className="fa-solid fa-backward" />
                </Button>;
                break;

            case "next":
                resultElement = <Button className="ant-pagination-item-link">
                    <i className="fa-solid fa-forward" />
                </Button>;
                break;

            default:
                resultElement = element;
                break;
        }

        return resultElement;
    };

    //#endregion

    //#region Event
    const onSelectRow = (mode, callBackFunc) => (row, isSelect, rowIndex, e) => {
        const keyField = props.keyField;

        let dataSelected = [...ref_dataSelected.current];

        let rowsSelected = [];

        if (mode === "radio") {
            dataSelected = [row[keyField]]
            rowsSelected = [row];
        }
        else {
            let key = row[keyField];

            if (isSelect) {
                dataSelected.push(key);
            }
            else {
                dataSelected = _.remove(dataSelected, (item) => item !== key);
                //dataSelected = dataSelected.splice(rowIndex, 1);
            };

            rowsSelected = _.filter(props.data, (obj) => dataSelected.indexOf(obj[keyField]) !== -1);
        }

        ref_dataSelected.current = dataSelected;

        if (callBackFunc) {
            callBackFunc({ rowsSelected, rowIndex, e });
        }
    };

    const onSelectAllRow = (mode, callBackFunc) => (isSelect, rows, e) => {
        const keyField = props.keyField;

        let keySelected = [];
        let rowsSelected = [];

        if (!isSelect) {
            keySelected = [];
            rowsSelected = [];
        }
        else {
            keySelected = _.map(props.data, keyField);
            rowsSelected = [...props.data];
        }

        ref_dataSelected.current = keySelected;

        if (callBackFunc) {
            callBackFunc({ rowsSelected, e });
        }
    };

    const onChangePaging = (current, pageSize) => {
        s_setPagingInfo({ current, pageSize });
    };

    const onFilter = (e) => {
        if (e.code === "Enter" || e.code === "NumpadEnter") {
            document.getElementById(`btnFilter-${ref_idTable.current}`).click();
        }   
    };
    //#endregion

    //#region Method 
    const buildFilterCondition = (field, value) => {
        let filterCondition = { ...ref_filterConidtion.current };

        if (!value || value.trim() === "") {
            delete filterCondition[field];
        }
        else {
            filterCondition[field] = value;
        }

        ref_filterConidtion.current = filterCondition;

        if (p_watch) console.log(ref_filterConidtion.current);
    };

    const buildMathMode = (field, value) => {
        let mathMode = { ...ref_mathMode.current };

        mathMode[field] = value;

        ref_mathMode.current = mathMode;

        if (p_watch) console.log(ref_mathMode.current);
    };

    const buildSortCondition = (field) => {
        let sortCondition = { ...ref_sortCondition.current };

        if (sortCondition[field]) {
            sortCondition[field] = sortCondition[field] === "asc" ? "desc" : "asc";
        }
        else {
            sortCondition[field] = "asc";
        }

        ref_sortCondition.current = sortCondition;
        //ref_sortCondition.current = { [field]: sortCondition[field] };

        if (p_watch) console.log(ref_sortCondition.current);
    };

    const filter = (data) => {
        let dataAfterFilter = [...data];

        const lstField = _.keys(ref_filterConidtion.current);
        lstField.map((field) => {

            let col = _.find(props.columns, { dataField: field }) || {};

            let mathMode = "";
            if (col?.filter?.type === "select" || col?.filter?.type === "date") {
                mathMode = "^{str}$"; //==
            }
            else {
                mathMode = ref_mathMode.current[field] || optionsMatchMode[0].value;
            }

            const findString = mathMode.replaceAll("{str}", ref_filterConidtion.current[field]);
            const regex = new RegExp(findString, 'i'); //i: không biệt hoa thường

            if (col?.filter?.function) {
                dataAfterFilter = col?.filter?.function(dataAfterFilter, ref_filterConidtion.current[field], field);
            }
            else {
                dataAfterFilter = _.filter(dataAfterFilter, (obj) => {
                    return regex.test(obj[field]);
                });
            }

        });

        return dataAfterFilter;
    };

    const sort = (fieldName, data) => {
        if (fieldName) buildSortCondition(fieldName);

        let dataAfterSort = [];

        const iteratees = _.keys(ref_sortCondition.current);
        const orders = _.values(ref_sortCondition.current);

        props.columns.map((col) => {
            if (col.sort?.function) {
                let indexIteratees = _.indexOf(iteratees, col.dataField);
                iteratees[indexIteratees] = col.sort?.function;
            }
            else {
                switch (col.sort?.type) {
                    case "date":
                        let indexIteratees = _.indexOf(iteratees, col.dataField);
                        iteratees[indexIteratees] = (obj) => DateUtils.convertStringToDate(obj[fieldName], col.sort?.formatDate)
                        break;

                    default:
                        break;
                }
            }
        });

        dataAfterSort = _.orderBy(data, iteratees, orders);

        return dataAfterSort;
    };

    const resetTable = () => {
        ref_filterConidtion.current = {};
        ref_mathMode.current = {};
        ref_sortCondition.current = {};
        ref_dataSelected.current = [];
    };

    const changeVisibleCol = (lstCol, colName, visible) => {
        const index = _.findIndex(lstCol, { dataField: colName });

        let countVisibleCol = _.countBy(lstCol, { visible: true }).true;

        if (countVisibleCol === 1 && visible === false) {
            return lstCol;
        }

        let lstColNew = [...lstCol];
        lstColNew[index] = { ...lstColNew[index] };

        lstColNew[index].visible = visible;

        return lstColNew;
    };

    const getListSelectdKey = (data) => {
        return _.map(data, props.keyField);
    };

    //#endregion

    const selectTable = () => {
        let options = { ...props };

        options.columns = [...options.columns];
        options.columns = genColumnObject(options.columns);

        options.id = ref_idTable.current;
        //options.cellEdit = cellEditFactory({ mode: 'click' });

        //options.striped = true;
        options.condensed = true;
        options.hover = true;
        options.noDataIndication = <Trans ns="commonDatatable" name="commonDatatable:empty" />;
        options.classes = "table-custom";

        options.funcFeature = {
            genHeaderGroup: genHeaderGroup,
            filter: filter,
            sort: sort,
            changeVisibleCol: changeVisibleCol,
            resetFilterAndSort: resetTable,
        };

        const pagingConfigDefault = {
            showSizeChanger: true,
            showLessItems: true,
            responsive: true,
            itemRender: genItemPaging,
            pageSizeOptions: AppConstants.DATATABLE.PAGE_SIZE_OPTIONS,
            current: s_pagingInfo.current,
            pageSize: s_pagingInfo.pageSize,
            onChange: onChangePaging,
        };
        const pagingConfigCustom = p_pagingConfig;

        let configSelect = undefined;
        if (options?.selectRow) {

            let configSelectCustom = { ...options.selectRow };
            let configSelectDefault = {
                clickToSelect: options.selectRow?.clickToSelect || true,
                clickToEdit: true,
                selected: options.selectRow?.selected ? getListSelectdKey(options.selectRow?.selected) : ref_dataSelected.current,
                onSelect: onSelectRow(options.selectRow.mode, options.selectRow?.onChangeSelected),
                onSelectAll: onSelectAllRow(options.selectRow.mode, options.selectRow?.onChangeSelected),
                classes: 'selection-row',
            }

            configSelect = { ...configSelectCustom, ...configSelectDefault };
        }
        options.selectRow = configSelect;

        switch (p_pagingType) {
            case "none":
                return <CustomTableNoPaging {...options} />

            case "api":
                options.pagingConfig = { ...pagingConfigDefault, ...pagingConfigCustom };
                return <CustomTablePagingApi {...options} />

            default: //client
                options.pagingConfig = { ...pagingConfigDefault, ...pagingConfigCustom };
                return <CustomTablePagingClient {...options} />
        }
    };

    return (
        <div className="common-datatble">
            <style>
                {`
                    .react-bootstrap-table {
                        max-height: ${props.scrollHeight};
                    }
                `}
            </style>
            {selectTable()}
        </div>
    );
}

export default React.memo(CommonTable, ObjectUtils.compareProps);
//export default CommonTable;

//#region Gen Body function
export const genColDateChangeFormatDateString = (fromFormat, toFormat = AppConstants.DATE_TIME_FORMAT.DATE_FORMAT) => (cell, row, rowIndex) => {
    return <>{DateUtils.changeFormatDateString(cell, fromFormat, toFormat)}</>;
};
//#endregion

//#region Filter function
export const filterDateStringByString = (fromFormat, toFormat) => (data, condition, field) => {
    let result = [];

    try {
        result = _.filter(
            data,
            (obj) => DateUtils.changeFormatDateString(obj[field], fromFormat, toFormat).includes(condition)
        );
    } catch (error) {
        console.log(error);
        result = [];
    }

    return result;
};
//#endregion

CommonTable.propTypes = {
    keyField: PropTypes.string,
    data: PropTypes.array,
    columns: PropTypes.array,
};

CommonTable.defaultProps = {
    data: [],
    columns: [],
    scrollHeight: "500px",
    //pagingConfig: {},
};