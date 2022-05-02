import React, { useEffect, useState, useContext } from 'react';

import { TableContext } from 'components/customTable/part/TableProvider';
import TableProvider from "components/customTable/part/TableProvider";

import Thead from 'components/customTable/part/Thead';
import Tbody from 'components/customTable/part/Tbody';
import Tfoot from 'components/customTable/part/Tfoot';

const CustomDatatable = (props) => {
    const storeTable = useContext(TableContext);

    return (<TableProvider {...props}>
        <div className="custom-datatable">
            <table>
                <Thead/>
                <Tbody/>
                <Tfoot></Tfoot>
            </table>
        </div>
    </TableProvider>);
}

export default CustomDatatable;
