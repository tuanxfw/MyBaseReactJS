import React, { useState, useEffect } from "react";
import {
    Row,
    Col
} from "reactstrap";
import { renderSingleColumnOptions, renderMultipleColumnOptions, renderListString } from "components/selectAntd/CustomOptions";
import CommonTable from 'components/CommonTable';
import CommonButton from "components/CommonButton";

const SampleTable = (props) => {

    const [s_columns, s_setColumns] = useState([]);
    const [s_data, s_setData] = useState([]);

    useEffect(() => { //didmount
        const columns = [
            {
                dataField: '#', // dataFile === "#" cột index, mặc định sẽ cột này = index row
                header: '#',
                headerStyle: { width: "50px" },
                cellRender: {
                    style: { textAlign: "center" },
                },
            },
            {
                dataField: 'actions',
                header: <i className="fa-solid fa-gear" />,
                headerStyle: { width: "160px" },
                cellRender: {
                    function: genActions,
                },
            },
            {
                dataField: 'number',
                header: 'Số',
                headerStyle: { width: "200px" },
                filter: {
                    type: "number"
                },
                sort: {},
                cellRender: {
                    style: { textAlign: "right" }
                },
                //visible: false,
                //footer: 'Footer 3',
            },
            {
                dataField: 'text',
                header: 'Chữ',
                headerStyle: { width: "200px" },
                filter: {
                    type: "text"
                },
                sort: {},
            },
            {
                dataField: 'status',
                header: 'Trạng thái',
                headerStyle: { width: "200px" },
                filter: {
                    type: "select",
                    advanced: {
                        dataRender: [{ value: 0, name: "Chẵn" }, { value: 1, name: "Lẻ" }],
                        funcRender: renderSingleColumnOptions("value", "value", "name"),
                    }
                },
                cellRender: {
                    function: (cell, row, rowIndex) => cell === 0 ? <>Chẵn</> : <>Lẻ</>
                },
            },
            {
                dataField: 'date',
                header: 'Ngày',
                headerStyle: { width: "200px" },
                filter: {
                    type: "datetime",
                },
                sort: {
                    type: "date",
                    formatDate: "DD/MM/YYYY"
                },
            }
        ];

        s_setColumns(columns);
        s_setData(genData());
    }, []);

    const genActions = (cell, row, rowIndex) => {
        return <div style={{ textAlign: "center"}}>
            <CommonButton type="actionTable">
                <i className="fa-solid fa-eye" />
            </CommonButton>
            <CommonButton type="actionTable">
                <i className="fa-solid fa-plus" />
            </CommonButton>
            <CommonButton type="actionTable">
                <i className="fa-regular fa-pen-to-square" />
            </CommonButton>
            <CommonButton type="actionTable" disabled>
                <i className="fa-regular fa-trash-can" />
            </CommonButton>
        </div>;
    };

    const genData = () => {
        let data = [];

        for (let index = 0; index < 1000; index++) {
            data.push({
                number: index,
                text: "text" + index,
                status: index % 2,
                date: index % 2 === 0 ? "22/02/1973" : "15/07/2034",
            });
        }

        return data;
    }


    return (
        <Row>
            <Col>
                <CommonTable
                    keyField="number"
                    data={s_data}
                    columns={s_columns}
                    watch
                    pagingType="client" />
            </Col>
        </Row>
    );
}

export default SampleTable;
