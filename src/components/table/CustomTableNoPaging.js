import React, { useState, useEffect } from "react";
import BootstrapTable from 'react-bootstrap-table-next';
import { Form } from "reactstrap";

const CustomTableNoPaging = ({ 
    data: p_data, 
    funcFeature: p_funcFeature, 
    ...props 
}) => {

    const [s_dataAfterFilter, s_setDataAfterFilter] = useState([]);

    //#region Effect
    useEffect(() => { //trigger when props.data change

        let dataAfterFilter = p_funcFeature.filter(p_data);

        s_setDataAfterFilter(dataAfterFilter);

    }, [p_data]);

    //#endregion

    //#region Event
    const handleClick = (e) => {
        const name = e?.target?.name;

        if (name === "btnFilterTable") {

            let dataAfterFilter = p_funcFeature.filter(p_data);

            s_setDataAfterFilter(dataAfterFilter);
        }
        else if (name === "btnSortTable") {
            const fileName = JSON.parse(e.target.dataset.info).fieldName;
            let dataAfterSort = p_funcFeature.sort(fileName, s_dataAfterFilter);

            s_setDataAfterFilter(dataAfterSort);
        }

    };
    //#endregion

    //#region Method
    
    //#endregion

    return (
        <>
            <Form
                onClick={handleClick}
                noValidate='novalidate' autoComplete="off"
                onSubmit={(e) => e.preventDefault()}>
                <BootstrapTable
                    {...props}
                    data={s_dataAfterFilter}
                />
            </Form>
            <div className="common-datatble-paging">
                <div className="total-field">
                    <span>
                        {s_dataAfterFilter.length}
                    </span>
                </div>
                <div/>
                <div className="action-field">

                </div>
            </div>
        </>
    );
}

export default CustomTableNoPaging;
