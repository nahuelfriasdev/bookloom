"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { BookType, JournalCardProps } from "../../../../../../types";
import { fetchBooks } from "@/services/bookServices";
import { CardGrid } from "@/app/(dashboard)/books/components/CardGrid";
import JournalCard from "../../components/JournalCard";
import CardAddJournal from "../../components/CardAddJournal";
import { getUserJournals } from "@/services/journalServices";


const Journal = () => {
  const { id, userid } = useParams();
  const [book, setBook] = useState<BookType>();
  const [journals, setJournals] = useState<(JournalCardProps & {id:string})[]>([])
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => { 
    async function getBookInfo () {
      setLoading(true);
      const bookInfo = await fetchBooks(id as string);
      setBook(bookInfo[0]);
      console.log(bookInfo[0])

      setLoading(false);
      console.log("Fetched book info:", bookInfo[0]);
    }

    getBookInfo();
  }, [id]);
  
  useEffect(() => {
    async function getJournals() {
      const journalsData = await getUserJournals(userid as string, id as string)
      setJournals(journalsData)
    }
    getJournals();
  }, [id])

  return (
    <section>
      <header>
        {loading ? (
          <p>Cargando Informacion del libro...</p>
        )
        : (
          <div>
            <h1 className="text-center">{book?.title}</h1>
            <p className="text-center">{book?.authors?.join(", ")}</p>
          </div>
        )
      }
      </header>

      <main className="mt-5">
        {loading && (
          <p>Cargando detalles del libro...</p>
        )}

        {(!loading && book) && (
          <CardGrid>
            <CardAddJournal />
            {journals.length == 0 && (
              <p>No hay journals para este libro</p>
            )}
            {journals && journals.map((journal) => (
              <JournalCard
                key={journal.id}
                date={journal.date}
                pagesRead={journal.pagesRead}
                percentage={journal.percentage}
                notes={journal.notes}
                readingTime={`${journal.readingTime} min`}
              />
            ))}
          </CardGrid>
        )}
      
      </main>

    </section>
  )
}

export default Journal;

