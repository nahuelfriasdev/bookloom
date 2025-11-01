"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { fetchBooks } from "@/services/bookServices";
import Image from "next/image";
import { useState } from "react";
import { BookType } from "../../../../../types";

const AddBook = () => {
  const [search, setSearch] = useState("");
  const [books, setBooks] = useState<BookType[]>([]);

  const handleSearch = async (title:string) => {
    if(title.length == 0) {
      setBooks([]);
      return;
    };
    const res = await fetchBooks(title);
    console.log(res);
    setBooks(res);
  }

  return (
    <>
      <section className="container mx-auto p-4">
        <h2 className="text-xl font-semibold mb-4 text-center">Agregar un nuevo libro</h2>
        <Input onChange={(e) => handleSearch(e.target.value)}/>

        {books.length > 0 && (
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {books.map((book) => (
              <div key={book.id} className="border p-4 rounded-lg" onClick={() => handleSearch(book.id)}>
                <Image 
                  src={book.thumbnail || "/defaultAvatar.png"} 
                  alt={book.title} 
                  width={128} 
                  height={192} 
                  className="mb-2 object-cover mx-auto"
                />
                <h3 className="font-medium">{book.title}</h3>
                <p className="text-sm text-muted-foreground">{book.authors.join(", ")}</p>
              </div>
            ))}
          </div>
        )}

        <Button className="mt-4 w-full">Agregar Libro</Button>

      </section>
    </>
  )
}

export default AddBook;