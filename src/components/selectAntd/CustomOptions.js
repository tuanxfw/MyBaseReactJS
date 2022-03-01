import React, {useCallback} from "react";
import { Select, Tooltip } from "antd";
import {
    Row,
    Col,
} from "reactstrap";
import { v4 as uuidv4 } from 'uuid';

const { Option } = Select;

export const renderListString = (data, header) => {
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
                        <Tooltip title={name}>
                            <div>{name}</div>
                        </Tooltip>
                    </div>
                </Option>
            );
        })
    }

    return children;
};

export const renderSingleColumnOptions = (data, valueField = "value", keyField = "key", nameField = "name", header) => {
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

            let keyItem = item[keyField];
            let nameItem = item[nameField];
            let valueItem = item[valueField];

            children.push(
                <Option
                    key={keyItem}
                    label={nameItem}
                    value={valueItem}>
                    <div key={uuidv4()} className="custom-options">
                        <Tooltip key={uuidv4()} title={nameItem}>
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
    data,
    valueField = "value",
    keyField = "key",
    nameField = ["key", "name"],
    header = [],
    widthCol = [],
) => {
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

            let keyItem = item[keyField];
            let valueItem = item[valueField];

            children.push(
                <Option
                    key={keyItem}
                    value={valueItem}>
                    <div key={uuidv4()} className="custom-options">
                        <Row key={uuidv4()}>
                            {nameField.map((field, index) => {
                                return <Tooltip key={uuidv4()} title={item[field]}>
                                    <Col key={uuidv4()} className="content" xs={widthCol[index]}>
                                        {item[field]}
                                    </Col>
                                </Tooltip>
                            })}
                        </Row>
                    </div>
                </Option>
            );
        });
    }

    return children;

};