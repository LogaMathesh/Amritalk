import React from "react";
import { Button } from "@/components/ui/button";
import { CheckIcon, TrashIcon } from "lucide-react";

export function SelectedDatesList({ dates, onDelete }) {
  return (
    <div>
      {dates.map((date) => (
        <div key={date.id} className="flex items-center justify-between border p-2 rounded-lg shadow-md mb-2">
          <div>
            <p className="font-semibold">{date.dateTime}</p>
            <p className="text-sm text-gray-500">{date.email}</p> {/* Display user email */}
          </div>
          <button onClick={() => onDelete(date.id)} className="text-green-500 hover:underline">
            Mark Completed
          </button>
        </div>
      ))}
    </div>
  );
}

