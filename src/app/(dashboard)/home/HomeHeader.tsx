"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function UserProfile() {
  // 🔹 (ejemplo de datos estáticos — luego conectar con Firebase)
  const user = {
    name: "Nahuel Frías",
    username: "@nahuelfrias",
    bio: "Amante de la ciencia ficción y los diarios de lectura. Siempre con un libro cerca.",
    avatar: "/defaultAvatar.png",
    stats: {
      books: 23,
      journals: 12,
      daysReading: 148,
    },
    recentBooks: [
      {
        title: "Dune",
        cover: "/covers/dune.jpg",
        lastJournal: "12 de octubre",
      },
      {
        title: "El Principito",
        cover: "/covers/principito.jpg",
        lastJournal: "8 de octubre",
      },
    ],
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6 p-4">
      {/* Header */}
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

      {/* Estadísticas */}
      <section className="grid grid-cols-3 gap-4 text-center">
        <div>
          <h3 className="text-2xl font-bold">{user.stats.books}</h3>
          <p className="text-sm text-muted-foreground">Libros leídos</p>
        </div>
        <div>
          <h3 className="text-2xl font-bold">{user.stats.journals}</h3>
          <p className="text-sm text-muted-foreground">Journals creados</p>
        </div>
        <div>
          <h3 className="text-2xl font-bold">{user.stats.daysReading}</h3>
          <p className="text-sm text-muted-foreground">Días leyendo</p>
        </div>
      </section>

      {/* Sobre mí */}
      <Card>
        <CardContent className="p-4">
          <h3 className="text-base font-semibold mb-2">Sobre mí</h3>
          <p className="text-sm text-muted-foreground">{user.bio}</p>
        </CardContent>
      </Card>

      {/* Lecturas recientes */}
      <Card>
        <CardContent className="p-4">
          <h3 className="text-base font-semibold mb-3">Lecturas recientes</h3>
          <ul className="flex flex-col gap-3">
            {user.recentBooks.map((book, i) => (
              <li key={i} className="flex items-center gap-3">
                <Image
                  src={book.cover}
                  alt={book.title}
                  width={40}
                  height={60}
                  className="rounded-sm object-cover"
                />
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

      {/* Acciones */}
      <div className="flex gap-2 justify-end">
        <Button variant="outline">Editar perfil</Button>
        <Button>Ver mis journals</Button>
      </div>
    </div>
  )
}
