import React, { useRef, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Button } from "antd";
import { Dropdown } from 'antd';
import { InputGroup, Input, ListGroup, ListGroupItem, } from "reactstrap";
import { showError } from "components/MessageBox";
import i18n from "translation/i18n";
import { App as AppConstants } from "constants/Constants";

const _ = require('lodash');

const CommonInputFile = ({
    onChange: onChangeFile,
    config,
    files,
    disabled,
    readOnly,
    ...props
}) => {

    const [s_visible, s_setVisible] = useState(false);
    const [s_listFile, s_setListFile] = useState([]);
    const [s_contentDropDonw, s_setContentDropDonw] = useState([]);

    const ref_inputFile = useRef();
    const ref_inputText = useRef();

    useEffect(() => {
        s_setListFile(files);
    }, [files]);

    useEffect(() => {
        let inputText = ref_inputText.current;

        let filenames = [];
        let items = [];

        items = s_listFile.map(file => {
            let fileInfo = file.url ? <a rel="noreferrer" href={file.url} target="_blank">{file.url}</a> : <span>{file.name}</span>;

            filenames.push(file.url || file.name);

            return <ListGroupItem title={file.url || file.name}>
                {fileInfo}
                <i
                    hidden={readOnly || disabled}
                    className="fa-solid fa-xmark"
                    onClick={onRemoveFile(file.url || file.name)}
                />
            </ListGroupItem>
        });

        inputText.value = filenames.join(", ");
        s_setContentDropDonw(items);

    }, [s_listFile]);

    const onChange = (e) => {
        const template = AppConstants.REGEX.FILE_NAME;

        let inputFile = ref_inputFile.current;

        let files = [...inputFile.files];

        let isValid = true;
        let filenames = [];

        let index = 0;
        for (index = 0; index < files.length; index++) {
            const file = files[index];

            if (!template.test(file.name)) {
                isValid = false;
                break;
            }

            filenames.push(file.name);
        }

        if (isValid === false) {
            //showError(<Trans ns="commonInputText" name={"commonInputText:filenameIsValid"} />);
            s_setListFile([]);

            return;
        }

        s_setListFile(files);

        if (onChangeFile) {
            onChangeFile({ files });
        }

        inputFile.value = [];
    };

    const onRemoveFile = (e) => (fileKey) => {
        let index = _.findIndex(s_listFile, file => file.name === fileKey || file.url === fileKey);
        let newListFile = [...s_listFile];

        newListFile.splice(index, 1);

        s_setListFile(newListFile);

        if (onChangeFile) {
            onChangeFile({ files: newListFile });
        }
    };

    return <div disabled={disabled}>
        <Dropdown
            overlay={<div className="file-dropdown">
                <ListGroup flush>
                    {s_contentDropDonw}
                </ListGroup>
            </div>}
            visible={s_visible}
            disabled={props.disabled === true}
            onVisibleChange={() => s_setVisible(false)}
        >
            <InputGroup className="common-upload-file" {...props} onMouseEnter={() => s_setVisible(true)}>
                <Input
                    innerRef={ref_inputText}
                    className="ant-input"
                    readOnly={true}
                    disabled={props.disabled === true}
                    onClick={() => s_setVisible(true)}
                />
                <Button
                    hidden={readOnly}
                    onClick={() => ref_inputFile.current.click()}
                    disabled={props.disabled === true}
                >
                    <i className="fa-solid fa-upload" />
                </Button>
            </InputGroup>
        </Dropdown>
        <Input
            {...config}
            innerRef={ref_inputFile}
            type="file"
            hidden
            onChange={onChange}
        />
    </div>;
}

export default CommonInputFile;

CommonInputFile.defaultProps = {
    files: [],
    readOnly: false,
    disabled: false,
    config: {
        multiple: true,
        accept: ".xlsx, .pdf",
    },
    onChange: (e) => console.log(e),
};

CommonInputFile.propTypes = {
    files: PropTypes.array,
    readOnly: PropTypes.bool,
    disabled: PropTypes.bool,
    config: PropTypes.object,
    onChange: PropTypes.func,
}
