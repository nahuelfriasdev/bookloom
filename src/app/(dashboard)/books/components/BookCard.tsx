import Image from "next/image"
import { BookOpen } from "lucide-react"
import { Card } from "@/components/ui/card"

interface BookCardProps {
  id: string
  title: string
  author?: string
  cover?: string
  onClick?: () => void
}

const BookCard = ({ id, title, author, cover, onClick }: BookCardProps) => {
  return (
    <Card
      key={id}
      onClick={onClick}
      className="group relative cursor-pointer overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all hover:shadow-md hover:-translate-y-1"
    >
      {/* Imagen o placeholder */}
      <div className="relative w-full h-48 bg-muted">
        {cover ? (
          <Image
            src={cover}
            alt={title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-muted-foreground">
            <BookOpen className="w-8 h-8" />
          </div>
        )}
        {/* Gradiente suave para legibilidad */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
      </div>

      {/* Info del libro */}
      <div className="p-3">
        <h2 className="font-medium text-base leading-tight">{title}</h2>
        {author && <p className="text-sm text-muted-foreground">{author}</p>}
      </div>
    </Card>
  )
}

export default BookCard
