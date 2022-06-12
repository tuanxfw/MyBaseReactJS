import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { Input } from "antd";
import yup from 'utils/Validation'
import useFocusError from "hooks/useFocusError";

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

const _ = require('lodash');

const SampleReactHookForm = (props) => {

    const schema = yup.object({
        text: yup.string().notEmpty().maxByte(2),
        number: yup.string().custom((value, parent) => {
            let result = {isValid: true, message: ""};

            if (_.toString(parent["text"]) !== "" && _.toString(parent["number"]) === "") {
                result = {
                    isValid: false, 
                    message: "Không được trống",
                };
            }

            return result;
        }),
    });

    const { control, trigger, watch, handleSubmit, getValues, setValue, setError, formState: { errors, isDirty } } = useForm({
        defaultValues: {
            text: "",
            number: "",
        },
        resolver: yupResolver(schema),
    });

    useFocusError("testForm", errors);

    const onSubmit = data => {
        console.log({ data });
        console.log({ isDirty });
    };

    const getValue = () => {
        let valueForm = getValues();


        schema.isValid(valueForm).then((valid) => {
            console.log({ valid });
        })


        console.log({ valueForm });
    };

    useEffect(() => {
    }, []);

    useEffect(() => {
        const subscription = watch(async (value, { name, type }) => {
            console.log(value, name, type);

            //trigger();
            
        });
        return () => subscription.unsubscribe();
    }, [watch]);


    return (
        <div>
            {console.log({ errors })}
            <form id="testForm" autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
                <CommonLabel>{"Input text"}</CommonLabel>
                <CommonValidTooltip>{errors?.["text"]?.message}</CommonValidTooltip>
                <Controller
                    control={control}
                    name="text"
                    render={({ field: {onChange, ...field} }) => (
                        <Input {...field} onChange={e => {
                            onChange(e.target.value);
                            //setValue("number", getValues().number, { shouldDirty: true, shouldValidate: true })
                            
                        }} />
                    )}
                />

                <CommonLabel>{"Input number"}</CommonLabel>
                <CommonValidTooltip>{errors?.["number"]?.message}</CommonValidTooltip>
                <Controller
                    control={control}
                    name="number"
                    render={({ field }) => (
                        <CommonInputNumber
                            {...field}
                        />
                    )}
                />

                <CommonButton htmlType="submit">Submit</CommonButton>
                <CommonButton onClick={getValue}>Get Value</CommonButton>
            </form>
        </div>
    );
}

export default SampleReactHookForm;
