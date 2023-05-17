import { useState } from "react";
import { useEffect } from "react";

export const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch(url);
        const data = await res.json();

        setData(data);
      } catch (error) {
        console.log(error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  const addPerson = async (newPerson) => {
    if (newPerson) {
      setLoading(true);
      try {
        const settings = {
          method: "POST",
          headers: { "Content-Type": "Application/json" },
          body: JSON.stringify(newPerson),
        };
        const res = await fetch(url, settings);
        const data = await res.json();

        setData((prevPeople) => [...prevPeople, data]);
      } catch (error) {
        console.log(error);
        setError(error);
      } finally {
        setLoading(false);
      }
    }
  };

  const editPerson = async (editedPerson) => {
    setLoading(true);

    const settings = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ editedPerson }),
    };
    try {
      const res = await fetch(`${url}/${editedPerson.id}`, settings);
      const data = await res.json();

      setData((prevState) =>
        prevState.map((person) => (person._id === data._id ? data : person))
      );
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const deleteHandler = async (id) => {
    setLoading(true);
    try {
      const res = await fetch(`${url}/${id}`, { method: "DELETE" });
      const data = await res.json();
      console.log(data);

      setData((prevPeople) => prevPeople.filter((person) => person._id !== id));
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const likeHandler = async (likedPerson) => {
    if (likedPerson) {
      const settings = {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ likedPerson }),
      };

      try {
        const res = await fetch(`${url}/${likedPerson._id}`, settings);
        const data = await res.json();

        setData((prevPeople) =>
          prevPeople.map((person) => (person._id === data._id ? data : person))
        );
      } catch (error) {
        console.log(error);
      }
    }
  };

  return {
    data,
    loading,
    error,
    setData,
    addPerson,
    editPerson,
    likeHandler,
    deleteHandler,
  };
};
