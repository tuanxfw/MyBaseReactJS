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
import WrappedLoading from "components/WrappedLoading";

import { useTestFetch, useTestInsert } from "hooks/api/useSampleQuery";


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

    const { control, watch, handleSubmit, getValues, setValue, formState: { errors, isDirty } } = useForm({
        defaultValues: {
            text: "",
            number: "",
        },
        resolver: yupResolver(schema),
    });

    //#region hooks
    const find = useTestFetch(getValues); //{ data, isFetching, refetch }

    const create = useTestInsert(); //{ data: dataInsert, isLoading, mutate }

    useEffect(() => {
        console.log(find.data);
    }, [find.data]);

    useEffect(() => {
        if (create.isSuccess) {
            console.log(create.data)
        };
    }, [create.data, create.isSuccess]);
    //#endregion

    //#region Method

    //#endregion

    //#region Event
    const onSubmit = data => {
        // console.log({ data });
        // console.log({ isDirty });

        find.refetch();

        //create.mutate(getValues());
    };
    //#endregion

    return (
        <div>
            <CommonForm errors={errors} watch={watch} onSubmit={handleSubmit(onSubmit)}>
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
