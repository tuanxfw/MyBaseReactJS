import React from "react";
//import PropTypes from "prop-types";
import JoditEditor from "jodit-react";

const CommonTextEditor = ({ config: p_config, onChange: p_onChange, ...props }) => {
    const defaultConfig = {
        placeholder: ""
    };

    const onChange = (value) => {
        if (p_onChange && value?.trim() !== "") {
            p_onChange(value);
        }
    };

    return (
        <div style={{ maxHeight: "500px" }}>
            <JoditEditor
                config={{ ...defaultConfig, ...p_config }}
                onChange={onChange}
                {...props}
            />
        </div>
    );
}

export default CommonTextEditor;

CommonTextEditor.defaultProps = {
    onChange: e => console.log(e)
};

CommonTextEditor.propTypes = {
};