import React, { useState, useEffect, useRef } from "react";
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import { Col, Row } from "reactstrap";
import { Input, Button, Checkbox } from "antd";
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import filterFactory, { customFilter } from 'react-bootstrap-table2-filter';
import { Action as ActionConst, App as AppConstants } from "constants/Constants";
import CommonButton from 'components/CommonButton';
import CommonInputNumber from 'components/CommonInputNumber';
import CommonSelect from 'components/CommonSelect';
import CommonDatePicker from 'components/CommonDatePicker';
import CommonTooltip from 'components/CommonTooltip';
// import CustomTableNoPaging from "components/table/CustomTableNoPaging";
// import CustomTablePagingApi from "components/table/CustomTablePagingApi";
import CustomTablePagingClient from "components/table/CustomTablePagingClient";
import CustomTablePagingApi from "components/table/CustomTablePagingApi";
import filterTable from "components/table/FilterTable";
import { ObjectUtils } from "utils/ObjectUtils";
import { DateUtils } from 'utils/DateUtils';
import { StringUtils } from 'utils/StringUtils';
import { NumberUtils } from 'utils/NumberUtils';
import i18n from "translation/i18n";

const _ = require('lodash');

const FilterText = filterTable(Input);
const FilterNumber = filterTable(CommonInputNumber);
const FilterSelect = filterTable(CommonSelect);
const FilterDate = filterTable(CommonDatePicker);

const CommonTable = ({
    pagingType: p_pagingType,
    pagingConfigDefault: p_pagingConfigDefault,
    size: p_size,
    pagingInfo: p_pagingInfo,
    onTableChange: p_onTableChange,
    ...props
}) => {

    const [s_pagingInfo, s_setPagingInfo] = useState({
        current: 1,
        pageSize: AppConstants.DATATABLE.PAGE_SIZE_DEFAULT,
        pageSizeOptions: AppConstants.DATATABLE.PAGE_SIZE_OPTIONS,
        ...p_pagingConfigDefault
    });

    const [s_tableIdentify, s_setTableIdentify] = useState({ id: props.id || uuidv4(), key: uuidv4() });

    const ref_selectedKey = useRef([]);

    //#region useEffect

    //#endregion

    //#region method
    const resetTable = () => {
        s_setPagingInfo(prev => {
            let next = { ...prev };

            next.current = 1;

            return next;
        });

        let newIdentify = { ...s_tableIdentify };
        newIdentify.key = uuidv4();

        s_setTableIdentify(newIdentify);
    };

    const setPage = (page) => {
        s_setPagingInfo(prev => {
            let next = { ...prev };

            next.current = page;

            return next;
        });
    };
    //#endregion

    //#region genMethod
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
            const { header, cellRender, filter, sort, ...col } = item;

            if (col.dataField === "#") {
                cellRender.function = genRowIndex;
            }

            if (typeof header === "string") {
                col.text = header;
            } else {
                col.text = col.dataField;
            }

            if (filter) {
                col.filter = customFilter();
                col.filterRenderer = genFilter(filter);
            }

            if (sort) {
                col.sort = true;
                col.headerSortingClasses = (column, sortOrder, isLastSorting, colIndex) => sortOrder === 'asc' ? 'sorting-asc' : 'sorting-desc';
                //col.sortFunc = sort.function;
                col.sortFunc = gentSortFunction(sort);
            }

            col.headerFormatter = () => <div className="header-filed">
                {header}
                {col.sort === true ? <>
                    <i className="sort-icon none fa-solid fa-sort" />
                    <i className="sort-icon asc fa-solid fa-arrow-down-short-wide" />
                    <i className="sort-icon desc fa-solid fa-arrow-down-wide-short" />
                </> : null}
            </div>;

            col.formatter = (cell, row, rowIndex, formatExtra) => formatExtra(cell, row, rowIndex);
            col.formatExtraData = (cell, row, rowIndex) => <CommonTooltip key={uuidv4()} className="cell">
                {genCellContent(cell, row, rowIndex, cellRender)}
            </CommonTooltip>;


            return col;
        });

        return columns;
    };

    const genFilter = (filterOptions) => (onFilter, column) => {
        let options = { onFilter, column };
        options.filterOptions = filterOptions;

        let component = null;

        switch (filterOptions?.type) {
            case "select":
                component = <FilterSelect {...options} />
                break;

            case "date":
                component = <FilterDate {...options} />
                break;

            case "number":
                component = <FilterNumber {...options} />
                break;

            default: //text
                component = <FilterText  {...options} />
                break;
        };

        return <div className="filter-field">
            {component}
        </div>;
    };

    const gentSortFunction = (sortOptions) => (sortField) => {
        let iteratees = null;

        if (sortOptions.function) {
            return sortOptions.function;
        }

        switch (sortOptions.type) {
            case "date":
                iteratees = (obj) => DateUtils.convertStringToDate(obj[sortField], sortOptions?.formatDate)
                break;

            default:
                iteratees = sortField;
                break;
        }

        return iteratees;
    };

    const genCellContent = (cell, row, rowIndex, cellRender) => {
        if (cellRender?.function) {
            return <div key={uuidv4()} style={cellRender?.style}>{cellRender.function(cell, row, rowIndex)}</div>;
        }

        return <div key={uuidv4()} style={cellRender?.style}>{cell}</div>;
    };

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

    const genRowIndex = (cell, row, rowIndex) => ((s_pagingInfo.current - 1) * s_pagingInfo.pageSize + rowIndex + 1);

    const genConfigSelectRow = (config) => {

        if (!config) {
            return null;
        }

        const { selected, onSelect, ...customConfig } = config;

        ref_selectedKey.current = selected ? _.map(selected, props.keyField) : ref_selectedKey.current;

        const defaultConfig = {
            selected: ref_selectedKey.current,
            hideSelectColumn: false,
            clickToSelect: true,
            clickToEdit: true,
            hideSelectAll: config.mode !== "checkbox",
            classes: () => "selection-row",
            selectionHeaderRenderer: ({ indeterminate, mode, checked }) => {
                return <input
                    type="checkbox"
                    ref={(input) => {
                        if (input) {
                            input.indeterminate = props.data.length !== ref_selectedKey.current.length && ref_selectedKey.current.length > 0
                            input.checked = props.data.length === ref_selectedKey.current.length;
                        };
                    }}
                />;
            },
            onSelect: (row, isSelect, rowIndex, e) => {
                let selectedKey = [...ref_selectedKey.current];

                if (isSelect) {
                    selectedKey.push(row[props.keyField]);
                }
                else {
                    selectedKey = _.remove(selectedKey, key => key !== row[props.keyField]);
                }

                ref_selectedKey.current = selectedKey;

                if (onSelect) {
                    onSelect({
                        rowsSelected: _.filter(props.data, obj => selectedKey.indexOf(obj[props.keyField]) !== -1),
                        row,
                        event: e
                    });
                }
            },
            onSelectAll: (isSelect, rows, e) => {
                let selectedKey = [];

                if (isSelect) {
                    selectedKey = _.map(props.data, props.keyField);
                }
                else {
                    selectedKey = [];
                }

                ref_selectedKey.current = selectedKey;

                if (onSelect) {
                    onSelect({
                        rowsSelected: isSelect ? props.data : [],
                        row: null,
                        event: e
                    });
                }
            },
        };

        return { ...defaultConfig, ...customConfig };
    };

    //#endregion

    //#region Event
    const onPagingChange = (current, pageSize) => {
        let pagingInfo = { ...s_pagingInfo };

        pagingInfo.current = current;
        pagingInfo.pageSize = pageSize;

        s_setPagingInfo(pagingInfo);
    };

    //#endregion

    const selectTable = () => {
        let { keyField, data, columns, method, ...options } = props;

        let baseOptions = { keyField, data, columns }

        baseOptions.columns = genColumnObject(baseOptions.columns);

        options.key = s_tableIdentify.key;
        options.id = s_tableIdentify.id;
        options.striped = true;
        options.condensed = true;
        options.hover = true;
        options.noDataIndication = i18n.t("commonDatatable:empty");
        options.classes = "table-custom";
        options.rowClasses = "custom-row";
        options.filterPosition = "top";
        options.filter = filterFactory();
        options.pagingConfig = {
            itemRender: genItemPaging,
            className: "page-filed",
            showSizeChanger: true,
            showLessItems: true,
            responsive: true,
        };
        options.selectRow = genConfigSelectRow(options.selectRow);


        switch (p_pagingType) {
            case "api":
                method({ resetTable, setPage });

                options.onTableChange = p_onTableChange;
                options.pagingConfig = {
                    ...options.pagingConfig,
                    onChange: onPagingChange,
                    ...s_pagingInfo,
                    ...p_pagingInfo,
                };
                options.resetTable = resetTable;

                return <CustomTablePagingApi baseOptions={baseOptions} {...options} />

            default: //client
                method({ resetTable, setPage });

                options.pagingConfig = {
                    ...options.pagingConfig,
                    onChange: onPagingChange,
                    ...s_pagingInfo,
                };
                options.resetTable = resetTable;

                return <CustomTablePagingClient baseOptions={baseOptions} {...options} />
        }
    };

    return (
        <div id={"field-table-" + s_tableIdentify.id} className="common-datatble">
            <style>
                {`
                    #field-table-${s_tableIdentify.id} .react-bootstrap-table {
                        max-height: ${p_size.scrollHeight};
                        height: ${p_size.height || "auto"};
                    }
                `}
            </style>
            {selectTable()}
        </div>
    );
}

export default React.memo(CommonTable, ObjectUtils.compareProps);
//export default CommonTable;


//#endregion

CommonTable.propTypes = {
    keyField: PropTypes.string,
    data: PropTypes.array,
    columns: PropTypes.array,
    size: PropTypes.object,
    pagingConfig: PropTypes.object,
    onTableChange: PropTypes.func,
    method: PropTypes.func,
    pagingType: PropTypes.oneOf(['api', 'client']),
};

CommonTable.defaultProps = {
    method: () => { },
    pagingType: 'client',
    data: [],
    columns: [],
    size: {
        scrollHeight: "600px",
        height: "auto",
    },
    selectRow: {
        mode: 'radio',
        hideSelectColumn: true,
        onSelect: e => { },
    },
};


//#region gen cell funtion
export const genCellAction = (options = {}) => (cell, row) => {
    // {
    //     onView: null,
    //     onInsert: null,
    //     onUpdate: null,
    //     onDelete: null,
    // }

    return <div key={uuidv4()} style={{ textAlign: "center" }}>

        {options?.onView ? <CommonButton
            key={uuidv4()}
            type="actionTable"
            action={ActionConst.VIEW}
            title={i18n.t("common:button.view")}
            onClick={options.onView(row)}
        >
            <i key={uuidv4()} className="fa-solid fa-eye" />
        </CommonButton> : <></>}

        {options?.onInsert ? <CommonButton
            key={uuidv4()}
            type="actionTable"
            action={ActionConst.INSERT}
            title={i18n.t("common:button.insert")}
            onClick={options.onInsert(row)}
        >
            <i key={uuidv4()} className="fa-solid fa-plus" />
        </CommonButton> : <></>}

        {options?.onClone ? <CommonButton
            key={uuidv4()}
            type="actionTable"
            action={ActionConst.INSERT}
            title={i18n.t("common:button.clone")}
            onClick={options.onClone(row)}
        >
            <i key={uuidv4()} className="fa-solid fa-copy" />
        </CommonButton> : <></>}

        {options?.onUpdate ? <CommonButton
            key={uuidv4()}
            type="actionTable"
            action={ActionConst.UPDATE}
            title={i18n.t("common:button.update")}
            onClick={options.onUpdate(row)}
        >
            <i key={uuidv4()} className="fa-regular fa-pen-to-square" />
        </CommonButton> : <></>}

        {options?.onDelete ? <CommonButton
            key={uuidv4()}
            type="actionTable"
            action={ActionConst.DELETE}
            title={i18n.t("common:button.delete")}
            onClick={options.onDelete(row)}
        >
            <i key={uuidv4()} className="fa-regular fa-trash-can" />
        </CommonButton> : <></>}

    </div>
};

export const genCellNumber = (cell, row) => NumberUtils.formatToNumberString(cell);

export const genCellDate = (fromFormat, toFormat) => (cell, row) => DateUtils.changeFormatDateString(cell, fromFormat, toFormat);

//#endregion

