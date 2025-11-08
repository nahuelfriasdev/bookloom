import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CalendarDays, BookOpen, Clock } from "lucide-react"
import { JournalCardProps } from "../../../../../types"



const JournalCard = ({ date, pagesRead, percentage, notes, readingTime }: JournalCardProps) => {

  return (
    <Card className="group relative cursor-pointer overflow-hidden rounded-2xl border border-border bg-white shadow-sm transition-all hover:shadow-md hover:-translate-y-1 p-4">
      {/* Fecha y progreso */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2 text-muted-foreground text-sm">
          <CalendarDays className="w-4 h-4" />
          <span>{date}</span>
        </div>

        <Badge variant="secondary" className="bg-blue-100 text-blue-800">
          {percentage}% leído
        </Badge>
      </div>

      {/* Resumen */}
      <div className="flex items-center gap-3 text-sm mb-2 text-muted-foreground">
        <BookOpen className="w-4 h-4" />
        <span>
          Leíste <strong>{pagesRead}</strong> páginas
        </span>
        {readingTime && (
          <>
            <Clock className="w-4 h-4 ml-2" />
            <span>{readingTime}</span>
          </>
        )}
      </div>

      {/* Notas */}
      <p className="text-sm text-foreground line-clamp-3 leading-relaxed">
        {notes}
      </p>
    </Card>
  )
}

export default JournalCard
