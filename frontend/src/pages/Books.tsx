import { BookType } from "@/lib/types";
import useApi from "@/lib/useApi";
import { useEffect, useState } from "react";

function Books() {
  const { allBooks } = useApi();

  const [books, setBooks] = useState<BookType[]>([]);

  const fetchBooks = async () => {
    const response = await allBooks();
    setBooks(response.data);
  };

  useEffect(() => {
    fetchBooks();
  }, []);
  return (
    <div>
      Books
      {books.map((book) => (
        <div key={book.id}>
          <h1>{book.name}</h1>
        </div>
      ))}
    </div>
  );
}

export default Books;
