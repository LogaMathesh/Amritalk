import {
  benefitIcon1,
  benefitIcon2,
  benefitIcon3,
  benefitIcon4,
  benefitImage2,
  chromecast,
  disc02,
  discord,
  discordBlack,
  facebook,
  figma,
  file02,
  framer,
  homeSmile,
  instagram,
  notification2,
  notification3,
  notification4,
  notion,
  photoshop,
  plusSquare,
  protopie,
  raindrop,
  recording01,
  recording03,
  roadmap1,
  roadmap2,
  roadmap3,
  roadmap4,
  searchMd,
  slack,
  sliders04,
  telegram,
  twitter,
  yourlogo, 
  
} from "../assets";

import logoOne from "../assets/logoOne.svg";
import logotwo from "../assets/logotwo.svg";
import logothree from "../assets/logothree.svg";
import logofour from "../assets/logofour.svg";
import logofive from "../assets/logofive.svg";
import logosix from "../assets/logosix.svg";
import logoseven from "../assets/logoseven.svg";
import logoeight from "../assets/logoeight.svg";


export const navigation = [
  {
    id: "0",
    title: "Resources",
    url: "#resources",
  },
  {
    id: "1",
    title: "Features",
    url: "#feature",
  },
  {
    id: "2",
    title: "Who are we?",
    url: "#pricing",
  },
  {
    id: "3",
    title: "New account",
    url: "#signup",
    onlyMobile: true,
  },
  {
    id: "4",
    title: "Sign in",
    url: "#login",
    onlyMobile: true,
  },
];

export const heroIcons = [homeSmile, file02, searchMd, plusSquare];

export const notificationImages = [notification4, notification3, notification2];

export const companyLogos = [yourlogo, yourlogo, yourlogo, yourlogo, yourlogo];

export const brainwaveServices = [
  "Photo generating",
  "Photo enhance",
  "Seamless Integration",
];

export const brainwaveServicesIcons = [
  recording03,
  recording01,
  disc02,
  chromecast,
  sliders04,
];

export const roadmap = [
  {
    id: "0",
    title: "Voice recognition",
    text: "Enable the chatbot to understand and respond to voice commands, making it easier for users to interact with the app hands-free.",
    date: "May 2023",
    status: "done",
    imageUrl: roadmap1,
    colorful: true,
  },
  {
    id: "1",
    title: "Gamification",
    text: "Add game-like elements, such as badges or leaderboards, to incentivize users to engage with the chatbot more frequently.",
    date: "May 2023",
    status: "progress",
    imageUrl: roadmap2,
  },
  {
    id: "2",
    title: "Chatbot customization",
    text: "Allow users to customize the chatbot's appearance and behavior, making it more engaging and fun to interact with.",
    date: "May 2023",
    status: "done",
    imageUrl: roadmap3,
  },
  {
    id: "3",
    title: "Integration with APIs",
    text: "Allow the chatbot to access external data sources, such as weather APIs or news APIs, to provide more relevant recommendations.",
    date: "May 2023",
    status: "progress",
    imageUrl: roadmap4,
  },
];

export const collabText =
  "With seamless accessibility and uncompromised privacy, it's the ultimate platform for students seeking support and growth.";

export const collabContent = [
  {
    id: "0",
    title: "Enhanced Privacy",
    text: "Your identity remains completely anonymous, ensuring a safe and secure environment for open communication.",
  },
  {
    id: "1",
    title: "Real-Time Assistance",
    text: "Your identity remains completely anonymous, ensuring a safe and secure environment for open communication.",
  },
  {
    id: "2",
    title: "Top-notch Security",
    text:"Connect instantly with your college counselor through secure, real-time chat for timely support.",
  },
];

export const collabApps = [
  {
    id: "0",
    title: "Message",
    icon: logoOne,
    width: 26,
    height: 36,
  },
  {
    id: "1",
    title: "Notification",
    icon: logotwo,
    width: 34,
    height: 36,
  },
  {
    id: "2",
    title: "Security",
    icon: logothree,
    width: 36,
    height: 28,
  },
  {
    id: "3",
    title: "Accessibility",
    icon: logofour,
    width: 34,
    height: 35,
  },
  {
    id: "4",
    title: "Privacy",
    icon: logofive,
    width: 34,
    height: 34,
  },
  {
    id: "5",
    title: "Professionals",
    icon: logosix,
    width: 34,
    height: 34,
  },
  {
    id: "6",
    title: "Health",
    icon: logoseven,
    width: 26,
    height: 34,
  },
  {
    id: "7",
    title: "Medical",
    icon: logoeight,
    width: 38,
    height: 32,
  },
];

export const pricing = [
  {
    id: "0",
    title: "Dr Sarah",
    description: "Empathetic guidance for life’s challenges.",
    price: "0",
    features: [
      "Sarah provides empathetic support through life’s emotional ups and downs.",
      "She helps individuals develop self-awareness and manage stress.",
      "Sarah encourages a balanced approach to handling personal challenges.",
    ],
  },
  {
    id: "1",
    title: "Dr James",
    description: "Practical solutions for managing stress",
    price: "9.99",
    features: [
      "James uses cognitive therapy to address mental health concerns.",
      "He focuses on practical methods to reduce anxiety and stress.",
      "James supports clients in building long-term emotional resilience.",
    ],
  },
  {
    id: "2",
    title: "Dr Emily",
    description: "Mindfulness techniques for personal growth",
    price: 69,
    features: [
      "Emily incorporates mindfulness practices to improve mental clarity.",
      "She empowers clients to explore and develop their inner strength.",
      "Emily helps individuals achieve personal growth and emotional balance.",
    ],
  },
];

export const benefits = [
  {
    id: "0",
    title: "Mind Matters",
    text: "It’s okay to feel lost sometimes; every step forward, no matter how small, counts.",
    backgroundUrl: "./src/assets/benefits/card-1.svg",
    iconUrl: benefitIcon1,
    imageUrl: benefitImage2,
    link: "https://www.health.harvard.edu/topics/mental-health",
  },
  {
    id: "1",
    title: "Hope Ahead",
    text: "You are stronger than the challenges you face; keep going.",
    backgroundUrl: "./src/assets/benefits/card-2.svg",
    iconUrl: benefitIcon2,
    imageUrl: benefitImage2,
    light: true,
  },
  {
    id: "2",
    title: "Stay Strong",
    text: "Pause. Breathe. Begin again with courage.",
    backgroundUrl: "./src/assets/benefits/card-3.svg",
    iconUrl: benefitIcon3,
    imageUrl: benefitImage2,
  },
  {
    id: "3",
    title: "You Matter",
    text: "Your journey matters—progress is progress, no matter the pace.",
    backgroundUrl: "./src/assets/benefits/card-4.svg",
    iconUrl: benefitIcon4,
    imageUrl: benefitImage2,
    light: true,
  },
  {
    id: "4",
    title: "Find Calm",
    text: "It's brave to ask for help; you don’t have to face it all alone.",
    backgroundUrl: "./src/assets/benefits/card-5.svg",
    iconUrl: benefitIcon1,
    imageUrl: benefitImage2,
  },
  {
    id: "5",
    title: "Inner Peace",
    text: "Small steps create big change—trust the process.",
    backgroundUrl: "./src/assets/benefits/card-6.svg",
    iconUrl: benefitIcon2,
    imageUrl: benefitImage2,
  },
];

export const socials = [
  {
    id: "0",
    title: "Discord",
    iconUrl: discordBlack,
    url: "#",
  },
  {
    id: "1",
    title: "Twitter",
    iconUrl: twitter,
    url: "#",
  },
  {
    id: "2",
    title: "Instagram",
    iconUrl: instagram,
    url: "#",
  },
  {
    id: "3",
    title: "Telegram",
    iconUrl: telegram,
    url: "#",
  },
  {
    id: "4",
    title: "Facebook",
    iconUrl: facebook,
    url: "#",
  },
];
