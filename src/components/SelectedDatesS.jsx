import React from "react";
import { Button } from "@/components/ui/button";
import { CheckIcon, TrashIcon } from "lucide-react";

export function SelectedDatesList({ dates, onComplete, onDelete }) {
  if (dates.length === 0) {
    return <p className="text-muted-foreground">No dates selected</p>;
  }

  return (
    <ul className="space-y-2">
      {dates.map((date) => (
        <li key={date.id} className="flex items-center justify-between p-2 bg-secondary rounded-md">
          <span>{date.dateTime}</span>
          <div className="space-x-2">
            <Button size="icon" variant="ghost" onClick={() => onDelete(date.id)}>
                <TrashIcon className="h-4 w-4" />
            </Button>
          </div>
        </li>
      ))}
    </ul>
  );
}
