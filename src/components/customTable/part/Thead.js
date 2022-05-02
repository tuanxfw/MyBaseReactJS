import React, { useEffect, useState, useContext } from 'react';
import { TableContext } from 'components/customTable/part/TableProvider';

const Thead = (props) => {

    const storeTable = useContext(TableContext);

    const genGroup = () => {

    };

    const genHeader = () => {
        try {
            const columns = storeTable.value?.columns || [];

            let headers = [];

            columns.map(column => {
                headers.push(
                    <th style={column.headerStyle}>
                        {column.header}
                    </th>
                );
            })

            return <tr>
                {headers}
            </tr>
        } 
        catch (error) {
            alert(error);
        }
    };

    return (<thead>
        {genGroup()}
        {genHeader()}
    </thead>);
}

export default Thead;