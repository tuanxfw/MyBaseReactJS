import React, { useState } from "react";
import {
    Row,
    Col,
} from "reactstrap";
import CommonSelect from "components/CommonSelect";
import CommonLabel from 'components/CommonLabel';
import CommonValidTooltip from 'components/CommonValidTooltip';

import { renderSingleColumnOptions, renderMultipleColumnOptions, renderListString } from "components/selectAntd/CustomOptions";

const SampleSelect = (props) => {

    const testList = [
        { key: "1", name: "Name1", value: "Value1 123123 123 123 123 13 123123 1231232 12312312 312312 3" },
        { key: "2", name: "Name2", value: "Value2"  },
        { key: "3", name: "Name3", value: "Value3"  },
    ];

    const [s_testList, s_setTestList] = useState(testList);

    return (
        <Row xs={3}>
            <Col>
                <CommonLabel>{"Gen list string"}</CommonLabel>
                <CommonValidTooltip>{"Lỗi gì đó"}</CommonValidTooltip>
                <CommonSelect
                    onChange={(e) => console.log(e)}
                    dataRender={["1", "2", "3"]}
                    funcRender={renderListString()} />
            </Col>

            <Col>
                <CommonLabel>{"Gen collection with single col"}</CommonLabel>
                <CommonValidTooltip></CommonValidTooltip>
                <CommonSelect
                    onChange={(e) => console.log(e)}
                    dataRender={testList}
                    funcRender={renderSingleColumnOptions("value", "key", "name")} />
            </Col>

            <Col>
                <CommonLabel>{"Gen collection with multiple col"}</CommonLabel>
                <CommonValidTooltip>{""}</CommonValidTooltip>
                <CommonSelect
                    onChange={(e) => console.log(e)}
                    dataRender={s_testList}
                    funcRender={renderMultipleColumnOptions("value", "key", ["key", "name", "value"], ["Mã", "Tên", "Giá trị"])} />
            </Col>
        </Row>
    );
}

export default SampleSelect;
