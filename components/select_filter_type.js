import React from "react";
import constant from "../constant";

const SelectFilterType = ({ value, onChange }) => (
  <div className="select-box m-bot-m flex-center">
    FILTER BY TYPE:&nbsp;
    <select id="select-type" value={value} onChange={onChange}>
      <option value={constant.DEFAULT_TYPE_FILTER}>
        {constant.DEFAULT_TYPE_FILTER}
      </option>
      {constant.POKEMON_TYPES.map((val, key) => (
        <option key={key} value={val.name}>
          {val.name}
        </option>
      ))}
    </select>
  </div>
);
export default SelectFilterType;
