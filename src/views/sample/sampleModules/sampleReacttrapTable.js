import React, { useState, useEffect } from "react";
import { Input, Pagination } from "antd";
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, { textFilter, customFilter } from 'react-bootstrap-table2-filter';
import paginationFactory, { PaginationProvider } from 'react-bootstrap-table2-paginator';
import CommonInputNumber from 'components/CommonInputNumber';
import { DateUtils } from "utils/DateUtils";

const _ = require('lodash');

const SampleReacttrapTable = (props) => {

    const [s_columns, s_setColumns] = useState([]);
    const [s_data, s_setData] = useState([]);

    useEffect(() => { //didmount
        const columns = [{
            dataField: 'id',
            text: 'Product ID'
        }, {
            dataField: 'name',
            text: 'Product Name',
            filter: textFilter()
        }, {
            dataField: 'price',
            text: 'Product Price',
            filter: customFilter(),
            // filterRenderer: (onFilter, column) =>
            //     <PriceFilter onFilter={onFilter} column={column} />
        }];

        s_setColumns(columns);
        s_setData(genDataTest());
    }, []);

    const genDataTest = (size = 50) => {
        let data = [];

        for (let index = 0; index < size; index++) {
            data.push({
                id: "key" + index,
                //id: uuidv4(),
                number: index,
                text: "text" + index,
                status: index % 2,
                date: index % 2 === 0 ? "22/02/1973" : "15/07/2034",
            });
        }

        return data;
    };

    const fnFilter = (fieldName) => (filterVal, data) => {
        if (filterVal) {
            return _.filter(data, row => _.toString(row[fieldName]).includes(_.toString(filterVal)));
        }
        return data;
    };

    const getFilter = (onFilter) => {
        let handleFilter = (e) => {
            onFilter(e?.target?.value ?? e);
        }

        return _.debounce(handleFilter, 700);
    };

    const columns = [
        {
            dataField: '#',
            text: '#',
        },
        {
            dataField: 'id',
            text: 'ID',
            headerFormatter: (column, colIndex) => <div style={{ textAlign: "center" }}>{column.text}</div>
        },
        {
            dataField: 'actions',
            text: 'Actions',
        },
        {
            dataField: 'number',
            text: 'Number',
            filter: customFilter({
                onFilter: fnFilter("number")
            }),
            sort: true,
            sortFunc: (a, b, order, dataField) => {
                let result;
                if (order === 'asc') {
                    result = b - a;
                }
                else {
                    result = a - b; // desc
                }

                console.log(result);
                return result;
            },
            filterRenderer: (onFilter, column) => <CommonInputNumber allowClear onChange={getFilter(onFilter)} />
        },
        {
            dataField: 'text',
            text: 'Text',
            filter: customFilter(),
            filterRenderer: (onFilter, column) => <Input allowClear onChange={getFilter(onFilter)} />
        },
        {
            dataField: 'status',
            text: 'Status',
        },
        {
            dataField: 'date',
            text: 'Date',
            sort: true,
            sortCaret: (order, column) => {
                if (!order) return (<span>&nbsp;&nbsp;Desc/Asc</span>);
                else if (order === 'asc') return (<span>&nbsp;&nbsp;Desc/<font color="red">Asc</font></span>);
                else if (order === 'desc') return (<span>&nbsp;&nbsp;<font color="red">Desc</font>/Asc</span>);
                return null;
            },
            sortFunc: (a, b, order, dataField) => {
                let result;
                if (order === 'asc') {
                    result = DateUtils.dateDiff(b, a, "DD/MM/YYYY", "seconds");
                }
                else {
                    result = DateUtils.dateDiff(a, b, "DD/MM/YYYY", "seconds");
                }
                return result >= 0 ? 1 : -1;
            },

        },
    ];

    const handleNextPage = ({ page, onPageChange }) => () => {
        onPageChange(page + 1);
    };

    const handlePrevPage = ({ page, onPageChange }) => () => {
        onPageChange(page - 1);
    };

    const handleSizePerPage = ({ page, onSizePerPageChange }, newSizePerPage) => () => {
        onSizePerPageChange(newSizePerPage, page);
    };

    return (
        <>
            <PaginationProvider pagination={paginationFactory({ custom: false }) }>
                {
                    ({
                        paginationProps,
                        paginationTableProps
                    }) => (
                        <div>
                            <div>
                                <div>
                                    <p>Current Page: {paginationProps.page}</p>
                                    <p>Current SizePerPage: {paginationProps.sizePerPage}</p>
                                </div>
                                <div className="btn-group" role="group">
                                    <button className="btn btn-success" onClick={handlePrevPage(paginationProps)}>Prev Page</button>
                                    <button className="btn btn-primary" onClick={handleNextPage(paginationProps)}>Next Page</button>

                                    <button className="btn btn-danger" onClick={handleSizePerPage(paginationProps, 10)}>Size Per Page: 10</button>
                                    <button className="btn btn-warning" onClick={handleSizePerPage(paginationProps, 25)}>Size Per Page: 25</button>
                                </div>
                            </div>
                            <BootstrapTable
                                keyField='id' //remote
                                data={s_data}
                                loading={ true }
                                columns={columns}
                                filterPosition="top"
                                filter={filterFactory()}
                                selectRow={{
                                    mode: 'checkbox',
                                    clickToSelect: true,
                                    onSelect: (e) => console.log(e),
                                    selectionHeaderRenderer: () => <input type="checkbox"/>,
                                    //selectionHeaderRenderer: (e) => console.log("selectionHeaderRenderer", e),
                                    //selectionRenderer: (e) => console.log("selectionRenderer", e),
                                }}
                                {...paginationTableProps}
                            />
                        </div>
                    )
                }

            </PaginationProvider>

        </>
    );
}

export default SampleReacttrapTable;
