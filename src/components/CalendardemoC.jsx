"use client";

import * as React from "react";
import { format } from "date-fns";
import { CalendarIcon, CheckIcon } from "lucide-react";
import { getFirestore, collection, addDoc, deleteDoc, doc, getDocs } from "firebase/firestore";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SelectedDatesList } from "./SelectedDatesC";
import { db, auth } from "../firebase";
export function CalendarDemo() {
  const [date, setDate] = React.useState();
  const [time, setTime] = React.useState();
  const [isOpen, setIsOpen] = React.useState(false);
  const [selectedDates, setSelectedDates] = React.useState([]);

  const timeOptions = React.useMemo(() => {
    const options = [];
    for (let i = 0; i < 24; i++) {
      for (let j = 0; j < 2; j++) {
        const hour = i.toString().padStart(2, "0");
        const minute = (j * 30).toString().padStart(2, "0");
        options.push(`${hour}:${minute}`);
      }
    }
    return options;
  }, []);

  const handleDateSelect = (selectedDate) => {
    setDate(selectedDate);
    setTime(undefined);
  };

  const handleTimeSelect = (selectedTime) => {
    setTime(selectedTime);
  };

  const handleDone = async () => {
    if (date && time) {
      const formattedDateTime = `${format(date, "MMMM d, yyyy")} at ${time}`;
  
      try {
        const docRef = await addDoc(collection(db, "selectedDates"), {
          dateTime: formattedDateTime,
          timestamp: new Date(), // Optional: Helps with sorting
        });
  
        setSelectedDates((prev) => [...prev, { id: docRef.id, dateTime: formattedDateTime }]);
        setDate(undefined);
        setTime(undefined);
      } catch (error) {
        console.error("Error adding document: ", error);
      }
    }
    setIsOpen(false);
  };
  React.useEffect(() => {
    const fetchDates = async () => {
      const querySnapshot = await getDocs(collection(db, "selectedDates"));
      const fetchedDates = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        dateTime: doc.data().dateTime,
        email: doc.data().email, // Include email in the fetched data
      }));
  
      setSelectedDates(fetchedDates);
    };
  
    fetchDates();
  }, []);
  

  const handleComplete = (id) => {
    setSelectedDates((prev) => prev.filter((date) => date.id !== id));
  };

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "selectedDates", id));
      setSelectedDates((prev) => prev.filter((date) => date.id !== id));
    } catch (error) {
      console.error("Error deleting document: ", error);
    }
  };
  

  const formattedDateTime = React.useMemo(() => {
    if (date && time) {
      return `${format(date, "MMMM d, yyyy")} at ${time}`;
    } else if (date) {
      return `${format(date, "MMMM d, yyyy")} - Select time`;
    }
    return "Select date and time";
  }, [date, time]);

  return (
    <div className="space-y-4">
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn("w-[280px] justify-start text-left font-normal", !date && "text-muted-foreground")}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {formattedDateTime}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start" side="top">
          <ScrollArea className="h-[400px]">
            <div className="p-4 space-y-4">
              <Calendar mode="single" selected={date} onSelect={handleDateSelect} initialFocus />
              {date && (
                <div className="pt-4 border-t">
                  <h4 className="font-medium mb-2">Select Time</h4>
                  <Select onValueChange={handleTimeSelect} value={time}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select time" />
                    </SelectTrigger>
                    <SelectContent>
                      {timeOptions.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
              {date && time && (
                <div className="pt-4 border-t">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">Selected:</p>
                    <Button size="sm" className="flex items-center" onClick={handleDone}>
                      <CheckIcon className="mr-2 h-4 w-4" />
                      Add to List
                    </Button>
                  </div>
                  <p className="mt-1 text-sm">{formattedDateTime}</p>
                </div>
              )}
            </div>
          </ScrollArea>
        </PopoverContent>
      </Popover>
      <div className="mt-4">
        <h3 className="text-lg font-semibold mb-2">Selected Dates and Times</h3>
        <SelectedDatesList dates={selectedDates.map((date) => ({id: date.id,dateTime: date.dateTime,email: date.email,}))} onComplete={handleComplete} onDelete={handleDelete} />
      </div>
    </div>
  );
}
export default CalendarDemo;
