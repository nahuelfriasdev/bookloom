import { useState } from "react";
import { BookFetcher, BookType } from "../../types";

export const useBookSearch = (fetchBooksFn: BookFetcher) => {
  const [books, setBooks] = useState<BookType[]>([]);
  const handleSearch = async (title:string) => {
    if(!title)  return setBooks([]);
    const res = await fetchBooksFn(title);
    setBooks(res);
  }

  return { books, handleSearch };
}