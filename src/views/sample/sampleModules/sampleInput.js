import React, { useState } from "react";
import {
    Row,
    Col,
} from "reactstrap";
import { Input } from 'antd';
import CommonLabel from 'components/CommonLabel';
import CommonValidTooltip from 'components/CommonValidTooltip';
import CommonInputNumber from "components/CommonInputNumber";
import CommonInputFile from "components/CommonInputFile";
import CommonTextEditor from "components/CommonTextEditor";
import WrappedLoading from "components/WrappedLoading";

const SampleInput = (props) => {

    return (
        <Row xs={3}>
            <Col>
                <CommonLabel>{"Input number"}</CommonLabel>
                <CommonValidTooltip>{"Lỗi gì đó"}</CommonValidTooltip>
                <WrappedLoading isLoading={true}>
                    <CommonInputNumber onChange={(value) => console.log(value)} />
                </WrappedLoading>
            </Col>

            <Col>
                <CommonLabel>{"Input text"}</CommonLabel>
                <CommonValidTooltip></CommonValidTooltip>
                <Input onChange={(e) => console.log(e)} />
            </Col>

            <Col>
                <CommonLabel>{"Input password"}</CommonLabel>
                <CommonValidTooltip></CommonValidTooltip>
                <Input.Password autoComplete="new-password" />
            </Col>

            <Col>
                <CommonLabel>{"Input file"}</CommonLabel>
                <CommonValidTooltip></CommonValidTooltip>
                <CommonInputFile
                    onChange={(e) => console.log(e)}
                    config={{
                        multiple: true,
                        accept: "image/png, image/jpeg",
                    }} />
            </Col>

            <Col>
                <CommonLabel>{"Input textare"}</CommonLabel>
                <CommonValidTooltip></CommonValidTooltip>
                <Input.TextArea />
            </Col>

            <Col md={12}>
                <CommonLabel>{"Text editor"}</CommonLabel>
                <CommonValidTooltip></CommonValidTooltip>
                <CommonTextEditor />
            </Col>
        </Row>
    );
}

export default SampleInput;

