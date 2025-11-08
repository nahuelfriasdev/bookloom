import Image from "next/image"
import { BookOpen } from "lucide-react"
import { Card } from "@/components/ui/card"
import { BookCardProps } from "../../../../../types"
import { Badge } from "@/components/ui/badge"
import { useRouter } from "next/navigation"

const BookCard = ({ userId, id, title, authors, thumbnail, status, onClick }: BookCardProps & { userId?: string }) => {
  const router = useRouter();

  return (
    <Card
      key={id}
      onClick={() => router.push(`/journal/${id}/${userId}`)}
      className="group relative cursor-pointer overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all hover:shadow-md hover:-translate-y-1"
    >
      <div className="relative w-full h-48 bg-muted">
        {thumbnail ? (
          <Image
            src={thumbnail}
            alt={title}
            fill
            className="transition-transform duration-300 group-hover:scale-105 object-contain"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-muted-foreground">
            <BookOpen className="w-8 h-8" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
      </div>

      <div className="p-3">
        <h2 className="font-medium text-base leading-tight">{title}</h2>
        {authors && <p className="text-sm text-muted-foreground">{authors}</p>}
        <Badge
          variant="secondary"
          className={`text-black h-7 flex items-center justify-center cursor-pointer mt-2 ${status === "COMPLETED" ? "bg-green-300" : status === "READING" ? "bg-blue-300" : "bg-yellow-300"}`}
          key={id}
        >
          {status === "COMPLETED" ? "Completado" : status === "READING" ? "Leyendo" : "Quiero leer"}
        </Badge>
      </div>
    </Card>
  )
}

export default BookCard
