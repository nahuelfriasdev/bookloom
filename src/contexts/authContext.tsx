"use client"
import { auth, firestore } from "@/config/firebase";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { useRouter } from "next/navigation"
import { createContext, useContext, useEffect, useState } from "react"
import { AuthContextType, UserType, UserWithStatsType } from "../../types";

const AuthContext = createContext<AuthContextType | null>(null)

export const AuthProvider: React.FC<{children: React.ReactNode}> = ({children}) => {
  const [user, setUser] = useState<UserWithStatsType | null>(null)
  const router = useRouter();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (firebaseUser) => {
      if(firebaseUser) {
        setUser({
          uid: firebaseUser?.uid,
          email: firebaseUser.email ?? "",
          name: firebaseUser.displayName ?? "",
          username: "",
        })
        updateUserData(firebaseUser.uid);
        router.push("/home")
      } else {
        setUser(null)
        router.replace("/")
      }
    })

    return () =>unsub();
  }, [])

  const login = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      return {success: true}
    } catch(error: unknown) {
      let msg = "An error occurred";
      if (error && typeof error === "object" && "message" in error) {
        msg = (error as { message: string }).message;
      }
   
      return { success: false, msg}
    }
  }

  const register = async (email: string, password: string, name:string, username:string) => {
    try {
      const response = await createUserWithEmailAndPassword(auth, email, password);

      const uid = response.user?.uid;

      const userData = {
        name,
        username: username.toLocaleLowerCase(),
        email,
        uid: response?.user?.uid,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      }

      const statsData = {
        booksRead: 0,
        pagesRead: 0,
        readingSessions: 0,
        journalsWritten: 0,
        createdAt: serverTimestamp()
      }

      await Promise.all([
        setDoc(doc(firestore, "users", uid), userData),
        setDoc(doc(firestore, "users", uid, "stats", "default"), statsData)
      ])

      return {success: true}
    } catch(error: unknown) {
      let msg = "An error occurred";
      if (error && typeof error === "object" && "message" in error) {
        msg = (error as { message: string }).message;
        if (msg.includes("/(auth/email-alredy-in-use)")) msg = "El email esta en uso";
      }
      return { success: false, msg}
    }
  };

  const updateUserData = async (uid: string) => {
    try {
      const docRef = doc(firestore, "users", uid);
      const docSnap = await getDoc(docRef);
      if(docSnap.exists()) {
        const data = docSnap.data();
        console.log("User data:", data);
        const userData: UserWithStatsType  = {
          uid: data?.uid,
          email: data.email || null,
          name: data.name || null,
          image: data.image || null,
          username: data.username.toLowerCase() || null,
        }

          const statsRef = doc(firestore, "users", uid, "stats", "default");
          const statsSnap = await getDoc(statsRef);
          const statsData = statsSnap.exists() ? statsSnap.data() : null;

         setUser({ ...userData, stats: statsData } as UserWithStatsType);
      }
    } catch (error:unknown) {
      console.log("Error fetching user data:", error);
    }
  }

  const contextValue = {
    user,
    setUser,
    login,
    register,
    updateUserData
  }

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  )

}

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext)
  if(!context) {
    throw new Error("useAuth must be wrapper inside AuthProvider")
  }

  return context;
}

