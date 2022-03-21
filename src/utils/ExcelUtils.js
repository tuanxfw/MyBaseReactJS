import * as XLSX from 'xlsx';

export const ExcelUtils = {
    readXLSX,
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