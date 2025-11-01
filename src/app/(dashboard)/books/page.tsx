import CardAddNewBook from "@/app/(dashboard)/books/components/CardAddNewBook";
import { CardGrid } from "@/app/(dashboard)/books/components/CardGrid";
import BookCard from "./components/BookCard";

const BooksPage = () => {
  const books = [
    { id: "1", title: "Dune", author: "Frank Herbert", cover: "/defaultAvatar.png" },
    { id: "2", title: "El Principito", author: "Antoine de Saint-Exupéry", cover: "/covers/principito.jpg" },
    { id: "3", title: "1984", author: "George Orwell", cover: "/covers/1984.jpg" },
  ]

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Mis libros</h1>
      <CardGrid>
        <CardAddNewBook />
        {books.map((book) => (
          <BookCard key={book.id} {...book} />
        ))}
      </CardGrid>
    </div>
  )
}

export default BooksPage;