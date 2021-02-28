import React from "react";
import constData from "./constants";

const TableHeader = () => {
  const { headerValues } = constData;
  return (
    <tr>
      {headerValues.map((headValue, index) => (
        <th key={index}>{headValue}</th>
      ))}
    </tr>
  );
};

export default TableHeader;