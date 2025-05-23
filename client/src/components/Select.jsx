import React from "react";
import PropTypes from "prop-types";

const Select = ({
  name,
  value,
  onChange,
  label,
  option1,
  options,
  required = false,
  className = "",
}) => {
  return (
    <div>
      {label && (
        <label className="block text-sm font-medium mb-1">{label}</label>
      )}
      <select
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className={`w-full p-2 border border-gray-300 rounded-md ${className}`}
      >
        <option value="">
          Izaberite {option1 ? option1 : label.toLowerCase()}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

Select.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  required: PropTypes.bool,
  className: PropTypes.string,
};

export default Select;
