import React, { useEffect, useState } from "react";
import Person from "./Person";
import Button from "./Button";

const Api = () => {
  const [people, setPeople] = useState();
  const [term, setTerm] = useState("");
  const [person, setPerson] = useState("");
  const [singlePerson, setSinglePerson] = useState();
  const [newPerson, setNewPerson] = useState(null);
  const [newPersonInfo, setNewPersonInfo] = useState({ name: "", age: "" });
  const [editedPerson, setEditedPerson] = useState();

  const URL = "http://localhost:8000/people";

  useEffect(() => {
    const fetchPeople = async () => {
      try {
        const response = await fetch(URL);
        const data = await response.json();

        setPeople(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchPeople();
  }, []);

  useEffect(() => {
    if (person) {
      const fetchPerson = async () => {
        try {
          const res = await fetch(`${URL}/${person}`);
          const data = await res.json();
          setSinglePerson(data);
        } catch (error) {
          console.log(error);
        }
      };
      fetchPerson();
    }
  }, [person]);

  useEffect(() => {
    let isCancelled = true;
    if (newPerson) {
      const addPerson = async () => {
        try {
          const settings = {
            method: "POST",
            headers: { "Content-Type": "Application/json" },
            body: JSON.stringify(newPerson),
          };
          const res = await fetch(URL, settings);
          const data = await res.json();

          if (isCancelled) {
            setPeople((prevPeople) => [...prevPeople, data]);
            setNewPerson(null);
          }
        } catch (error) {
          console.log(error);
        }
      };
      addPerson();

      return () => {
        isCancelled = false;
      };
    }
  }, [newPerson]);

  useEffect(() => {
    if (editedPerson) {
      const settings = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ editedPerson }),
      };

      const editPerson = async () => {
        try {
          const res = await fetch(`${URL}/${editedPerson.id}`, settings);
          const data = await res.json();

          setPeople((prevPeople) =>
            prevPeople.map((person) =>
              person._id === data._id ? data : person
            )
          );
        } catch (error) {
          console.log(error);
        }
      };
      editPerson();
    }
  }, [editedPerson]);

  const deleteHandler = async (id) => {
    const res = await fetch(`${URL}/${id}`, { method: "DELETE" });
    const data = await res.json();
    console.log(data);

    const filteredPeople = people.filter((person) => person._id !== id);
    setPeople(filteredPeople);
  };

  const chngHandler = (e) => {
    const { name, value } = e.target;
    setNewPersonInfo((prevInput) => {
      return { ...prevInput, [name]: value };
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();

    setNewPerson(newPersonInfo);
    setNewPersonInfo({ name: "", age: "" });
  };

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
              setEditedPerson={setEditedPerson}
            />
          ))}
        </ul>
      </div>

      <div>
        <input type="text" onChange={(e) => setTerm(e.target.value)} />
        <Button onPress={() => setPerson(term)} text="Search" type="button" />
      </div>

      <div>
        {singlePerson && (
          <h4> The person you searched for is: {singlePerson.name} </h4>
        )}
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
