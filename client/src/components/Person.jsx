import React, { useState } from "react";
import EditPerson from "./EditPerson";

const Person = ({ person, deleteHandler, setEditedPerson, likeHandler }) => {
  const [isEdit, setIsEdit] = useState(false);

  return (
    <>
      {!isEdit ? (
        <li>
          <h5> {person.name} </h5>
          <h5> {person.age} </h5>
          {person.likes.length > 0 ? <p> {person.likes.length} </p> : null}
          <button onClick={() => deleteHandler(person._id)}>Delete</button>
          <button onClick={() => likeHandler(person)}>Like</button>
          <button onClick={() => setIsEdit((prevState) => !prevState)}>
            Edit
          </button>
        </li>
      ) : (
        <EditPerson
          person={person}
          setIsEdit={setIsEdit}
          setEditedPerson={setEditedPerson}
        />
      )}
    </>
  );
};

export default Person;
