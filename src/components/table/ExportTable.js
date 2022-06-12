import React from "react";
import * as XLSX from "xlsx";

const ExportTable = (props) => {

    //#region Event
    const onExport = () => {
        //let ws = fullDataToSheet();
        let ws = fullDataToSheet();

        let wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws);

        XLSX.writeFile(wb, "Data-export.xlsx");
    };
    //#endregion

    //#region Method
    const currentPageDataToSheet = () => {
        const { idTable, columns } = props;

        let headers = columns.map((col) => {
            return col.text;
        });

        let table = document.getElementById(idTable);

        let opts = {
            raw: true
        };

        let ws = XLSX.utils.table_to_sheet(table, opts);
        XLSX.utils.sheet_add_aoa(ws, [headers], { origin: 0 });

        return ws;
    };

    const fullDataToSheet = () => {
        const { columns, data } = props;

        let headers = [];
        for (let i = 0; i < columns.length; i++) {
            const col = columns[i];
            if (!col.isDummyField) {
                headers.push(col.text);
            }
        }

        let opts = {};

        let ws = XLSX.utils.json_to_sheet(data, opts);
        XLSX.utils.sheet_add_aoa(ws, [headers], { origin: 0 });

        return ws;
    };
    //#endregion

    return (
        <>
            <button title={props.title} onClick={onExport}>
                <i className="fa-solid fa-file-export" />
            </button>
        </>
    );
}

export default ExportTable;
