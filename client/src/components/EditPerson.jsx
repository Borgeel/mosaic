import React, { useState } from "react";
import Button from "./Button";
// import { useFetch } from "../useFetch";

const EditPerson = ({ person, setIsEdit, editPerson }) => {
  const [edited, setEdited] = useState({ name: "", age: "" });

  const editHandler = (e) => {
    const { name, value } = e.target;
    setEdited((prevInfo) => {
      return { ...prevInfo, [name]: value };
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const newPerson = { ...edited, id: person._id };
    editPerson(newPerson);
    setEdited({ name: "", age: "" });
    setIsEdit((prevState) => !prevState);
  };

  return (
    <form onSubmit={submitHandler}>
      <label htmlFor="name">Edit persons name</label>
      <input
        type="text"
        name="name"
        value={edited.name}
        onChange={editHandler}
        placeholder={person.name}
      />

      <label htmlFor="age">Edit Persons Age</label>
      <input
        type="text"
        name="age"
        value={edited.age}
        onChange={editHandler}
        placeholder={person.age}
      />
      <Button type="submit" text="Edit" />
      <Button
        type="button"
        text="cancel"
        onPress={() => setIsEdit((prevState) => !prevState)}
      />
    </form>
  );
};

export default EditPerson;
