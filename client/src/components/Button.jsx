import React from "react";

const Button = ({ text, type, onPress, cancel }) => {
  return (
    <button
      onClick={onPress}
      type={type}
      style={{ backgroundColor: cancel ? "red" : "blue", color: "white" }}
    >
      {text}
    </button>
  );
};

export default Button;
