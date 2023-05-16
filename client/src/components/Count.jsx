import React from "react";
import { useSelector } from "react-redux";

const Count = () => {
  const glasovi = useSelector((state) => state.stranka.value);

  return <div>{`YOUR COUNT IS: ${glasovi} `} </div>;
};

export default Count;
