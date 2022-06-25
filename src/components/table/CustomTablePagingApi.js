import React, { useState, useRef, useEffect } from "react";
import { withTranslation } from "react-i18next";
import { Pagination } from "antd";
import { v4 as uuidv4 } from 'uuid';
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider from 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit';
import ToggleColumnsTable from "./ToggleColumnsTable";
import ExportTable from "./ExportTable";

const _ = require('lodash');

const CustomTablePagingApi = ({
    baseOptions: p_baseOptions,
    pagingConfig: p_pagingConfig,
    resetTable: p_resetTable,
    onChangeTable: p_onChangeTable,
    ...props
}) => {
    const { t } = props;

    //#endregion useEffect
    useEffect(() => {
        const { current, pageSize } = p_pagingConfig;

        onTableChange("pageChange", {});
    }, [_.toString(p_pagingConfig?.current), _.toString(p_pagingConfig?.pageSize)]);
    //#endregion

    //#region Method

    //#endregion

    //#region Event
    const onTableChange = (type, options) => {
        //let { page, sizePerPage, filters, sortField, sortOrder, cellEdit } = options;

        const { current, pageSize } = p_pagingConfig;
        options.page = current;
        options.sizePerPage = pageSize;
        
        p_onChangeTable(type, options);
    };

    //#endregion

    return (
        <>
            <ToolkitProvider
                keyField={p_baseOptions.keyField}
                data={p_baseOptions.data}
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
                                        {p_pagingConfig.total}{t("commonDatatable:record")}
                                    </span>
                                </div>
                                <Pagination {...p_pagingConfig} />
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
                                        data={propsToolkit.baseProps.data}
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

export default withTranslation(["common", "commonDatatable"])(CustomTablePagingApi);
