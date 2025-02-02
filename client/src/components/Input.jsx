import React from "react";
import PropTypes from "prop-types";

const Input = ({
  type = "text",
  name,
  value,
  onChange,
  label,
  min,
  required = false,
  className = "",
  placeholder, // Dodajte placeholder ovde
}) => {
  return (
    <div>
      {label && (
        <label className="block text-sm font-medium mb-1">{label}</label>
      )}
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        min={min}
        required={required}
        className={`w-full p-2 border border-gray-300 rounded-md ${className}`}
        placeholder={placeholder} // Prosledite placeholder ovde
      />
    </div>
  );
};

Input.propTypes = {
  type: PropTypes.oneOf(["text", "number", "date"]),
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string,
  min: PropTypes.number,
  required: PropTypes.bool,
  className: PropTypes.string,
  placeholder: PropTypes.string, // Dodajte propTypes za placeholder
};

export default Input;
