import axios from "axios";
import { BookInCollectionType } from "../../types";
import { collection, doc, getDoc, getDocs, increment, orderBy, query, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";
import { firestore } from "@/config/firebase";

export const fetchBooks = async (query: string) => {
  try {
    const response = await axios.get(
      `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}`
    );
    const data = await response.data;
    return data.items?.map((item: {id:string, volumeInfo: {title: string, authors: string, imageLinks: {thumbnail: string}, description: string}}) => ({
      id: item.id,
      title: item.volumeInfo.title,
      authors: item.volumeInfo.authors || [],
      thumbnail: item.volumeInfo.imageLinks?.thumbnail,
      description: item.volumeInfo.description,
    })) || [];
  } catch (error) {
    console.error("❌ Error al buscar libros:", error);
    return [];
  }
};

export const addBookToUserCollection = async (userId: string, bookData: BookInCollectionType) => {
  try {
    await setDoc(doc(firestore, "users", userId, "books", bookData.id), {
      ...bookData,
      addedAt: serverTimestamp(),
    });

    if (bookData.status === "COMPLETED") {
      const statsRef = doc(firestore, "users", userId, "stats", "default");

      await setDoc(statsRef, {
        booksRead: increment(1),
        pagesRead: increment(bookData.pageCount),
        updatedAt: serverTimestamp(),
      }, { merge: true });
    }

    return {success: true}
  } catch (error) {
    console.error("❌ Error al agregar libro a la colección del usuario:", error);
  }
}

export const getUserBooks = async (userId: string) => {
  try {
    if (!userId) {
      console.warn("⚠️ getUserBooks llamado con userId vacío");
      return [userId, []];
    }
    const booksRef = collection(firestore, "users", userId, "books");
    const q = query(booksRef, orderBy("addedAt", "desc"));
    const snapshot = await getDocs(q);

    if (snapshot.empty) console.log("No books found for user:", userId);

    const books = snapshot.docs.map((doc) => ({ 
      id: doc.id, 
      ...doc.data()
    })) as BookInCollectionType[];
    return {userId, books};

  } catch (error) {
    console.error("❌ Error al obtener los libros del usuario:", error);
  }
}

export const getPercentageRead = async (
  userId: string,
  bookId: string,
  pagesRead: number
): Promise<number> => {
  try {
    const bookRef = doc(firestore, "users", userId, "books", bookId);
    const snapshot = await getDoc(bookRef);

    if (!snapshot.exists()) {
      console.log("📕 No se encontró el libro con ID:", bookId);
      return 0;
    }

    const bookData = snapshot.data();

    const previousPages = bookData.pagesRead ?? 0;
    const updatedPages = Math.min(previousPages + pagesRead, bookData.pageCount ?? previousPages); // evita pasar el total
    const totalPages = bookData.pageCount ?? 1;

    const percentage = Math.round((updatedPages / totalPages) * 100);

    await updateDoc(bookRef, {
      pagesRead: updatedPages,
      progress: percentage,
      updatedAt: new Date(),
    });

    return percentage;
  } catch (error) {
    console.error("❌ Error al calcular el porcentaje de lectura:", error);
    return 0;
  }
};