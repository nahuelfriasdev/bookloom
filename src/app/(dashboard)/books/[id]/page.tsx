"use client";
import CardAddNewBook from "@/app/(dashboard)/books/components/CardAddNewBook";
import { CardGrid } from "@/app/(dashboard)/books/components/CardGrid";
import BookCard from "../components/BookCard";
import { useEffect, useState } from "react";
import { getUserBooks } from "@/services/bookServices";
import { useParams } from "next/navigation";
import { BookInCollectionType } from "../../../../../types";

const BooksPage = () => {
  const [books, setBooks] = useState<BookInCollectionType[]>([]);
  const [userId, setUserId] = useState<string>("");

  const id = useParams().id as string;

  useEffect(() => {
    async function fetchUserBooks() {
      const books = await getUserBooks(id);
      if (books && typeof books === "object" && "books" in books && "userId" in books) {
        setBooks(books.books || []);
        setUserId(books.userId || "");
      } else {
        setBooks([]);
        setUserId("");
      }
    }
    fetchUserBooks();
  },[id])

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Mis libros</h1>
      <CardGrid>
        <CardAddNewBook onBookAdded={(book: BookInCollectionType) => setBooks((prev) => [...prev, book])} />
        {books.length === 0 && (
          <p className="text-muted-foreground col-span-full text-center">
            No hay libros en tu colección. ¡Agrega uno nuevo!
          </p>
        )}
        {books.map((book) => (
          <BookCard key={book.id} {...book} userId={userId}/>
        ))}
      </CardGrid>
    </div>
  )
}

export default BooksPage;