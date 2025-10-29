"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "./ui/progress"

export default function HomePage() {
  // Datos de ejemplo (después conectar con Firebase)
  const user = {
    name: "Nahuel Frías",
    username: "@nahuelfrias",
    avatar: "/defaultAvatar.png",
    stats: {
      books: 23,
      journals: 12,
      daysReading: 148,
    },
    currentReading: {
      title: "Dune",
      cover: "/covers/dune.jpg",
      progress: 150*100/500,
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

  return (
    <div className="max-w-4xl mx-auto space-y-6 p-4">
      {/* Header / Perfil */}
      <header className="border rounded-lg flex items-center gap-4 p-4 bg-card shadow-sm">
        <Image
          src={user.avatar}
          alt="foto perfil"
          className="rounded-full border"
          width={70}
          height={70}
        />
        <div>
          <h2 className="text-xl font-semibold">{user.name}</h2>
          <p className="text-sm text-muted-foreground">{user.username}</p>
        </div>
      </header>

      {/* Stats */}
      <section className="grid grid-cols-3 gap-4 text-center">
        <div>
          <h3 className="text-2xl font-bold">{user.stats.books}</h3>
          <p className="text-sm text-muted-foreground">Libros leídos</p>
        </div>
        <div>
          <h3 className="text-2xl font-bold">{user.stats.journals}</h3>
          <p className="text-sm text-muted-foreground">Journals</p>
        </div>
        <div>
          <h3 className="text-2xl font-bold">{user.stats.daysReading}</h3>
          <p className="text-sm text-muted-foreground">Días leyendo</p>
        </div>
      </section>

      {/* Lectura actual */}
      <Card>
        <CardContent className="flex items-center gap-4 p-4">
          <Image
            src={user.currentReading.cover}
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
        </CardContent>
      </Card>

      {/* Lecturas recientes */}
      <Card>
        <CardContent className="p-4">
          <h3 className="text-base font-semibold mb-3">Lecturas recientes</h3>
          <ul className="flex flex-col gap-3">
            {user.recentJournals.map((book, i) => (
              <li key={i} className="flex items-center gap-3">
                <div className="w-10 h-14 bg-muted rounded-sm flex items-center justify-center text-xs text-muted-foreground">
                  📖
                </div>
                <div>
                  <p className="font-medium">{book.title}</p>
                  <p className="text-xs text-muted-foreground">
                    Último journal: {book.lastJournal}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Meta anual / Progreso */}
      <Card>
        <CardContent className="p-4">
          <h3 className="text-base font-semibold mb-2">Meta anual de lectura</h3>
          <p className="text-sm text-muted-foreground mb-2">
            {user.annualGoal.completed}/{user.annualGoal.goal} libros completados
          </p>
          <Progress
            value={(user.annualGoal.completed / user.annualGoal.goal) * 100}
          />
        </CardContent>
      </Card>

      {/* Acciones */}
      <div className="flex gap-2 justify-end">
        <Button variant="outline">Editar perfil</Button>
        <Button>Ver mis journals</Button>
      </div>
    </div>
  )
}
