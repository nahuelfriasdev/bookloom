"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { useEffect, useState } from "react";
import { BookInCollectionType, BookType } from "../../../../../types";
import { Badge } from "@/components/ui/badge";
import { BadgeCheckIcon } from "lucide-react";
import { useBookSearch } from "@/hooks/useBookSearch";
import { addBookToUserCollection, fetchBooks } from "@/services/bookServices";
import { useParams } from "next/navigation";

interface CardAddNewBookProps {
  onBookAdded: (book: BookInCollectionType) => void;
  onClose: () => void;
}

const AddBook = ({onBookAdded, onClose }: CardAddNewBookProps ) => {
  const { books, handleSearch } = useBookSearch(fetchBooks);
  const [selectedBook, setSelectedBook] = useState<BookType | null>(null);
  const [newBook, setnewBook] = useState<BookInCollectionType>();
  const [loading, setLoading] = useState(false);

  const id = useParams().id as string;

  const statusOptions = [
    { label: "Por Leer", value: "TO_READ" },
    { label: "Leyendo", value: "READING" },
    { label: "Finalizado", value: "COMPLETED" },
  ];

  const handleAddBook = async () => {
    if (!selectedBook && !newBook) return;
      setLoading(true);
    if(newBook?.status === "TO_READ") newBook.pagesRead = 0;

    if(newBook?.status === "COMPLETED") newBook.pagesRead = newBook.pageCount;
    
    await addBookToUserCollection(id, newBook!);
    onBookAdded(newBook!);
    onClose();
    setLoading(false);
    setSelectedBook(null);
    setnewBook(undefined);
  }

  useEffect(() => {
  if (selectedBook) {
    setnewBook({
      id: selectedBook.id,
      title: selectedBook.title || "",
      authors: selectedBook.authors || [],
      thumbnail: selectedBook.thumbnail || "",
      status: "TO_READ",
      pageCount: 0,
      pagesRead: 0,
    });
  }
}, [selectedBook]);

  return (
    <>
      <section className="container mx-auto p-4">
        <h2 className="text-xl font-semibold mb-4 text-center">Agregar un nuevo libro</h2>
        <Input onChange={(e) => handleSearch(e.target.value)}/>

        {books.length > 0 && (
          <article className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {!!selectedBook 
            ? 
              (
                <>
                  <div className="border p-4 rounded-lg">
                    <Image
                      src={selectedBook.thumbnail || "/defaultAvatar.png"}
                      alt={selectedBook.title}
                      width={128}
                      height={192}
                    />
                    <div>
                      <h3 className="font-medium text-lg mt-2">{selectedBook.title}</h3>
                      <p className="text-sm text-muted-foreground">Autores: {selectedBook.authors.join(", ")}</p>
                    </div>

                    <div className="flex items-center gap-2">
                      <label htmlFor="pageCount" className="text-sm font-medium">Cantidad de páginas:</label>
                      {/* hacerlo requerido al input pague count */}
                      <Input id="pageCount" type="number" min={0} defaultValue={0} className="w-20" onChange={(e) => 
                        {
                          const value = parseInt(e.target.value, 10);
                          if (isNaN(value) || value < 0) {
                            e.target.value = "0";
                            return;
                          }
                          e.target.value = "" + value;
                          setnewBook(prev => prev ? { ...prev, pageCount: value } : prev);
                        }
                      }/> 
                    </div>

                    <div className="flex items-center gap-2 mt-2">
                      {/* Hacer requerido esto tambien */}
                      {statusOptions.map((option) => (
                        <Badge
                        variant="secondary"
                        className={`text-black h-7 flex items-center justify-center cursor-pointer ${newBook?.status === option.value ? "bg-purple-300" : ""}`}
                        onClick={() => setnewBook(prev => prev ? { ...prev, status: option.value } : prev)}
                        key={option.value}
                      >

                        {newBook?.status === option.value && <BadgeCheckIcon className="mr-1" />}
                        {option.label}
                      </Badge>
                      ))}
                    </div>

                    {/* Al cambiar a finalizado y volver a leyendo queda con el value max del libro, manejar ese bug!! */}
                    {newBook?.status === "READING" && (
                      <div className="flex items-center gap-2 mt-2">
                        <label htmlFor="pageCount" className="text-sm font-medium">Cantidad de páginas leídas:</label>
                        {/* hacerlo requerido ? se permite un 0 de respuesta?  */}
                        <Input id="pageCount" type="number"  min={0} defaultValue={0} className="w-20" onChange={(e) => 
                          {
                            const value = parseInt(e.target.value, 10);
                            if (isNaN(value) || value < 0) {
                              e.target.value = "0";
                              return;
                            }
                            e.target.value = "" + value;
                            setnewBook(prev => prev ? { ...prev, pagesRead: value } : prev);
                          }
                        }/> 
                      </div>
                    )}
                  </div>
                  <Button disabled={loading} className={`mt-4 w-full ${loading ? "bg-gray-300" : ""}`} onClick={handleAddBook}>Agregar Libro</Button>
                </>
                
              )
            : 
              <>
                {books.map((book) => (
                  <div key={book.id} className="border p-4 rounded-lg  cursor-pointer" onClick={() => setSelectedBook(book)}>
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
              </>
            }
          </article>
        )}
        
        

      </section>
    </>
  )
}

export default AddBook;