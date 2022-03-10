import React, { useState } from "react";
import {
    Row,
    Col,
} from "reactstrap";
import CommonDatePicker from "components/CommonDatePicker";
import CommonLabel from 'components/CommonLabel';
import CommonValidTooltip from 'components/CommonValidTooltip';

const SampleDatepicker = (props) => {
    const [s_valueDatePicker, s_setValueDatePicker] = useState({});

    return (
        <Row xs={4}>
            <Col>
                <CommonLabel>{"Time"}</CommonLabel>
                <CommonValidTooltip>{"Lỗi gì đó"}</CommonValidTooltip>
                <CommonDatePicker
                    typePicker="time"
                    onChange={(value) => {
                        console.log(value);
                        s_setValueDatePicker({ ...s_valueDatePicker, ...{ time: value } });
                    }}
                    value={s_valueDatePicker["time"]} />
            </Col>

            <Col>
                <CommonLabel>{"Date"}</CommonLabel>
                <CommonValidTooltip>{""}</CommonValidTooltip>
                <CommonDatePicker
                    typePicker="date"
                    onChange={(value) => {
                        console.log(value);
                        s_setValueDatePicker({ ...s_valueDatePicker, ...{ date: value } });
                    }}
                    value={s_valueDatePicker["date"]} />
            </Col>

            <Col>
                <CommonLabel>{"Datetime"}</CommonLabel>
                <CommonValidTooltip>{""}</CommonValidTooltip>
                <CommonDatePicker
                    typePicker="datetime"
                    onChange={(value) => {
                        console.log(value);
                        s_setValueDatePicker({ ...s_valueDatePicker, ...{ datetime: value } });
                    }}
                    value={s_valueDatePicker["datetime"]} />
            </Col>

            <Col>
                <CommonLabel>{"Week"}</CommonLabel>
                <CommonValidTooltip>{""}</CommonValidTooltip>
                <CommonDatePicker
                    typePicker="week"
                    onChange={(value) => {
                        console.log(value);
                        s_setValueDatePicker({ ...s_valueDatePicker, ...{ week: value.weekYear } });
                    }}
                    value={s_valueDatePicker["week"]}
                />
            </Col>

            <Col>
                <CommonLabel>{"Month"}</CommonLabel>
                <CommonValidTooltip>{""}</CommonValidTooltip>
                <CommonDatePicker
                    typePicker="month"
                    onChange={(value) => {
                        console.log(value);
                        s_setValueDatePicker({ ...s_valueDatePicker, ...{ month: value.monthYear } });
                    }}
                    value={s_valueDatePicker["month"]} />
            </Col>

            <Col>
                <CommonLabel>{"Quarter"}</CommonLabel>
                <CommonValidTooltip>{""}</CommonValidTooltip>
                <CommonDatePicker
                    typePicker="quarter"
                    onChange={(value) => {
                        console.log(value);
                        s_setValueDatePicker({ ...s_valueDatePicker, ...{ quarter: value.quarterYear } });
                    }}
                    value={s_valueDatePicker["quarter"]} />
            </Col>

            <Col>
                <CommonLabel>{"Year"}</CommonLabel>
                <CommonValidTooltip>{""}</CommonValidTooltip>
                <CommonDatePicker
                    typePicker="year"
                    onChange={(value) => {
                        console.log(value);
                        s_setValueDatePicker({ ...s_valueDatePicker, ...{ year: value.year } });
                    }}
                    value={s_valueDatePicker["year"]} />
            </Col>
        </Row>
    );
}

export default SampleDatepicker;
