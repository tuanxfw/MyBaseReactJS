import React, { useState } from "react";
import { withTranslation } from "react-i18next";
import {
  Row,
  Col,
  Form,
} from "reactstrap";

import DisplayBox from "components/DisplayBox";

import { TestService } from "services/sampleService/TestService";

import CommonFieldset from "components/CommonFieldset";

import SampleButtons from "./sampleModules/sampleButtons";
import SampleMessageBox from "./sampleModules/sampleMessageBox";
import SampleDialog from "./sampleModules/sampleDialog";
import SampleProcess from "./sampleModules/sampleProcess";
import SampleDatepicker from "./sampleModules/sampleDatepicker";
import SampleSelect from "./sampleModules/sampleSelect";
import SampleInput from "./sampleModules/sampleInput";
import SampleTable from "./sampleModules/sampleTable";

const Login = (props) => {
  const { t } = props;

  return (
    <>
      <Row xs={1}>
        <Col>
          <DisplayBox title={"Button"} isOpen={false}>
            <SampleButtons />
          </DisplayBox>
        </Col>

        <Col>
          <DisplayBox title={"Message"} isOpen={false}>
            <SampleMessageBox />
          </DisplayBox>
        </Col>

        <Col>
          <DisplayBox title={"Dialog"} isOpen={false}>
            <SampleDialog />
          </DisplayBox>
        </Col>

        <Col>
          <DisplayBox title={"Circle Loading"} isOpen={false}>
            <SampleProcess />
          </DisplayBox>
        </Col>

        <Col>
          <DisplayBox title={"DatePicker"} isOpen={false}>
            <SampleDatepicker />
          </DisplayBox>
        </Col>

        <Col>
          <DisplayBox title={"Select"} isOpen={false}>
            <SampleSelect />
          </DisplayBox>
        </Col>

        <Col>
          <DisplayBox title={"Input"} isOpen={false}>
            <SampleInput />
          </DisplayBox>
        </Col>

        <Col>
          <DisplayBox title={"Table"} isOpen={false}>
            <SampleTable />
          </DisplayBox>
        </Col>
        
        <Col>
          <CommonFieldset>
            <legend>Title</legend>
            <p>
              Content
            </p>
          </CommonFieldset>
        </Col>
      </Row>
    </>
  );
};

export default withTranslation(["common"])(Login);
