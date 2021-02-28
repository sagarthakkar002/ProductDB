import React, { useEffect, useState } from "react";
import TableHeader from "./TableHeader";
import TableData from "./TableData";
import constData from "./constants";
import "./Table.css";

const Table = ({ productData }) => {
  const { checkBoxText, searchPlaceHolder, noDataFound } = constData;
  const [tableData, setTableData] = useState(productData);
  const [mappedObj, setMappedObj] = useState(checkSelected(productData));
  const [checked, setChecked] = useState(false);
  const [inputSearch, setInputSearch] = useState("");

  useEffect(() => {
    if (!checked && !inputSearch) {
      setTableData(productData);
    } else if (checked && !inputSearch) {
      filterOnChecked(productData);
    } else {
      filterOnSearch(productData);
    }
  }, [checked, inputSearch]);

  function checkSelected(tableData) {
    const mappedObj = tableData.reduce((acc, current) => {
      return { ...acc, [current.key]: { checked: current.selected } };
    }, {});
    return mappedObj;
  }

  //based on show selected
  const filterOnChecked = (dataInput) => {
    setTableData(
      dataInput.filter((rowData) => {
        return mappedObj[rowData.key].checked;
      })
    );
  };

  //based on show selected and search
  const filterOnSearch = (dataInput) => {
    const filteredData = dataInput.filter((eachRow) => {
      const bool = eachRow.label
        .toUpperCase()
        .includes(inputSearch.toUpperCase());
      if (bool) {
        if (checked) {
          return mappedObj[eachRow.key].checked;
        }
        return eachRow;
      }
      return null;
    });
    setTableData(filteredData);
  };

  const setCheckedValue = (key) => {
    !checked &&
      setMappedObj((previousState) => ({
        ...previousState,
        [key]: { checked: !previousState[key].checked },
      }));
  };

  const setCheck = () => {
    setChecked(!checked);
  };

  const setInputData = (e) => {
    setInputSearch(e.target.value);
  };

  return (
    <div className="container">
      <div className="firstRow">
        <input
          type="text"
          placeholder={searchPlaceHolder}
          value={inputSearch}
          onChange={setInputData}
        />
        <label>
          <input type="checkbox" onChange={setCheck} /> {checkBoxText}
        </label>
      </div>

      {tableData[0] ? (
        <table id="products">
          <tbody>
            <TableHeader />
            <TableData
              tableData={tableData}
              setCheckedValue={setCheckedValue}
              mappedObj={mappedObj}
            />
          </tbody>
        </table>
      ) : (
        <div className="notFound">{noDataFound}</div>
      )}
    </div>
  );
};

export default Table;
