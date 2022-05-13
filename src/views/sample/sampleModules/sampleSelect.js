import React, { useState } from "react";
import { Row, Col } from "reactstrap";
import CommonSelect from "components/CommonSelect";
import CommonTreeSelect from "components/CommonTreeSelect";
import CommonTree from "components/CommonTree";
import CommonLabel from "components/CommonLabel";
import CommonValidTooltip from "components/CommonValidTooltip";

import {
  renderSingleColumnOptions,
  renderMultipleColumnOptions,
  renderListString,
  renderTreeOptions,
} from "components/selectAntd/CustomOptions";

const SampleSelect = (props) => {
  const genTestList = (size = 100) => {
    console.log(size);
    let result = [];

    for (let i = 0; i < size; i++) {
      result.push({ key: "key" + i, name: "Name" + i, value: "Value" + i });
    }

    return result;
  };

  const [s_testList, s_setTestList] = useState(genTestList());

  const dataTree = [
    {
      name: "Node 1",
      value: "Node1",
      child: [
        {
          name: "Node 1.1",
          value: "Node1.1",
        },
        {
          name: "Node 1.2",
          value: "Node1.2",
        },
      ],
    },
    {
      name: "Node 2",
      value: "Node2",
    },
  ];

  return (
    <Row xs={3}>
      <Col>
        <CommonLabel>{"Gen list string"}</CommonLabel>
        <CommonValidTooltip>{"Lỗi gì đó"}</CommonValidTooltip>
        <CommonSelect
          onChange={(e) => console.log(e)}
          dataRender={["1", "2", "3"]}
          funcRender={renderListString()}
        />
      </Col>

      <Col>
        <CommonLabel>{"Gen collection with single col"}</CommonLabel>
        <CommonValidTooltip></CommonValidTooltip>
        <CommonSelect
          onChange={(e) => console.log(e)}
          dataRender={s_testList}
          mode="multiple"
          funcRender={renderSingleColumnOptions("value", "name")}
        />
      </Col>

      <Col>
        <CommonLabel>{"Gen collection with multiple col"}</CommonLabel>
        <CommonValidTooltip>{""}</CommonValidTooltip>
        <CommonSelect
          onChange={(value, option) => console.log({value, option})}
          dataRender={s_testList}
          funcRender={renderMultipleColumnOptions(
            "value",
            ["key", "name", "value"],
            ["Mã", "Tên", "Giá trị"]
          )}
        />
      </Col>

      <Col>
        <CommonLabel>{"Lazy select"}</CommonLabel>
        <CommonValidTooltip></CommonValidTooltip>
        <CommonSelect
          lazyLoad
          onChange={(e) => console.log(e)}
          dataRender={genTestList} //function rest api, param = value search
          funcRender={renderSingleColumnOptions("value", "name")}
        />
      </Col>

      <Col>
        <CommonLabel>{"Tree select"}</CommonLabel>
        <CommonValidTooltip></CommonValidTooltip>
        <CommonTreeSelect
          onChange={(value, option) => console.log({value, option})}
          dataRender={dataTree} //function rest api, param = value search
          funcRender={renderTreeOptions("value", "name", "child")}
        />
      </Col>

      <Col md={12}>
        <CommonLabel>{"Tree"}</CommonLabel>
        <CommonValidTooltip></CommonValidTooltip>
        <CommonTree
          onSelect={(e) => console.log(e)}
          field={{ fieldName: "name", fieldValue: "value", fieldChild: "child" }}
          dataRender={[
            {
              name: 'Root Node 0',
              value: '0',
              child: [
                {
                  name: 'Node 0.1',
                  value: '0.1',
                  child: [
                    {
                      name: 'Leaf 0.1.1',
                      value: '0.1.1',
                    },
                    {
                      name: 'Leaf 0.1.2',
                      value: '0-0-0-1',
                    },
                  ],
                },
                {
                  name: 'Node 0.2',
                  value: '0.2',
                  child: [
                    {
                      name: 'Leaf 0.2.1',
                      value: '0.2.1'
                    }
                  ],
                },
              ],
            },
          ]}
        />
      </Col>
    </Row>
  );
};

export default SampleSelect;
