"use client";
import { useState } from "react";
import { Card, CardContent } from "../../../../components/ui/card";
import AddBook from "./AddBook";

const CardAddNewBook = () => {
  const [addBook, setAddBook] = useState(false);

  return (
    <>
      <Card>
        <CardContent className="p-4 cursor-pointer" onClick={() => setAddBook(true)}>
          <div className="h-min-16 h-auto">
            {addBook ? (
                <AddBook />
              )
              :
              (
                <div className="flex flex-col items-center justify-center">
                  <p className="text-4xl font-bold text-muted-foreground hover:text-primary transition-colors">
                    +
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">Agregar nuevo libro</p>
                </div>
              )
            }
          </div>
        </CardContent>
      </Card>
    </>
  )
}

export default CardAddNewBook;