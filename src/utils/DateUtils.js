import moment from "moment";

export const DateUtils = {
    convertStringToDate,
    convertDateToString,
    changeFormatDateString,
    dateDiff,
    getDayOfWeek,
    getDayOfMonth
};

function convertStringToDate (value, format) {
    if(value === null || value === undefined){
        return null;
    }

    return moment(value, format);
}

function convertDateToString (value, format) {
    if(value === null || value === undefined){
        return null;
    }

    return moment(value).format(format);
}

/* 
value: giá trị date dạng string,
fromFormart: format hiện tại của value
toFormat: format muốn đổi thành
*/
function changeFormatDateString (value, fromFormart, toFormat) {
    if(value === null || value === undefined){
        return null;
    }
    
    return moment(moment(value, fromFormart)).format(toFormat);
}

/* 
date1 date2: string,
format: định dạng của date1 và date2 
typeRsult: loại giá trị trả vể, 1 trong các loại sau: days | months | years | hours | minutes | seconds 
isFloat: Lấy cả phần thập phân
Kết quả trả về là date1 - date2
*/
function dateDiff (date1, date2, format, typeRsult, isFloat = false) {
    if(date1 === null || date1 === undefined || date2 === null || date2 === undefined){
        return null;
    }
    
    let valueDate1 = convertStringToDate(date1, format);
    let valueDate2 = convertStringToDate(date2, format);

    return valueDate1.diff(valueDate2, typeRsult, isFloat);
}

//d: Mon | Tue | Wed | Thu | Fri | Sat | Sun
//w: tuần
//y: năm
//Trả về ngày dạng string theo formatDate
function getDayOfWeek (d, w, y, formatDate) {
    const dayName = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];

    let indexDay = dayName.indexOf(String(d).toLowerCase());

    const currentMoment = moment();
    if (currentMoment.locale() === "vi") {
        indexDay = indexDay + 1;
    }

    const day = moment(`${w}-${y}`, "ww-YYYY").day(indexDay);

    return convertDateToString (day, formatDate);
}

//d: số thự tự của ngày trong tháng
//w: tuần
//y: năm
//Trả về ngày dạng string theo formatDate
function getDayOfMonth (d, m, y, formatDate) {
    let lastDay = moment(m + '-' + y, 'MM/YYYY').daysInMonth();

    if (Number(d) > lastDay) {
        d = lastDay;
    }

    let reuslt = moment(d + '/' + m + '/' + y, 'DD/MM/YYYY');
    
    return convertDateToString (reuslt, formatDate);
}
