import React from "react";
//import PropTypes from "prop-types";
import JoditEditor from "jodit-react";

const CommonTextEditor = ({config: p_config, ...props}) => {
    const defaultConfig = {
        placeholder: ""
    };

    return (
        <div style={{maxHeight: "500px"}}>
            <JoditEditor
            config={{...defaultConfig, ...p_config}}
            {...props}
        />
        </div>
    );
}

export default CommonTextEditor;

CommonTextEditor.propTypes = {
};