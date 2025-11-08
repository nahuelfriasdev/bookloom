import { firestore } from "@/config/firebase";
import { collection, doc, getDocs, increment, orderBy, query, serverTimestamp, setDoc } from "firebase/firestore";
import { JournalCardProps, JournalType } from "../../types";
import { getPercentageRead } from "./bookServices";

export const getUserJournals = async (userId:string, bookId:string) => {
  try{
    const journalsRef = collection(firestore, "users", userId, "books", bookId, "journals")
    const q = query(journalsRef, orderBy("createdAt", "desc"));

    const snapshot = await getDocs(q);

    if(snapshot.empty) console.log("no se encontro journals en este libro");

    const journals = snapshot.docs.map((doc) => ({ 
      id: doc.id, 
      ...(doc.data() as JournalCardProps)
    }));

    return journals;
  } catch(error) {
    console.error("Error al recuperar los journals de este libro", error)
    return [];
  }
}

export const addJournalToUserCollection  = async (userId:string, bookId:string, journalData:JournalType) => {
  try{
    const percentage =  await getPercentageRead(userId, bookId, journalData.pagesRead) 
    const journalsRef = collection(firestore, "users", userId, "books", bookId, "journals");
    const newJournalRef = doc(journalsRef);

    await setDoc(newJournalRef, {
      ...journalData,
      percentage,
      createdAt: serverTimestamp(),
    });

    const statsRef = doc(firestore, "users", userId, "stats", "default");

    await setDoc(statsRef, {
      journalsWritten: increment(1),
      updatedAt: serverTimestamp(),
    }, { merge: true });

    return {success: true}
  } catch (error){ 
    console.error("❌ Error al agregar journal a la colección del usuario:", error);
  }
}