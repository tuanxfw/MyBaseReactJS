import React from 'react';
import { Button } from 'reactstrap';

const ButtonIcon = (props) => {

    return (
        <Button className="button-style icon" {...props}>
            {props.children}
        </Button>
    );
}

export default ButtonIcon;