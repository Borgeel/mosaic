import React, { useEffect, useState } from "react";

const Book = () => {
  const [isbn, setIsbn] = useState("");
  const [searchTerm, setSearchTerm] = useState();
  const [book, setBook] = useState(null);
  const [books, setBooks] = useState(
    JSON.parse(localStorage.getItem("books")) || []
  );

  const URL = `https://openlibrary.org/isbn/${searchTerm}.json`;

  useEffect(() => {
    let isCancelled = false;

    if (searchTerm) {
      const fetchBook = async () => {
        try {
          const res = await fetch(URL);
          const data = await res.json();

          if (!isCancelled) {
            setBook(data.title);
            setSearchTerm();
          }
        } catch (error) {
          console.log(error);
        }
      };

      fetchBook();
    }

    return () => {
      isCancelled = false;
    };
  }, [URL, searchTerm]);

  useEffect(() => {
    if (book) {
      setBooks((prevBooks) => [...prevBooks, book]);
      setIsbn("");
      setBook();
    }

    localStorage.setItem("books", JSON.stringify(books));
    console.log("Inside UE", { books });
  }, [book, books]);

  const lastAddedBook = books[books.length - 1];

  return (
    <>
      <h1>Books</h1>
      <hr />

      <div>
        <h3>Search for a book</h3>
        <input
          type="text"
          name="isbn"
          value={isbn}
          onChange={(e) => setIsbn(e.target.value)}
        />
        <button type="submit" onClick={() => setSearchTerm(isbn)}>
          Search
        </button>
      </div>

      <div>
        <h3> Book which was added:</h3>
        <p> {lastAddedBook} </p>
      </div>

      <div>
        <h3>Book list: </h3>
        <ul>
          {books.map((book, index) => (
            <li key={index}> {book} </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Book;
