import React from 'react';
import { Button } from 'reactstrap';

const ActionTable = (props) => {

    return (
        <Button className="action-table-style" {...props}>
            {props.children}
        </Button>
    );
}

export default ActionTable;