import React from "react";
import { Select } from "antd";
import {
    Row,
    Col,
} from "reactstrap";
import Tooltip from 'components/CommonTooltip';
import { v4 as uuidv4 } from 'uuid';

const { Option } = Select;

export const renderListString = (header) => (data) => {
    let children = [];

    if (header) {
        children.push(
            <Option
                disabled
                key={uuidv4()}
                label={"header"}
                value={"header"}>
                <div key={uuidv4()} className="custom-options header">
                    {header}
                </div>
            </Option>
        );
    }

    if (data?.length > 0) {
        data.forEach(item => {

            let name = item;
            let value = item;

            children.push(
                <Option
                    key={uuidv4()}
                    label={name}
                    value={value}>
                    <div key={uuidv4()} className="custom-options">
                        <Tooltip key={uuidv4()}>
                            <div>{name}</div>
                        </Tooltip>
                    </div>
                </Option>
            );
        })
    }

    return children;
};

export const renderSingleColumnOptions = (valueField = "value", nameField = "name", header) => (data) => {
    let children = [];

    if (header) {
        children.push(
            <Option
                disabled
                key={uuidv4()}
                label={"header"}
                value={"header"}
            >
                <div key={uuidv4()} className="custom-options header">
                    {header}
                </div>
            </Option>
        );
    }

    if (data?.length > 0) {
        data.forEach(item => {

            let keyItem = uuidv4();
            let nameItem = item[nameField];
            let valueItem = String(item[valueField]);

            children.push(
                <Option
                    key={keyItem}
                    label={nameItem}
                    value={valueItem}>
                    <div key={uuidv4()} className="custom-options">
                        <Tooltip key={uuidv4()}>
                            <div key={uuidv4()}>{nameItem}</div>
                        </Tooltip>
                    </div>
                </Option>
            );
        })
    }

    return children;

};

export const renderMultipleColumnOptions = (
    valueField = "value",
    nameField = ["key", "name"],
    header = [],
    widthCol = [],
) =>
    (data) => {
        let children = [];

        if (header?.length > 0) {
            children.push(
                <Option
                    disabled
                    key={uuidv4()}
                    label={"header"}
                    value={"header"}>
                    <div key={uuidv4()} className="custom-options header">
                        <Row key={uuidv4()}>
                            {header.map((item, index) => {
                                return <Col key={uuidv4()} className="content" xs={widthCol[index]}>
                                    {item}
                                </Col>
                            })}
                        </Row>
                    </div>
                </Option>
            );
        }

        if (data?.length > 0) {
            data.forEach(item => {

                let keyItem = uuidv4();
                let nameItem = "";
                let valueItem = String(item[valueField]);

                let contentRow = nameField.map((field, index) => {
                    nameItem = nameItem + item[field] + " ";

                    return <Col key={uuidv4()} className="content" xs={widthCol[index]}>
                        <Tooltip key={uuidv4()}>
                            {item[field]}
                        </Tooltip>
                    </Col>
                });

                children.push(
                    <Option
                        key={keyItem}
                        value={valueItem}
                        label={nameItem}>
                        <div key={uuidv4()} className="custom-options">
                            <Row key={uuidv4()}>
                                {contentRow}
                            </Row>
                        </div>
                    </Option>
                );
            });
        }

        return children;

    };