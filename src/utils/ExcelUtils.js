import * as XLSX from 'xlsx';

export const ExcelUtils = {
    readXLSX,
    writeXLSX,
};

function writeXLSX(inputData) {
    const { data, headers, fileName, options } = inputData;

    let ws = XLSX.utils.json_to_sheet(data, options);
    XLSX.utils.sheet_add_aoa(ws, [headers], { origin: 0 });

    let wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws);

    XLSX.writeFile(wb, fileName);
};

function readXLSX(file, callBackFunc, config = {}){
    try {
        const reader = new FileReader();
        reader.onload = () => {
            getDataFromXLSX(reader.result, callBackFunc, config);
        };
        reader.readAsBinaryString(file);
    } catch (error) {
        callBackFunc([]);
        console.log(error);
    }
}

function getDataFromXLSX (data, callBackFunc, config)  {
    const workbook = XLSX.read(data, {type: 'binary'});
    const sheet = workbook.SheetNames[0];
    const excelRows = XLSX.utils.sheet_to_json(
        workbook.Sheets[sheet],
        config
    );

    //return excelRows;
    callBackFunc(excelRows);
}