import React from 'react';
import { Button } from 'reactstrap';

const ButtonIconText = (props) => {

    return (
        <Button className="button-style icon-text" {...props}>
            {props.children}
        </Button>
    );
}

export default ButtonIconText;