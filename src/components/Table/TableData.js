import React from "react";

const TableData = ({ tableData, setCheckedValue, mappedObj }) => {
  return (
    <>
      {tableData.map((eachProduct) => {
        const {
          label,
          description,
          key,
          field: { defaultValue, type, options } = {},
        } = eachProduct || {};
        return (
          <tr key={key}>
            <td>
              <span>
                <input
                  type="checkbox"
                  checked={mappedObj[key]?.checked}
                  onChange={() => setCheckedValue(key)}
                />
              </span>
              {label}
            </td>
            <td>
              {type === "select" ? (
                <select>
                  {options.map((eachOption, index) => (
                    <option key={index} value={eachOption}>
                      {eachOption}
                    </option>
                  ))}
                </select>
              ) : (
                <input type={type} defaultValue={defaultValue} />
              )}
            </td>
            <td> {description}</td>
          </tr>
        );
      })}
    </>
  );
};

export default TableData;
