import React, { useState, useEffect, useMemo, useCallback } from "react";
import { withTranslation } from "react-i18next";
import {
  Row,
  Col,
  Form,
  InputGroup,
  InputGroupText,
  Input,
} from "reactstrap";
import {
  showInfo,
  showWarning,
  showConfirm,
  showError,
} from "components/MessageBox";
import DisplayBox from "components/DisplayBox";
import CommonLabel from 'components/CommonLabel';
import CommonValidTooltip from 'components/CommonValidTooltip';
import CommonButton from "components/CommonButton";
import CommonDatePicker from "components/CommonDatePicker";
import CommmonSelect from "components/CommonSelect";
import CommonInputNumber from "components/CommonInputNumber";
import CommonTable from "components/CommonTable";
import SampleForm from "./sampleForm";
import { showDialog, closeDialog } from "components/Dialog";
import { showCircleLoading, closeCircleLoading } from "components/CircleLoading";
import { TestService } from "services/sampleService/TestService";
import { renderSingleColumnOptions, renderMultipleColumnOptions, renderListString } from "components/selectAntd/CustomOptions"

const Login = (props) => {
  const { t } = props;

  const testList = [
    { key: "Giá trị", name: "Tên" },
    { key: "3242342342342222222222222312222222223122222222222222222222231234234", name: "3242342342342222222222222312222222223122222222222222222222231234234" },
    { key: "key3", name: "value3" },
  ];

  const [s_testList, s_setTestList] = useState(testList);
  const [s_valueDatePicker, s_setValueDatePicker] = useState({});

  const onClickBtn = async (e) => {
    let result = await TestService.testGet();
    console.log(result);

    s_setTestList([
      { key: "Giá trị", name: "Tên" }
    ]);
  };

  const onChangeValueForm = (e) => {
    console.log(e);
  }

  return (
    <Form
      onChange={onChangeValueForm}
      noValidate='novalidate'
      onSubmit={(e) => e.preventDefault()}>
      <Row xs={1}>
        <Col>
          <DisplayBox title={"Button"} isOpen={false}>
            <CommonButton type="text" onClick={onClickBtn}>Text</CommonButton>
            <hr />
            <CommonButton type="iconText">
              <i className="fab fa-accessible-icon" />
              Icon Text
            </CommonButton>
            <hr />
            <CommonButton type="icon">
              <i className="fab fa-accessible-icon" />
            </CommonButton>
            <hr />
            <CommonButton type="actionTable">
              <i className="fab fa-accessible-icon" />
            </CommonButton>
            <CommonButton type="actionTable">
              <i className="fab fa-accessible-icon" />
            </CommonButton>
            <CommonButton type="actionTable" disabled>
              <i className="fab fa-accessible-icon" />
            </CommonButton>
          </DisplayBox>
        </Col>

        <Col>
          <DisplayBox title={"Message"} isOpen={false}>
            <CommonButton onClick={() => showInfo("Info")}>showInfo</CommonButton>
            <hr />
            <CommonButton onClick={() => showWarning("Warning")}>showWarning</CommonButton>
            <hr />
            <CommonButton
              onClick={() =>
                showConfirm("Confirm", () => console.log("call back confirmS"))
              }
            >
              showConfirm
            </CommonButton>
            <hr />
            <CommonButton onClick={() => showError("Error")}>showError</CommonButton>
          </DisplayBox>
        </Col>

        <Col>
          <DisplayBox title={"Dialog"} isOpen={false}>
            <CommonButton onClick={
              () => {
                showDialog(<SampleForm />, "test-123")
              }
            }>showDialog
            </CommonButton>
          </DisplayBox>
        </Col>

        <Col>
          <DisplayBox title={"Circle Loading"} isOpen={false}>
            <CommonButton onClick={() => {
              showCircleLoading();
              let time = setTimeout(() => {
                closeCircleLoading();
                clearTimeout(time);
              }, 3000)
            }}>
              showCircleLoading
            </CommonButton>
          </DisplayBox>
        </Col>

        <Col>
          <DisplayBox title={"DatePicker"} isOpen={false}>
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
          </DisplayBox>
        </Col>

        <Col>
          <DisplayBox title={"Select"} isOpen={false}>
            <Row xs={3}>
              <Col>
                <CommonLabel>{"Gen list string"}</CommonLabel>
                <CommonValidTooltip>{"Lỗi gì đó"}</CommonValidTooltip>
                <CommmonSelect onChange={(e) => console.log(e)}>
                  {renderListString(["1", "2", "3"])}
                </CommmonSelect>
              </Col>

              <Col>
                <CommonLabel>{"Gen collection with single col"}</CommonLabel>
                <CommonValidTooltip></CommonValidTooltip>
                <CommmonSelect onChange={(e) => console.log(e)}>
                  {renderSingleColumnOptions(testList, "key", "key", "name")}
                </CommmonSelect>
              </Col>

              <Col>
                <CommonLabel>{"Gen collection with multiple col"}</CommonLabel>
                <CommonValidTooltip>{""}</CommonValidTooltip>
                <CommmonSelect onChange={(e) => console.log(e)}>
                  {useMemo(() => renderMultipleColumnOptions(
                    s_testList,
                    "value",
                    "key",
                    ["key", "name"],
                    ["Cột 1", "Cột 2"]
                  ), [s_testList])}
                </CommmonSelect>
              </Col>
            </Row>
          </DisplayBox>
        </Col>

        <Col>
          <DisplayBox title={"Input number"} isOpen={false}>
            <Row xs={2}>
              <Col>
                <CommonLabel>{"Input number default"}</CommonLabel>
                <CommonValidTooltip>{""}</CommonValidTooltip>
                <CommonInputNumber />
              </Col>
            </Row>
          </DisplayBox>
        </Col>

        <Col>
          <DisplayBox title={"Table"} isOpen={false}>
            <Row xs={2}>
              <Col>
                <CommonLabel>{"Input number default"}</CommonLabel>
                <CommonTable />
              </Col>
            </Row>
          </DisplayBox>
        </Col>
      </Row>
    </Form>
  );
};

export default withTranslation(["common"])(Login);
