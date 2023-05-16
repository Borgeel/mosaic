import React from "react";
import Count from "./components/Count";
import Counter from "./components/Counter";
import Book from "./components/Book";
import { useEffect } from "react";
import Api from "./components/Api";

const App = () => {
  return (
    <>
      {/* <Count />
      <Counter />
      <Book /> */}
      <Api />
    </>
  );
};

export default App;
