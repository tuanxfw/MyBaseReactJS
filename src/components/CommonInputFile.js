import React, { useRef } from "react";
import { Button } from "antd";
import { InputGroup, Input } from "reactstrap";
import { showError } from "components/MessageBox";
import { Trans } from "translation/i18n";
import { App as AppConstants } from "constants/Constants";
 
const CommonInputFile = ({ onChange: onChangeFile, config, ...props }) => {

    let ref_inputFile = useRef();
    let ref_inputText = useRef();

    const onChange = (e) => {
        const template = AppConstants.REGEX.FILE_NAME;
        
        let inputFile = ref_inputFile.current;
        let inputText = ref_inputText.current;

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
            showError(<Trans ns="commonInputText" name={"commonInputText:filenameIsValid"}/>);

            inputFile.value = [];
            inputText.value = "";
            
            return;
        }

        inputText.value = filenames.join(", ");
        inputText.title = filenames.join(", ");

        if (onChangeFile) {
            onChangeFile({ files });
        }
    };

    return <>
        <InputGroup className="common-input-file" {...props}>
            <Input
                innerRef={ref_inputText}
                className="ant-input"
                readOnly={true}
            />
            <Button onClick={() => ref_inputFile.current.click()}>
                <i className="fa-solid fa-upload" />
            </Button>
        </InputGroup>
        <Input {...config} innerRef={ref_inputFile} type="file" onChange={onChange} hidden />
    </>;
}

export default CommonInputFile;