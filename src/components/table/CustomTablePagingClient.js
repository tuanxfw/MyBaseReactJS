import React, { useState, useRef, useEffect } from "react";
import { withTranslation } from "react-i18next";
import { Pagination } from "antd";
import { v4 as uuidv4 } from 'uuid';
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider from 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit';
import { StringUtils } from 'utils/StringUtils';
import ToggleColumnsTable from "./ToggleColumnsTable";
import ExportTable from "./ExportTable";

const _ = require('lodash');

const CustomTablePagingClient = ({
    baseOptions: p_baseOptions,
    pagingConfig: p_pagingConfig,
    resetTable: p_resetTable,
    ...props
}) => {
    const { t } = props;

    const ref_filters = useRef({});
    const ref_sorts = useRef({});

    const [s_dataAfterSort, s_setDataAfterSort] = useState([]);
    const [s_dataAfterFilter, s_setDataAfterFilter] = useState([]);
    const [s_dataAfterPaging, s_setDataAfterPaging] = useState([]);

    //#region useEffect
    useEffect(() => {
        let dataAfterSort = sort(p_baseOptions.data, ref_sorts.current);
        s_setDataAfterSort(dataAfterSort);
    }, [p_baseOptions.data]);

    useEffect(() => {
        let dataAfterFilter = filter(s_dataAfterSort, ref_filters.current);
        s_setDataAfterFilter(dataAfterFilter);
    }, [s_dataAfterSort]);

    useEffect(() => {
        const { current, pageSize } = p_pagingConfig;

        let dataAfterPadding = _.slice(
            s_dataAfterFilter,
            current * pageSize - pageSize,
            current * pageSize
        );

        s_setDataAfterPaging(dataAfterPadding);

    }, [s_dataAfterFilter, p_pagingConfig.current, p_pagingConfig.pageSize]);

    //#endregion

    //#region Method
    const filter = (data, filters) => {
        let dataAfterFilter = data;
        for (const dataField in filters) {
            const { filterVal } = filters[dataField];
            const { value, matchMode } = filterVal;

            if (filterVal.function) {
                dataAfterFilter = filterVal.function(dataAfterFilter, value, matchMode);
            }
            else {
                dataAfterFilter = _.filter(dataAfterFilter, obj => StringUtils.compareString(value, obj[dataField], matchMode));
            }

        }

        return dataAfterFilter;
    };

    const sort = (data, sorts) => {
        if (_.isEmpty(sorts)) {
            return data;
        }

        let { sortField, sortOrder, sortFunc } = sorts;
        let dataAfterSort = data;

        let iteratees = sortFunc(sortField);
        dataAfterSort = _.orderBy(dataAfterSort, [iteratees], [sortOrder]);

        return dataAfterSort;
    };
    //#endregion

    //#region Event
    const onTableChange = (type, options) => {
        let { page, sizePerPage, filters, sortField, sortOrder, cellEdit } = options;

        let data = s_dataAfterSort;

        let dataAfterFilter;
        if (type === "filter") {
            p_pagingConfig.onChange(1, p_pagingConfig.pageSize);
            ref_filters.current = filters;

            dataAfterFilter = filter(data, ref_filters.current);
            s_setDataAfterFilter(dataAfterFilter);
        };

        let dataAfterSort;
        if (type === "sort") {
            let column = _.find(p_baseOptions.columns, obj => obj.dataField === sortField);
            ref_sorts.current = { sortField, sortOrder, sortFunc: column.sortFunc };

            dataAfterSort = sort(s_dataAfterSort, ref_sorts.current);
            s_setDataAfterSort(dataAfterSort);
        }


    };

    //#endregion


    return (
        <>
            <ToolkitProvider
                keyField={p_baseOptions.keyField}
                data={s_dataAfterPaging}
                columns={p_baseOptions.columns}
                columnToggle
                exportCSV
            >
                {
                    propsToolkit => (
                        <>
                            <BootstrapTable
                                {...props}
                                remote={{ filter: true, sort: true }}
                                onTableChange={onTableChange}
                                {...propsToolkit.baseProps}
                            />
                            <div className="common-datatable-paging client">
                                <div className="total-field">
                                    <span>
                                        {s_dataAfterFilter.length}{t("commonDatatable:record")}
                                    </span>
                                </div>
                                <Pagination
                                    total={s_dataAfterFilter.length}
                                    {...p_pagingConfig}
                                />
                                <div className="action-field">
                                    <button type="button" title={t("commonDatatable:resetFilterAndSort")} onClick={() => p_resetTable()}>
                                        <i className="fa-solid fa-arrows-rotate"/>
                                    </button>
                                    <ToggleColumnsTable
                                        title={t("commonDatatable:visibleColumn")}
                                        {...propsToolkit.columnToggleProps}
                                    />
                                    <ExportTable
                                        title={t("commonDatatable:exportExcel")}
                                        idTable={props.id}
                                        columns={propsToolkit.baseProps.columns}
                                        data={s_dataAfterFilter}
                                    />
                                </div>
                            </div>
                        </>
                    )
                }

            </ToolkitProvider>
        </>
    );
}

export default withTranslation(["common", "commonDatatable"])(CustomTablePagingClient);
