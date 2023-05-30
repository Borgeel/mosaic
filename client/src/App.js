import React from "react";
import Count from "./components/Count";
import Counter from "./components/Counter";
import Book from "./components/Book";
import { useEffect } from "react";
import Api from "./components/Api";
import Login from "./components/Login";

const App = () => {
  return (
    <>
      <h1 className="text-xs"> pusi ga </h1>
      {/* <Count />
      <Counter />
      <Book /> */}
      <Api />
      {/* <Login /> */}
    </>
  );
};

export default App;
