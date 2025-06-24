import Section from "./Section";
import { smallSphere, stars } from "../assets";
import Heading from "./Heading";
import PricingList from "./PricingList";
import { LeftLine, RightLine } from "./design/Pricing";
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


const Pricing = () => {
  return (
    <Section className="overflow-hidden" id="pricing">
       <div className="flex justify-center items-center min-h-screen bg-[#0e0c15] p-4">
      <div className="w-full max-w-3xl p-[2px] rounded-lg bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500 shadow-[0_0_15px_rgba(168,85,247,0.5)]">
        <div className="bg-[#0e0c15] rounded-lg p-6">
          <Table className="w-full border-collapse">
            <TableCaption className="text-indigo-300 mb-4 text-lg">Recent Anonymous Messages</TableCaption>
            <TableHeader>
              <TableRow className="border-b border-indigo-700">
                <TableHead className="w-[120px] text-indigo-200 font-semibold">Anonymous ID</TableHead>
                <TableHead className="text-indigo-200 font-semibold">Last Message</TableHead>
                <TableHead className="w-[120px] text-right text-indigo-200 font-semibold">Time</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {messages.map((message) => (
                <TableRow key={message.id} className="border-b border-indigo-900">
                  <TableCell className="font-medium text-indigo-300">Anonymous ID {message.id}</TableCell>
                  <TableCell className="text-indigo-100">"{message.lastMessage}"</TableCell>
                  <TableCell className="text-right text-indigo-300">🕒 {message.timeElapsed}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
      
    </Section>
  );
};

export default Pricing;
