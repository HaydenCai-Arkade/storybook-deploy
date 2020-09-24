import React from "react";
import PropTypes from "prop-types";

const VariantSelector = ({ option, handleOptionChange }) => {
  const { name, values } = option;
  return (
    <div>
      <select name={name} key={name} onChange={handleOptionChange}>
        {values.map((value) => {
          return (
            <option value={value} key={`${name}-${value}`}>{`${value}`}</option>
          );
        })}
      </select>

      <style jsx>
        {`
          select {
            height: 30px;
            width: 200px;
            outline: none;
            border: 2px solid black;
            margin-bottom: 20px;
          }
        `}
      </style>
    </div>
  );
};

VariantSelector.propTypes = {
  option: PropTypes.object.isRequired,
  handleOptionChange: PropTypes.func.isRequired,
};

export default VariantSelector;
