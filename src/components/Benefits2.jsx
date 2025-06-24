import { useState, useEffect } from "react";
import Section from "./Section";

const quotes = [
  "Your mental health is just as important as your physical health. Take care of both. – Unknown",
  "It's okay to ask for help. You don't have to face everything alone. – Unknown",
  "You are not your illness. You have an individual story to tell. – Julian Seifter",
  "Healing takes time, and asking for help is a courageous step. – Mariska Hargitay",
  "Mental health is not a destination, but a process. It's about how you drive, not where you're going. – Noam Shpancer",
  "You don’t have to control your thoughts. You just have to stop letting them control you. – Dan Millman",
  "Self-care is not selfish. You cannot pour from an empty cup. – Eleanor Brown",
];

const Benefits = () => {
  const [currentQuote, setCurrentQuote] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % quotes.length);
    }, 5000); // Change quote every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <Section id="resources">
      {/* Background Effect */}

      {/* Motivational Quotes */}
      <div className="absolute top-20 left-1/2 transform -translate-x-1/2 w-full max-w-2xl text-center px-6">
        <h2 className="text-2xl font-bold text-indigo-300 mb-4">
          Mental Health Matters 💙
        </h2>
        <p
          key={currentQuote}
          className="text-lg text-white transition-opacity duration-1000 ease-in-out"
        >
          {quotes[currentQuote]}
        </p>
      </div>
    </Section>
  );
};

export default Benefits;
