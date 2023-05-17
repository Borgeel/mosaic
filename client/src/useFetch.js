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

  useEffect(() => {
    addPerson();
    editPerson();
    likeHandler();
    deleteHandler();
  }, []);

  const addPerson = async (newPerson) => {
    if (!newPerson) return;
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
  };

  const editPerson = async (editedPerson) => {
    if (!editedPerson) return;
    const settings = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ editedPerson }),
    };
    setLoading(true);
    try {
      const res = await fetch(`${url}/${editedPerson.id}`, settings);
      const data = await res.json();

      setData((prevState) =>
        prevState.map((person) => (person._id === data._id ? data : person))
      );
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const deleteHandler = async (id) => {
    if (!id) return;
    setLoading(true);
    try {
      const res = await fetch(`${url}/${id}`, { method: "DELETE" });
      const data = await res.json();
      console.log(data);

      setData((prevPeople) => prevPeople.filter((person) => person._id !== id));
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const likeHandler = async (likedPerson) => {
    if (!likedPerson) return;
    const settings = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ likedPerson }),
    };
    setLoading(true);
    try {
      const res = await fetch(`${url}/${likedPerson._id}`, settings);
      const data = await res.json();

      setData((prevPeople) =>
        prevPeople.map((person) => (person._id === data._id ? data : person))
      );
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
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
