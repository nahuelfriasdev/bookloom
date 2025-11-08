"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "./ui/progress"
import { useRouter } from "next/navigation"
import { signOut } from "firebase/auth"
import { auth } from "@/config/firebase"
import { useAuth } from "@/contexts/authContext"

export default function UserProfile({permisos = false}: {permisos?: boolean}) {
  const {user} = useAuth();
  
  const router = useRouter();


  const user2 = {
    name: "Nahuel Frías",
    username: "nahuelfrias",
    avatar: "/defaultAvatar.png",
    stats: {
      books: 23,
      journals: 12,
      daysReading: 148,
    },
    currentReading: {
      title: "Dune",
      cover: "/covers/dune.jpg",
      progress: 150*100/500 // Páginas leídas * 100 / Total páginas => recuperamos % leido,
    },
    recentJournals: [
      { title: "Dune", lastJournal: "12 de octubre" },
      { title: "El Principito", lastJournal: "8 de octubre" },
    ],
    annualGoal: {
      goal: 30,
      completed: 23,
    },
  }
  console.log("user:", user)
  if (!user) return null;

  return (
    <div className="max-w-4xl mx-auto space-y-6 p-4">
      <header className="border rounded-lg flex items-center gap-4 p-4 bg-card shadow-sm">
        <Image
          src={user2.avatar}
          alt="foto perfil"
          className="rounded-full border"
          width={70}
          height={70}
        />
        <div>
          <h2 className="text-xl font-semibold">{user.name}</h2>
          <p className="text-sm text-muted-foreground">@{user.username}</p>
        </div>
      </header>

      {/* Stats */}
      <section className="grid grid-cols-3 gap-4 text-center">
        <div>
          <h3 className="text-2xl font-bold">{user.stats?.booksRead}</h3>
          <p className="text-sm text-muted-foreground">Libros leídos</p>
        </div>
        <div>
          <h3 className="text-2xl font-bold">{user.stats?.journalsWritten}</h3>
          <p className="text-sm text-muted-foreground">Journals</p>
        </div>
        <div>
          <h3 className="text-2xl font-bold">{user.stats?.readingSessions}</h3>
          <p className="text-sm text-muted-foreground">Días leyendo</p>
        </div>
      </section>

      {/* Lectura actual */}
      <Card>
        <CardContent className="flex items-center gap-4 p-4">
        {user.currentReading ? (
          <>
          <Image
            src={user.currentReading.thumbnail}
            alt={user.currentReading.title}
            width={60}
            height={90}
            className="rounded-sm object-cover"
          />
          <div className="flex-1">
            <p className="font-medium">{user.currentReading.title}</p>
            <Progress value={user.currentReading.progress} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-1">
              {user.currentReading.progress}% completado
            </p>
          </div>
          </>
        ) : (
            <p>No hay una lectura en proceso</p>
          )
        }
      </CardContent>
      </Card>

      {/* Lecturas recientes */}
      <Card>
        <CardContent className="p-4">
          <h3 className="text-base font-semibold mb-3">Lecturas recientes</h3>
          {user.recentCompleted && user.recentCompleted?.length > 0 
            ? (
              <ul className="flex flex-col gap-3">
                {user.recentCompleted && user.recentCompleted.map((book, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <Image
                      src={book.thumbnail}
                      alt={book.title}
                      width={60}
                      height={90}
                      className="rounded-sm object-cover"
                    />
                    <div>
                      <p className="font-medium">{book.title}</p>
                      {/* <p className="text-xs text-muted-foreground">
                        Último journal: {book.lastJournal}
                      </p> */}
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p>Todavia no hay lexturas completadas</p>
            )
          }
          
        </CardContent>
      </Card>

      {/* Meta anual / Progreso */}
      <Card>
        <CardContent className="p-4">
          <h3 className="text-base font-semibold mb-2">Meta anual de lectura</h3>
          <p className="text-sm text-muted-foreground mb-2">
            {/* {user2.annualGoal.completed}/{user2.annualGoal.goal} libros completados */}
            * PROXIMAMENTE *
          </p>
          {/* <Progress
            value={(user2.annualGoal.completed / user2.annualGoal.goal) * 100}
          /> */}
        </CardContent>
      </Card>

      {/* Acciones */}
      <div className="flex gap-2 justify-end">
        {permisos && (
          <Button disabled variant="outline" className="cursor-pointer">Editar perfil</Button>
        )}
        <Button className="cursor-pointer" onClick={() => router.push(`/books/${user.uid}`)}>{permisos ? "Ver mis libros" : "Ver libros"}</Button>
        <Button className="cursor-pointer" onClick={() => signOut(auth)}>cerrar sesion</Button>
      </div>
    </div>
  )
}
