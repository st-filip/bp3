import React from "react";
import PropTypes from "prop-types";

const Button = ({
  type = "button",
  text,
  onClick,
  variant = "basic",
  icon,
  className,
}) => {
  const baseStyles =
    "p-3 text-md font-semibold rounded-lg shadow-lg focus:outline-none focus:ring-4";
  const variantStyles = {
    basic: "bg-white text-blue-600 hover:bg-gray-100 focus:ring-blue-300",
    danger: "bg-red-600 text-white hover:bg-red-500 focus:ring-red-400",
    success: "bg-green-600 text-white hover:bg-green-500 focus:ring-green-400",
    warning:
      "bg-yellow-500 text-black hover:bg-yellow-400 focus:ring-yellow-300",
    info: "bg-blue-500 text-white hover:bg-blue-400 focus:ring-blue-300",
    gray: "bg-gray-500 text-white hover:bg-gray-400 focus:ring-gray-200",
  };

  const styles = `${baseStyles} ${
    variantStyles[variant] || variantStyles.basic
  } flex items-center justify-center gap-2 ${className || ""}`;

  return (
    <button type={type} onClick={onClick} className={styles}>
      {icon && <span>{icon}</span>}
      {text && <span>{text}</span>}
    </button>
  );
};

Button.propTypes = {
  type: PropTypes.string,
  text: PropTypes.string,
  icon: PropTypes.node,
  onClick: PropTypes.func,
  variant: PropTypes.oneOf(["basic", "danger", "success", "warning", "info"]),
};

export default Button;
