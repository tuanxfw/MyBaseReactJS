import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { Input } from "antd";
import yup from 'utils/Validation'

import CommonLabel from 'components/CommonLabel';
import CommonValidTooltip from 'components/CommonValidTooltip';

import CommonInputNumber from "components/CommonInputNumber";
import CommonButton from "components/CommonButton";
import CommonSelect from "components/CommonSelect";
import CommonDatePicker from "components/CommonDatePicker";

import {
    renderSingleColumnOptions,
    renderMultipleColumnOptions,
    renderListString,
    renderTreeOptions,
} from "components/selectAntd/CustomOptions";


const schema = yup.object({
    text: yup.string().required("Không được null").maxByte(2),
    number: yup.string().required("Không được null"),
    //select: yup.string().required("Không được null"),
    select: yup.mixed().required("Không được null"),
    date: yup.string().nullable().required("Không được null"),
});

const SampleReactHookForm = (props) => {


    const { control, watch, handleSubmit, getValues, setValue, formState: { errors, isDirty } } = useForm({
        resolver: yupResolver(schema)
    });

    const onSubmit = data => {
        console.log({ data });
        console.log({ isDirty });
    };

    const getValue = () => {
        let valueForm = getValues();
        console.log({ valueForm });
    };

    useEffect(() => {
        const subscription = watch((value, { name, type }) => console.log(value, name, type));
        return () => subscription.unsubscribe();
    }, [watch]);


    return (
        <div>
            <form id="testForm" autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
                <CommonLabel>{"Input text"}</CommonLabel>
                <CommonValidTooltip>{errors?.["text"]?.message}</CommonValidTooltip>
                <Controller
                    control={control}
                    name="text"
                    render={({ field }) => (
                        <Input {...field} />
                    )}
                />

                <CommonLabel>{"Input number"}</CommonLabel>
                <CommonValidTooltip>{errors?.["number"]?.message}</CommonValidTooltip>
                <Controller
                    control={control}
                    name="number"
                    render={({ field: { onChange, ...field } }) => (
                        <CommonInputNumber
                            {...field}
                            onChange={(e) => onChange(e.value)}
                        />
                    )}
                />

                <CommonLabel>{"Select"}</CommonLabel>
                <CommonValidTooltip>{errors?.["select"]?.message}</CommonValidTooltip>
                <Controller
                    control={control}
                    name="select"
                    render={({ field: { onChange, ...field} }) => (
                        <CommonSelect
                            {...field}
                            //defaultValueonChange={onChange}
                            onSelect={(e, item) => onChange(item)}
                            dataRender={[
                                { key: 1, name: "name1", value: "value1" },
                                { key: 2, name: "name2", value: "value2" },
                                { key: 3, name: "name3", value: "value3" },
                            ]}
                            funcRender={renderMultipleColumnOptions(
                                "value",
                                ["key", "name", "value"],
                                ["Mã", "Tên", "Giá trị"]
                            )}
                        />
                    )}
                //defaultValue={"value1"}
                />

                <CommonLabel>{"Date picker"}</CommonLabel>
                <CommonValidTooltip>{errors?.["date"]?.message}</CommonValidTooltip>
                <Controller
                    control={control}
                    name="date"
                    render={({ field }) => (
                        <CommonDatePicker
                            {...field}
                            typePicker="date" />
                    )}
                    defaultValue={"30/04/2022"}
                />

                <CommonButton htmlType="submit">Submit</CommonButton>
                <CommonButton onClick={getValue}>Get Value</CommonButton>
            </form>
        </div>
    );
}

export default SampleReactHookForm;
