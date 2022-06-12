import React, {useEffect} from "react";
import {useQuery} from "react-query";
import CommonButton from "components/CommonButton";
import { TestService } from "services/sampleService/TestService";


const SampleButtons = (props) => {

    const {data: dataTest, error, isFetching, refetch} = useQuery("test-query", () => TestService.testGet());

    const onClick = async (e) => {
        // setTimeout(async () => {
        //     let data = await TestService.testGet();
        //     console.log(data);
        // }, 500)
        // setTimeout(async () => {
        //     let data = await TestService.testGet();
        //     console.log(data);
        // }, 750)
        // setTimeout(async () => {
        //     let data = await TestService.testGet();
        //     console.log(data);
        // }, 1000)
        // setTimeout(async () => {
        //     let data = await TestService.testGet();
        //     console.log(data);
        // }, 1200)

        refetch();
    };

    useEffect(() => {
        console.log("dataTest is change", dataTest);
    }, [dataTest]);

    return (
        <>
            <CommonButton
                type="text"
                onClick={onClick}
            >
                Text
            </CommonButton>
            <hr />

            <CommonButton type="iconText">
                <i className="fab fa-accessible-icon" />
                <span>Icon Text</span>
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
        </>
    );
}

export default SampleButtons;
