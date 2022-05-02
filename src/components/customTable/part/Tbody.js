import React, { useEffect, useState, useContext } from "react";
import { TableContext } from "components/customTable/part/TableProvider";
import { Button } from "antd";

const _ = require("lodash");

const Tbody = (props) => {
  const storeTable = useContext(TableContext);

  const genRow = () => {
    let data = storeTable.value?.data || [];

    data = _.slice(data, 0, 50);

    let rows = [];
    data.map((row) => {
      rows.push(<RowTable dataRow={row} />);
    });

    return rows;
  };

  return <tbody>{genRow()}</tbody>;
};

export default Tbody;

const RowTable = (props) => {
  const storeTable = useContext(TableContext);

  const genCell = () => {
    try {
      let columns = storeTable.value?.columns || [];

      let cells = [];
      columns.map((col) => {
        const fieldName = col.dataField;
        const row = props.dataRow;
        const cell = row[fieldName];

        let content;
        if (col.cellRender?.function) {
          content = col.cellRender?.function({ cell, row });
        } else {
          content = cell;
        }

        cells.push(
          <CellTable
            editCell={col.editCell}
            detail={{ row, cell, fieldName }}
            style={col.cellRender?.style}
          >
            {content}
          </CellTable>
        );
      });

      return (
        <>
          <tr>{cells}</tr>
        </>
      );
    } catch (error) {
      alert(error);
    }
  };

  return <>{genCell()}</>;
};

const CellTable = (props) => {
  const [s_content, s_setContent] = useState(null);

  const onDoubleClickCell = () => {
    if (props.editCell) {
        const idEditField = "editField";

        s_setContent(<>
            <div id={idEditField}>
                {props.editCell()}
            </div>
        </>);
    }

    return;
  };

  const onClickOutSide = (idField) => {
    window.addEventListener("click", function (e) {
      console.log(e.target.id);
      if (document.getElementById("clickbox").contains(e.target)) {
        console.log("inside");
      } else {
        console.log("outside");
      }
    });
  };

  return (
    <td 
    onDoubleClick={onDoubleClickCell}
    style={props.style}>
      <div style={{ width: "100%" }}>{s_content}</div>
    </td>
  );
};
