import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import { addJournalToUserCollection } from "@/services/journalServices";
import { useParams } from "next/navigation";
import { useState } from "react";

interface AddJournalProps {
  onClose: () => void;
}

const AddJournal = ({onClose}: AddJournalProps) => {
  const { id, userid } = useParams() as & { id: string; userid: string };
  const [loading, setLoading] = useState(false);
  const [newjournal, setNewJournal] = useState({
    date: "",
    pagesRead: 0,
    readingTime: 0,
    notes: ""
  });

  const handleAddJournal = () => {
    setLoading(true);
    addJournalToUserCollection(userid , id  ,newjournal)
    console.log("Journal guardado", newjournal);
    setLoading(false);
    onClose();
  }
  return (
    <section className="container mx-auto max-w-lg p-6 space-y-4">
      <h2 className="text-2xl font-semibold text-center">Agregar nuevo Journal</h2>

      <div className="space-y-2">
        <Label htmlFor="date">Fecha</Label>
        <Input id="date" type="date" className="w-full" onChange={(e) => {
          setNewJournal(prev => prev? { ...prev, date: e.target.value } : prev)
        }}/>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="pagesRead">Páginas leídas</Label>
          <Input id="pagesRead" type="number" min="0" placeholder="Ej. 15" onChange={(e) => {
            setNewJournal(prev => prev? { ...prev, pagesRead: parseInt(e.target.value,10) } : prev)
          }} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="readingTime">Tiempo de lectura (min)</Label>
          <Input id="readingTime" type="number" min="0" placeholder="Ej. 30" onChange={(e) => {
            setNewJournal(prev => prev? { ...prev, readingTime: parseInt(e.target.value,10) } : prev)
          }} />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="notes">Notas o reflexiones</Label>
        <Textarea id="notes" placeholder="Escribí tus pensamientos, ideas o reflexiones..." className="min-h-[120px]" onChange={(e) => {
            setNewJournal(prev => prev? { ...prev, notes: e.target.value } : prev)
          }} />
      </div>

      <Button disabled={loading} className="w-full mt-4 cursor-pointer" onClick={handleAddJournal}>{loading ? <Spinner /> : "Guardar Journal"}</Button>
    </section>
  );
}

export default AddJournal;