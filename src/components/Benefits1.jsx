import { benefits } from "../constants";
import Heading from "./Heading";
import Section from "./Section";
import Arrow from "../assets/svg/Arrow";
import { GradientLight } from "./design/Benefits";
import ClipPath from "../assets/svg/ClipPath";
import BlurText from "./ui/BlurText";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

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
];

const upcomingAppointments = [
  { name: "Advaith SK", profileUrl: "/profile/advaith-sk", date: "2025-02-01", time: "10:00 AM" },
  { name: "John Doe", profileUrl: "/profile/john-doe", date: "2025-02-02", time: "2:00 PM" },
  { name: "Jane Smith", profileUrl: "/profile/jane-smith", date: "2025-02-03", time: "4:30 PM" },
];

const Benefits = () => {
  return (
    <Section id="resources">
      {/* Main Wrapper for Content */}
      <div className="flex flex-col lg:flex-row gap-8 px-6 lg:px-24">
        
        {/* Recent Anonymous Messages Box */}
        <div className="flex-1 w-full max-w-3xl bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500 p-2 rounded-lg shadow-lg">
          <div className="bg-[#0e0c15] rounded-lg p-6 border-t-2 border-b-2 border-indigo-700"> {/* Indigo border */}
            <Table className="w-full border-collapse">
              <TableCaption className="text-indigo-300 mb-4 text-lg">
                Recent Anonymous Messages
              </TableCaption>
              <TableHeader>
                <TableRow className="border-b border-indigo-700">
                  <TableHead className="w-[120px] text-indigo-200 font-semibold">
                    Anonymous ID
                  </TableHead>
                  <TableHead className="text-indigo-200 font-semibold">
                    Last Message
                  </TableHead>
                  <TableHead className="w-[120px] text-right text-indigo-200 font-semibold">
                    Time
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {messages.map((message) => (
                  <TableRow key={message.id} className="border-b border-indigo-900">
                    <TableCell className="font-medium text-indigo-300">
                      Anonymous ID {message.id}
                    </TableCell>
                    <TableCell className="text-indigo-100">
                      "{message.lastMessage}"
                    </TableCell>
                    <TableCell className="text-right text-indigo-300">
                      🕒 {message.timeElapsed}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

        {/* Upcoming Appointments Box (Parallel to Recent Messages) */}
        <div
          className="relative p-0.5 bg-no-repeat bg-[length:100%_100%] md:max-w-[20rem] ml-auto mb-8 rounded-lg shadow-lg"
          style={{
            backgroundImage: `url("your-background-image-url-here")`,
          }}
        >
          {/* Indigo Border */}
          <div className="absolute inset-0 rounded-lg border-4 border-indigo-700 z-10" />

          {/* Inner Content */}
          <div className="relative z-20 flex flex-col min-h-[24rem] p-[1.8rem]">
            <h5 className="h5 mb-4 text-white">Upcoming Appointments</h5>

            {/* Appointment List */}
            <ul className="text-indigo-100 space-y-2">
              {upcomingAppointments.map((appointment, index) => (
                <li key={index} className="border-b border-indigo-700 py-2 flex flex-col">
                  {/* Student Name (Clickable Link to Profile with hover effect) */}
                  <a
                    href={appointment.profileUrl}
                    className="font-semibold text-white hover:text-indigo-400 hover:underline"
                  >
                    {appointment.name}
                  </a>
                  <span>📅 {appointment.date} - ⏰ {appointment.time}</span>
                </li>
              ))}
            </ul>

            {/* "Show More" Button (Centered) */}
            <div className="mt-6 flex justify-center">
              <button
                onClick={() => window.location.href = "/appointments"}
                className="bg-indigo-500 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition"
              >
                Show More
              </button>
            </div>
          </div>

          {/* Gradient Light and ClipPath for Styling */}
          <GradientLight />
          <div
            className="absolute inset-0.5 bg-n-8"
            style={{ clipPath: "url(#benefits)" }}
          >
            <div className="absolute inset-0 opacity-0 transition-opacity hover:opacity-10">
              <img
                src="your-image-url-here"
                width={300}
                height={280}
                alt="Upcoming Appointments"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          
          <ClipPath />
        </div>
      </div>

      {/* Benefits Section */}
      <div className="container relative z-2">
        <Heading className="md:max-w-md lg:max-w-2xl" />
        <div className="flex flex-wrap gap-8 mb-12 justify-start">
          {benefits.map((item) => (
            <div
              className={`block relative p-0.5 bg-no-repeat bg-[length:100%_100%] md:max-w-[20rem] ml-auto mb-8`}
              style={{
                backgroundImage: `url(${item.backgroundUrl})`,
              }}
              key={item.id}
            >
              <div className="relative z-2 flex flex-col min-h-[24rem] p-[1.8rem] pointer-events-none">
                <h5 className="h5 mb-4">{item.title}</h5>
                <p className="body-2 mb-4 text-n-3">{item.text}</p>
                <div className="flex items-center mt-auto">
                  <img
                    src={item.iconUrl}
                    width={40}
                    height={40}
                    alt={item.title}
                  />
                  <p className="ml-auto font-code text-xs font-bold text-n-1 uppercase tracking-wider">
                    <a href={item.link}>Explore more</a>
                  </p>
                  <Arrow />
                </div>
              </div>

              {item.light && <GradientLight />}

              <div
                className="absolute inset-0.5 bg-n-8"
                style={{ clipPath: "url(#benefits)" }}
              >
                <div className="absolute inset-0 opacity-0 transition-opacity hover:opacity-10">
                  {item.imageUrl && (
                    <img
                      src={item.imageUrl}
                      width={300}
                      height={280}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
              </div>

              <ClipPath />
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default Benefits;
