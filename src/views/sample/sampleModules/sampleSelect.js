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

    const genTestList = (size = 100) => {
        console.log(size);
        let result = [];

        for (let i = 0; i < size; i++) {
            result.push({ key: "key" + i, name: "Name" + i, value: "Value" + i  });
        }

        return result;
    };

    const [s_testList, s_setTestList] = useState(genTestList());

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
                    dataRender={s_testList} 
                    mode="multiple"
                    funcRender={renderSingleColumnOptions("value", "name")} />
            </Col>

            <Col>
                <CommonLabel>{"Gen collection with multiple col"}</CommonLabel>
                <CommonValidTooltip>{""}</CommonValidTooltip>
                <CommonSelect
                    onChange={(e) => console.log(e)}
                    dataRender={s_testList}
                    funcRender={renderMultipleColumnOptions("value", ["key", "name", "value"], ["Mã", "Tên", "Giá trị"])} />
            </Col>

            <Col>
                <CommonLabel>{"Lazy select rest api"}</CommonLabel>
                <CommonValidTooltip></CommonValidTooltip>
                <CommonSelect
                    lazyLoad
                    onChange={(e) => console.log(e)}
                    dataRender={genTestList} //function rest api, param = value search
                    funcRender={renderSingleColumnOptions("value", "name")} 
                    />
            </Col>
        </Row>
    );
}

export default SampleSelect;
