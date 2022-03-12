import React, { useState, useEffect } from "react";
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
import { renderSingleColumnOptions, renderMultipleColumnOptions, renderListString } from "components/selectAntd/CustomOptions";
import CustomTableNoPaging from "components/table/CustomTableNoPaging";
import CustomTablePagingApi from "components/table/CustomTablePagingApi";
import CustomTablePagingClient from "components/table/CustomTablePagingClient";
import { ObjectUtils } from "utils/ObjectUtils";
import { DateUtils } from 'utils/DateUtils';

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

    const [s_pagingInfo, s_setPagingInfo] = useState({ current: 1, pageSize: AppConstants.DATATABLE.PAGE_SIZE_DEFAULT });

    const optionsMatchMode = [
        {//like
            value: "{str}",
            name: "%%",
        },
        {//==
            value: "^{str}$",
            name: "==",
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

    var g_filterConidtion = {};
    var g_mathMode = {};
    var g_sortCondition = {};
    var g_dataSelected = [];

    useEffect(() => { //trigger when p_pagingConfig change
        if (p_pagingConfig) {
            s_setPagingInfo(p_pagingConfig);
        }
    }, [p_pagingConfig])

    useEffect(() => {
        console.log({g_filterConidtion});
    });;

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
                cellRender.function = genRowIndex(s_pagingInfo.current, s_pagingInfo.pageSize);
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
                    <Col key={uuidv4()}>
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

        switch (g_sortCondition[column.dataField]) {
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
            return <button
                key={uuidv4()}
                className="btn-sort"
                name="btnSortTable"
                data-info={JSON.stringify({
                    fieldName: column.dataField,
                })}
            >
                <i disabled className={icon} />
            </button>;
        }

        return null;
    };

    const genHeaderName = (header) => {
        return <h6 className="header-text">{header}</h6>
    };

    const genFilter = (column, filter) => {

        if (!filter) {
            return null;
        }

        let defaultMatchMode = g_mathMode[column.dataField] || optionsMatchMode[0].value;
        let defaultConditionFilter = g_filterConidtion[column.dataField] || filter?.advanced?.defaultValue || "";

        let filterComponent = null;
        switch (filter.type) {
            case "number":
                filterComponent = <>
                    <CommonSelect
                        style={{ width: "60px" }}
                        defaultValue={defaultMatchMode}
                        allowClear={false} showSearch={false}
                        onChange={(value) => buildMathMode(column.dataField, value)}
                        dataRender={optionsMatchMode}
                        funcRender={renderSingleColumnOptions("value", "value", "name")} />
                    <CommonInputNumber
                        key={uuidv4()}
                        style={{ width: "calc(100% - 42px - 60px)" }}
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

            case "datetime":
                filterComponent = <CommonDatePicker
                    key={uuidv4()}
                    style={{ width: "calc(100% - 42px)" }}
                    onChange={(value) => buildFilterCondition(column.dataField, value)}
                    defaultValue={defaultConditionFilter}
                    {...filter.advanced} />
                break;

            default: //text
                filterComponent = <>
                    <CommonSelect
                        style={{ width: "60px" }}
                        defaultValue={defaultMatchMode}
                        allowClear={false} showSearch={false}
                        onChange={(value) => buildMathMode(column.dataField, value)}
                        dataRender={optionsMatchMode}
                        funcRender={renderSingleColumnOptions("value", "value", "name")} />
                    <Input
                        style={{ width: "calc(100% - 42px - 60px)" }}
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

    const genRowIndex = (currentPage, pageSize) => (cell, row, rowIndex) => <>{(currentPage - 1) * pageSize + rowIndex + 1}</>

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
    const onSelectRow = (keyField, mode, callBackFunc) => (row, isSelect, rowIndex, e) => {
        let dataSelected = [...g_dataSelected];

        let result = [];

        if (mode === "radio") {
            dataSelected = [row[keyField]]
            result = [row];
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

            result = _.filter(props.data, (obj) => dataSelected.indexOf(obj[keyField]) !== -1);
        }

        g_dataSelected = dataSelected;

        if (callBackFunc) {
            callBackFunc(result, rowIndex, row, isSelect, e);
        }
    };

    const onSelectAllRow = (mode, callBackFunc) => (isSelect, rows, e) => {
        if (!isSelect) {
            g_dataSelected = [];
        }
    };

    const onChangePaging = (current, pageSize) => {
        s_setPagingInfo({ current, pageSize });
    };
    //#endregion

    //#region Method 
    const buildFilterCondition = (field, value) => {
        let filterCondition = { ...g_filterConidtion };

        if (!value || value.trim() === "") {
            delete filterCondition[field];
        }
        else {
            filterCondition[field] = value;
        }

        g_filterConidtion = filterCondition;

        if (p_watch) console.log(g_filterConidtion);
    };

    const buildMathMode = (field, value) => {
        let mathMode = { ...g_mathMode };

        mathMode[field] = value;

        g_mathMode = mathMode;

        if (p_watch) console.log(g_mathMode);
    };

    const buildSortCondition = (field) => {
        let sortCondition = { ...g_sortCondition };

        if (sortCondition[field]) {
            sortCondition[field] = sortCondition[field] === "asc" ? "desc" : "asc";
        }
        else {
            sortCondition[field] = "asc";
        }

        g_sortCondition = sortCondition;
        //g_sortCondition = { [field]: sortCondition[field] };

        if (p_watch) console.log(g_sortCondition);
    };

    const filter = (data) => {
        let dataAfterFilter = [...data];

        const lstField = _.keys(g_filterConidtion);
        lstField.map((field) => {

            let col = _.find(props.columns, { dataField: field }) || {};

            let mathMode = "";
            if (col?.filter?.type === "select" || col?.filter?.type === "date") {
                mathMode = "^{str}$"; //==
            }
            else {
                mathMode = g_mathMode[field] || optionsMatchMode[0].value;
            }

            const findString = mathMode.replaceAll("{str}", g_filterConidtion[field]);
            const regex = new RegExp(findString, 'i'); //i: không biệt hoa thường

            if (col?.filter?.function) {
                dataAfterFilter = col?.filter?.function(dataAfterFilter, g_filterConidtion[field]);
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

        const iteratees = _.keys(g_sortCondition);
        const orders = _.values(g_sortCondition);

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

    const resetFilterAndSort = () => {
        g_filterConidtion = {};
        g_mathMode = {};
        g_sortCondition = {};
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
    //#endregion

    const selectTable = () => {
        let options = { ...props };

        options.columns = [...options.columns];
        options.columns = genColumnObject(options.columns);

        if (!options.id) options.id = uuidv4();

        options.funcFeature = {
            filter: filter,
            sort: sort,
            changeVisibleCol: changeVisibleCol,
            resetFilterAndSort: resetFilterAndSort,
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
                selected: options.selectRow?.clickToSelect?.selected || [],
                onSelect: onSelectRow(props.keyField, options.selectRow.mode, options.selectRow?.onSelect),
                onSelectAll: onSelectAllRow(props.keyField, options.selectRow?.onSelect),
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