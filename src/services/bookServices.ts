import axios from "axios";

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