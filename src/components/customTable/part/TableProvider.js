import React, { useEffect, useState, createContext } from 'react';

export const TableContext = createContext();

const TableProvider = (props) => {

    const [s_store, s_setStore] = useState({});

    useEffect(() => {
        let { data, columns } = props;

        let storeValue = {
            value: { data, columns },
            setValue: s_setStore,
        }

        s_setStore(storeValue);
    }, 
    [props]);

    const setStore = (newStore) => {
        s_setStore(newStore);
    };

    return (<TableContext.Provider value={s_store}>
        {props.children}
    </TableContext.Provider>)
}

export default TableProvider;