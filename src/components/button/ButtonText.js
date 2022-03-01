import React from 'react';
import { Button } from 'reactstrap';

const ButtonText = (props) => {

    return (
        <Button className="button-style text" {...props}>
            {props.children}
        </Button>
    );
}

export default ButtonText;