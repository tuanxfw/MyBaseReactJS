import React, { useState, useEffect } from "react";
import {
    Row,
    Col
} from "reactstrap";
import cellEditFactory from 'react-bootstrap-table2-editor';
import { v4 as uuidv4 } from 'uuid';
import { Divider } from 'antd';
import { renderSingleColumnOptions, renderMultipleColumnOptions, renderListString } from "components/selectAntd/CustomOptions";
import CommonTable, { genColDateChangeFormatDateString, filterDateStringByString } from 'components/CommonTable';
import CommonButton from "components/CommonButton";
import { NumberUtils } from 'utils/NumberUtils';

const _ = require('lodash');

const SampleTable = (props) => {

    const [s_columns, s_setColumns] = useState([]);
    const [s_data, s_setData] = useState([]);

    const [s_pagingInfo, s_setPagingInfo] = useState({
        current: 1,
        pageSize: 50
    });

    useEffect(() => { //didmount
        const columns = [
            {// dataFile === "#" cột index, mặc định sẽ cột này = index row
                dataField: '#',
                header: '#',
                headerStyle: { width: "50px" },
                cellRender: {
                    style: { textAlign: "center" },
                },
                editable: false,
            },

            {
                dataField: 'actions',
                header: <i className="fa-solid fa-gear" />,
                headerStyle: { width: "160px" },
                cellRender: {
                    function: genActions, //tự địng nghĩa hàm render cell
                },
                editable: false,
            },
            {
                dataField: 'number',
                header: 'Số',
                headerStyle: { width: "350px" },
                filter: {
                    type: "number"
                },
                sort: {},
                cellRender: {
                    style: { textAlign: "right" },
                    function: (cell, row, rowIndex) => NumberUtils.formatToNumberString(cell) //format number
                },
                //visible: false, //trong trường hợp muốn ẩn cột
                //footer: 'Footer 3', // trong trường hợp muốn tạo footer table
                // editorRenderer: (editorProps, value, row, column, rowIndex, columnIndex) => { //render componet edit cell
                //     console.log({editorProps, value, row, column, rowIndex, columnIndex});
                //     return <input onBlur={(e) => console.log(e)}/>;
                // }
            },
            {
                dataField: 'text',
                header: 'Chữ',
                headerStyle: { width: "350px" },
                filter: {
                    type: "text"
                },
                sort: {},
            },
            {
                dataField: 'status',
                header: 'Trạng thái',
                headerStyle: { width: "350px" },
                filter: {
                    type: "select",
                    advanced: {
                        dataRender: [{ value: 0, name: "Chẵn" }, { value: 1, name: "Lẻ" }],
                        funcRender: renderSingleColumnOptions("value", "name"),
                    }
                },
                cellRender: {
                    function: (cell, row, rowIndex) => cell === 0 ? <>Chẵn</> : <>Lẻ</>
                },
            },
            {
                dataField: 'date',
                header: 'Ngày',
                headerStyle: { width: "350px" },
                filter: {
                    type: "date",
                    //type: "text",
                    //function: filterDateStringByString("DD/MM/YYYY", "MM/DD/YYYY"), //tự định nghĩa hàm filter 
                },
                // cellRender: {
                //     function: genColDateChangeFormatDateString("DD/MM/YYYY", "MM/DD/YYYY") //đổi định dạng format từ "DD/MM/YYYY" => "MM/DD/YYYY"
                // },
            }
        ];

        s_setColumns(columns);
        s_setData(genDataTest());
    }, []);

    const genActions = (cell, row, rowIndex) => {
        return <div style={{ textAlign: "center" }}>
            <CommonButton type="actionTable">
                <i className="fa-solid fa-eye" />
            </CommonButton>
            <CommonButton type="actionTable">
                <i className="fa-regular fa-copy" />
            </CommonButton>
            <CommonButton type="actionTable">
                <i className="fa-regular fa-pen-to-square" />
            </CommonButton>
            <CommonButton type="actionTable" disabled>
                <i className="fa-regular fa-trash-can" />
            </CommonButton>
        </div>;
    };

    const genDataTest = (size = 1000001) => {
        let data = [];

        for (let index = 999000; index < size; index++) {
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

    const onChangePaging = (current, pageSize) => {
        s_setPagingInfo({ current, pageSize });
    };

    return (
        <Row>
            <Divider>Table paging client</Divider>
            <Col>
                <div style={{width: "100%"}}>
                    <CommonTable
                        keyField="id" //trường sẽ dùng làm key định danh cho mỗi bản ghi
                        pagingType="client"//mặc định = client
                        scrollHeight="600px" //chiều cao table, mặc định = 500px
                        // headerGroup={`
                        // <tr class='headerGroup'>
                        //     <th colspan="7">Nhóm</th>
                        // </tr>
                        // `}
                        data={s_data}
                        columns={s_columns}
                        selectRow={{
                            mode: 'checkbox', //checkbox hoặv radio
                            //selected: [{ id: "key0", number: 0, text: "text0", status: 0, date: "22/02/1973" }], //dùng trong trường hợp muốn chỉ định selected row
                            onChangeSelected: (e) => console.log(e),
                        }}
                    // cellEdit={cellEditFactory({ 
                    //     mode: 'dbclick',
                    // })}
                    />
                </div>
            </Col>

            {/* <Divider>Table paging api</Divider>
            <Col>
                <CommonTable
                    keyField="id"
                    pagingType="api"
                    data={s_data}
                    columns={s_columns}
                    pagingConfig={{ //bắt buộc phải có ít nhất các tham số sau nếu dùng phân trang api
                        total: 10000, //tổng số bản ghi 
                        current: s_pagingInfo.current, //trang hiện tại
                        pageSize: s_pagingInfo.pageSize, //kích thước 1 trang
                        onChange: onChangePaging, //hàm handle sự kiện thay đổi page number hoặc page size
                    }}
                />
            </Col>

            <Divider>Table no paging</Divider>
            <Col>
                <CommonTable
                    keyField="id"
                    pagingType="none"
                    data={s_data}
                    columns={s_columns}
                />
            </Col> */}
        </Row>
    );
}

export default SampleTable;
