import React from "react";
import { useDispatch } from "react-redux";
import { decrement, increment } from "../theAwful/bake";

const Counter = () => {
  const defter = useDispatch();

  return (
    <div>
      <button
        onClick={() => {
          defter(increment());
        }}
      >
        +
      </button>
      <button
        onClick={() => {
          defter(decrement());
        }}
      >
        -
      </button>
    </div>
  );
};

export default Counter;
