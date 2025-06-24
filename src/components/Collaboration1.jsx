import { brainwaveSymbol, check } from "../assets";
import { collabApps, collabContent, collabText } from "../constants";
import Button from "./Button";
import Section from "./Section";
import { LeftCurve, RightCurve } from "./design/Collaboration";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const messages = [
  {
    id: "#1234",
    lastMessage: "I need help with exam stress",
    timeElapsed: "10 min ago",
  },
  {
    id: "#5678",
    lastMessage: "Thanks for your advice",
    timeElapsed: "1 hour ago",
  },
  {
    id: "#9101",
    lastMessage: "Can we reschedule?",
    timeElapsed: "3 hours ago",
  },
]

const Collaboration1 = () => {
  return (
    <Section crosses id="feature">
       
    </Section>
  );
};

export default Collaboration1;
