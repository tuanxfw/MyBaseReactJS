import React, { useState, useEffect } from "react";
import {
    Row,
    Col
} from "reactstrap";
import cellEditFactory from 'react-bootstrap-table2-editor';
import { v4 as uuidv4 } from 'uuid';
import { Divider } from 'antd';
import { renderSingleColumnOptions, renderMultipleColumnOptions, renderListString } from "components/selectAntd/CustomOptions";
import CommonTable, { genCellAction, genCellNumber } from 'components/CommonTable';
import CommonButton from "components/CommonButton";

import { DateUtils } from 'utils/DateUtils';

const _ = require('lodash');

const SampleTable = (props) => {

    const [s_columns, s_setColumns] = useState([]);
    const [s_data, s_setData] = useState([{}]);

    const [s_pagingInfo, s_setPagingInfo] = useState({
        total: 1000,
    });

    useEffect(() => { //didmount
        //s_setColumns(columns);
        s_setData(genDataTest());
    }, []);

    let test = () => { };

    const genDataTest = (size = 15, start = 1000) => {
        let data = [];

        for (let index = start; index < start + size; index++) {
            data.push({
                id: "key" + index,
                //id: uuidv4(),
                number: index,
                text: "Hòa hợp Hòa hợp Hòa hợp Hòa hợp Hòa hợp Hòa hợp Hòa hợp Hòa hợp Hòa hợp Hòa hợp Hòa hợp" + index,
                status: index % 2,
                date: index % 2 === 0 ? "22/02/1973" : "15/07/2034",
            });
        }

        return data;
    };

    const columns = [
        {
            isDummyField: true,
            dataField: '#',
            header: '#',
            headerStyle: { width: "50px" },
            cellRender: {
                style: { textAlign: "center" },
            },
        },
        {
            dataField: 'id',
            header: 'ID',
            headerStyle: { width: "60px" },
            cellRender: {
                style: { width: '60px' },
            },
            filter: true,
        },
        {
            isDummyField: true,
            dataField: 'actions',
            header: <i className='fa-solid fa-gear' />,
            headerStyle: { width: "40px" },
            cellRender: {
                function: genCellAction({
                    onInsert: () => { },
                    onUpdate: () => { },
                    onDelete: () => { },
                }),
            }
        },
        {
            dataField: 'number',
            header: 'Number',
            headerStyle: { width: "70px" },
            cellRender: {
                style: { textAlign: "right" },
                function: genCellNumber,
            },
            filter: {
                type: 'number',

            },
            sort: true,
        },
        {
            dataField: 'text',
            header: 'Text',
            headerStyle: { width: "70px" },
            filter: true,
            sort: true,
        },
        {
            dataField: 'status',
            header: 'Status',
            headerStyle: { width: "70px" },
            cellRender: {
                function: (cell, row) => cell === 0 ? <>Chẵn</> : <>Lẻ</>,
            },
            filter: {
                type: 'select',
                advanced: {
                    dataRender: [
                        { value: 0, name: 'Chẵn' },
                        { value: 1, name: 'Lẻ' },
                    ],
                    funcRender: renderSingleColumnOptions('value', 'name'),
                },
            },
            sort: true,
        },
        {
            dataField: 'date',
            header: 'Date',
            headerStyle: { width: "70px" },
            filter: true,
            sort: {
                type: 'date',
                formatDate: "DD/MM/YYYY",
                //function: (obj) => DateUtils.convertStringToDate(obj['date'], "DD/MM/YYYY")
            },
        },
    ];

    return (
        <Row xs={1}>
            <Divider>Table paging client</Divider>
            <Col>
                {/* <button onClick={() => test(2)}>test</button> */}
                <div style={{ width: "100%" }}>
                    <CommonTable
                        //method={({ resetTable, setPage }) => test = setPage}
                        keyField="id" //trường sẽ dùng làm key định danh cho mỗi bản ghi
                        data={s_data}
                        columns={columns}
                        selectRow={{
                            mode: 'checkbox',
                            //selected: [s_data[2]],
                            onSelect: e => console.log(e)
                        }}

                    />
                </div>
            </Col>

            <Divider>Table paging Api</Divider>
            <Col>
                <div style={{ width: "100%" }}>
                    <CommonTable
                        //method={({ resetTable, setPage }) => test = setPage}
                        pagingType="api"
                        onChangeTable={(type, options) => {
                            console.log({ type, options });
                        }}
                        keyField="id" //trường sẽ dùng làm key định danh cho mỗi bản ghi
                        data={s_data}
                        columns={columns}
                        pagingInfo={s_pagingInfo}
                        selectRow={{
                            mode: 'checkbox',
                            //selected: [s_data[2]],
                            onSelect: e => console.log(e)
                        }}

                    />
                </div>
                
            </Col>
        </Row>
    );
}

export default SampleTable;
