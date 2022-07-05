import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { Input } from "antd";
import yup from 'utils/Validation';

import CommonLabel from 'components/CommonLabel';
import CommonValidTooltip from 'components/CommonValidTooltip';

import CommonInputNumber from "components/CommonInputNumber";
import CommonButton from "components/CommonButton";
import CommonSelect from "components/CommonSelect";
import CommonDatePicker from "components/CommonDatePicker";
import CommonForm from "components/CommonForm";

import { useTestFetch } from "hooks/api/useSampleQuery";


const _ = require('lodash');

const SampleReactHookForm = (props) => {

    const schema = yup.object({
        text: yup.string().notEmpty().maxByte(2),
        number: yup.string().custom((value, parent) => {
            let result = { isValid: true, message: "" };

            if (_.toString(parent["text"]) !== "" && _.toString(parent["number"]) === "") {
                result = {
                    isValid: false,
                    message: "Không được trống",
                };
            }

            return result;
        }),
    });

    const { control, handleSubmit, getValues, setValue, setError, formState: { errors, isDirty } } = useForm({
        defaultValues: {
            text: "",
            number: "",
        },
        resolver: yupResolver(schema),
    });

    const { data: dataFetch, isFetching, refetch } = useTestFetch(getValues);

    const onSubmit = data => {
        // console.log({ data });
        // console.log({ isDirty });

        refetch();
    };

    useEffect(() => {
        console.log({dataFetch});
    }, [dataFetch]);

    return (
        <div>
            <CommonForm errors={errors} onSubmit={handleSubmit(onSubmit)}>
                <CommonLabel>{"Input text"}</CommonLabel>
                <Controller
                    control={control}
                    name="text"
                    render={({ fieldState, field: { onChange, ...field } }) => (
                        <>
                            <CommonValidTooltip>{fieldState.error?.message}</CommonValidTooltip>
                            <Input {...field} onChange={e => {
                                onChange(e.target.value);
                                //setValue("number", getValues().number, { shouldDirty: true, shouldValidate: true })
                            }} />
                        </>
                    )}
                />

                <CommonLabel>{"Input number"}</CommonLabel>
                <Controller
                    control={control}
                    name="number"
                    render={({ fieldState, field }) => (
                        <>
                            <CommonValidTooltip>{fieldState.error?.message}</CommonValidTooltip>
                            <CommonInputNumber
                                {...field}
                            />
                        </>
                    )}
                />

                <CommonButton htmlType="submit">Submit</CommonButton>
            </CommonForm>
        </div>
    );
}

export default SampleReactHookForm;
