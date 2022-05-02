import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';

import CustomDatatable from "components/CustomDatatable";
import CommonButton from "components/CommonButton";

const SampleCustomDatatable = (props) => {

    const [s_columns, s_setColumns] = useState([]);
    const [s_data, s_setData] = useState([]);

    useEffect(() => { //didmount
        s_setColumns(genColumnTest());
        s_setData(genDataTest());
    }, []);

    const genActions = ({cell, row}) => {
        return <div style={{ textAlign: "center" }}>
            <CommonButton type="actionTable">
                <i className="fa-solid fa-eye" />
            </CommonButton>
            <CommonButton type="actionTable">
                <i className="fa-solid fa-plus" />
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

    const genColumnTest = () => {
        return [
            {
                dataField: '#',
                header: '#',
                headerStyle: { width: "350px" }
            },
            {
                dataField: 'actions',
                header: <i className="fa-solid fa-gear" />,
                headerStyle: { width: "350px" },
                cellRender: {
                    style: {},
                    function: genActions, //tự địng nghĩa hàm render cell
                },
            },
            {
                dataField: 'id',
                header: 'ID',
                headerStyle: { width: "350px" },
                cellRender: {
                    style: { textAlign: "center" }
                },
                editCell: {
                    render: ({row, cell, fieldName}) => <input defaultValue={cell}/>
                }
            },
            {
                dataField: 'name',
                header: 'Tên',
                headerStyle: { width: "350px" }
            },
            {
                dataField: 'value',
                header: 'Giá trị',
                headerStyle: { width: "350px" }
            },
        ];
    };

    const genDataTest = (size = 100) => {
        let data = [];
        for (let i = 0; i < size; i++) {
            data.push({
                id: uuidv4(),
                name: "name" + i,
                value: "value" + i,
            });
        }

        return data;
    };


    return (
        <>
            <CustomDatatable
                keyField="id"
                data={s_data}
                columns={s_columns}
            />
            
            {/* <CustomDatatable
                keyField="id"
                data={[]}
                columns={[]}
            /> */}
        </>
    );
}

export default SampleCustomDatatable;
