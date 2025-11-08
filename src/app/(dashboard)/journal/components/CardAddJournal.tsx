"use client"
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";
import AddJournal from "./AddJournal";

const CardAddJournal = () => {
  const [addJournal, setAddJournal] = useState(false);


  return (
    <Card>
      <CardContent className="p-4">
        <div className="h-min-16 h-auto">
          {addJournal ? (
              <AddJournal onClose={() => setAddJournal(false)} />
            )
            :
            (
              <div className="flex flex-col items-center justify-center  cursor-pointer" onClick={() => setAddJournal(true)}>
                <p className="text-4xl font-bold text-muted-foreground hover:text-primary transition-colors">
                  +
                </p>
                <p className="text-sm text-muted-foreground mt-2">Agregar Journal nuevo</p>
              </div>
            )
          }
        </div>
      </CardContent>
    </Card>

  )
}


export default CardAddJournal;

