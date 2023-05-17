import React, { useEffect, useState } from "react";
import Person from "./Person";
import Button from "./Button";
import { useFetch } from "../useFetch";

const Api = () => {
  const [newPersonInfo, setNewPersonInfo] = useState({ name: "", age: "" });
  const URL = "http://localhost:8000/people";

  const {
    data: people,
    error,
    loading,
    setData,
    addPerson,
    editPerson,
    deleteHandler,
    likeHandler,
  } = useFetch(URL);

  const chngHandler = (e) => {
    const { name, value } = e.target;
    setNewPersonInfo((prevInput) => {
      return { ...prevInput, [name]: value };
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();

    addPerson(newPersonInfo);
    setNewPersonInfo({ name: "", age: "" });
  };

  if (loading) {
    return <h1> Loading... </h1>;
  }

  if (error) console.log(error);

  return (
    <>
      <h1>Api Practice</h1>
      <div>
        <ul>
          {people?.map((person) => (
            <Person
              key={person._id}
              person={person}
              deleteHandler={deleteHandler}
              likeHandler={likeHandler}
              editPerson={editPerson}
            />
          ))}
        </ul>
      </div>

      <hr />
      <form onSubmit={submitHandler}>
        <label htmlFor="person">Add a person</label>

        <input
          type="text"
          name="name"
          onChange={chngHandler}
          value={newPersonInfo.name}
        />
        <input
          type="number"
          name="age"
          onChange={chngHandler}
          value={newPersonInfo.age}
        />
        <Button text="Add Person" type="submit" />
      </form>
    </>
  );
};

export default Api;
