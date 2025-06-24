import React, { useState, useEffect } from "react";
import { db } from "../firebase"; // Ensure correct import
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";

const FeedbackList = () => {
  const [feedbacks, setFeedbacks] = useState([]);

  // Fetch feedback from Firestore
  useEffect(() => {
    const fetchFeedback = () => {
      const q = query(collection(db, "feedback"), orderBy("timestamp", "desc"));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const feedbackData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setFeedbacks(feedbackData);
      });
      return () => unsubscribe();
    };

    fetchFeedback();
  }, []);

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Counselor Feedback</h2>
      {feedbacks.length > 0 ? (
        feedbacks.map((feedback) => (
          <div key={feedback.id} className="p-4 border rounded mb-2">
            <p><strong>Counselor:</strong> {feedback.counselorEmail}</p>
            <p><strong>Rating:</strong> {feedback.rating} ⭐</p>
            <p><strong>Feedback:</strong> {feedback.feedback}</p>
            <p className="text-gray-500 text-sm">
              {new Date(feedback.timestamp.toDate()).toLocaleString()}
            </p>
          </div>
        ))
      ) : (
        <p>No feedback available.</p>
      )}
    </div>
  );
};

export default FeedbackList;
