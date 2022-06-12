import React, { useRef } from "react";
import i18n from "translation/i18n";
import { Input, Button } from 'antd';
import CommonSelect from 'components/CommonSelect';
import { renderSingleColumnOptions } from "components/selectAntd/CustomOptions";

const _ = require('lodash');

const matchModeWidth = "0px";
const debounceWait = 700;
const optionsMatchMode = [
    {
        value: "contains",
        name: "%%",
    },
    {
        value: "equals",
        name: "==",
    },
    {
        value: "notContains",
        name: "!=",
    },
    {
        value: "startWith",
        name: "%.",
    },
    {
        value: "endWith",
        name: ".%",
    },
];

const filterTable = Component => {
    return ({ filterOptions, onFilter, column, ...props }) => {
        const ref_valueFilter = useRef();
        const ref_matchMode = useRef();

        //#region Event
        const onChange = _.debounce((e) => {
            ref_valueFilter.current = getValue(e);
            filter();
        }, debounceWait);
        //#endregion

        //#region Method
        const getValue = (e) => {
            return e?.target?.value ?? e;
        };

        const filter = () => {
            let options = {
                value: ref_valueFilter.current,
                matchMode: ref_matchMode.current,
                function: filterOptions.function
            };

            onFilter(options);
        };
        //#endregion

        return (
            <div style={{marginBottom: "2px"}}>
                <Input.Group compact>
                    {/* <CommonSelect style={{ width: matchModeWidth }}
                    allowClear={false} showSearch={false} showArrow={false}
                    defaultValue={optionsMatchMode[0].value}
                    dataRender={optionsMatchMode}
                    funcRender={renderSingleColumnOptions("value", "name")}
                    onChange={(value) => {
                        ref_matchMode.current = value;
                        filter();
                    }}
                /> */}
                    <Component
                        placeholder={i18n.t("commonDatatable:filter")}
                        style={{ width: `calc(100% - ${matchModeWidth})` }}
                        {...props} {...filterOptions.advanced}
                        onChange={onChange}
                        allowClear
                    />
                </Input.Group>
            </div>
        );
    }
}

export default filterTable;
