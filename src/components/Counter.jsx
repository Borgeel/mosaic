import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { decrement, increment } from "../theAwful/theAwfulSlice";

const Counter = () => {
  const count = useSelector((state) => state.counter.value);
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
