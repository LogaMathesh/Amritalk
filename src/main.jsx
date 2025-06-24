import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./App";
import App1 from "./App1";
import App2 from "./App2";
import Login from "./components/Login";
import SignUp from "./components/Signup";
import Chat from "./components/Chat";
import PrivateRoute from "./components/PrivateRoute";
import CalendarDemoS from "./components/CalendardemoS";
import CalendarDemoC from "./components/CalendardemoC";
import FeedbackList from "./components/FeedbackList";
import ForumConfirm from "./components/ForumConfirm";
import Forum from "./components/Forum";
import Ollama from "./components/Ollama";
import StudentProfiles from "./components/StudentReport";
import ChatConfirm from "./components/ChatConfirm";
import "./index.css";
import Feedback from "./components/Feedback";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<App1 />} />
        <Route path="/AppointmentS" element={<CalendarDemoS />} />
        <Route path="/AppointmentC" element={<CalendarDemoC />} />
        <Route path="/feedbacklist" element={<FeedbackList />} />
        <Route path="/forumconfirm" element={<ForumConfirm />} />
        <Route path="/forum" element={<Forum />} />
        <Route path="/chatbot" element={<Ollama />} />
        <Route path="/profile" element={<StudentProfiles />} />
        <Route path="/chatconfirm" element={<ChatConfirm />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/student-dashboard" element={<App2 />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route
          path="/chat"
          element={
            <PrivateRoute>
              <Chat />
            </PrivateRoute>
          }
        />
        </Routes>
    </Router>
  </React.StrictMode>
);
