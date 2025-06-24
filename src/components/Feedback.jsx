import React, { useState, useEffect } from "react";
import { db } from "../firebase"; // Correct import path for Firestore db
import { collection, query, where, onSnapshot,addDoc } from "firebase/firestore";
import { Card, CardContent } from "@/components/ui/card"; // Adjust according to your structure
import { Button } from "@/components/ui/button"; // Adjust according to your structure
import { Star } from "lucide-react";

const Feedback = () => {
  const [counselors, setCounselors] = useState([]);
  const [selectedCounselor, setSelectedCounselor] = useState(null);
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");

  // Fetch counselors (users with role = "counselor")
  useEffect(() => {
    const fetchCounselors = async () => {
      try {
        const q = query(collection(db, "users"), where("role", "==", "counselor"));
        const unsubscribe = onSnapshot(q, (snapshot) => {
          const counselorsData = snapshot.docs.map(doc => ({
            id: doc.id,
            email: doc.data().email // Fetch email from Firestore
          }));
          setCounselors(counselorsData);
        });
        return () => unsubscribe();
      } catch (error) {
        console.error("Error fetching counselors:", error);
      }
    };

    fetchCounselors();
  }, []);

  // Submit Feedback for the selected counselor
  const submitFeedback = async () => {
    if (!feedback.trim() || rating === 0 || !selectedCounselor) {
      console.error("Feedback, rating, or counselor selection is missing.");
      return;
    }

    try {
      // Send feedback to Firestore (adjust as per your structure)
      await addDoc(collection(db, "feedback"), {
        counselorId: selectedCounselor.id,
        counselorEmail: selectedCounselor.email, // Send email of the selected counselor
        rating,
        feedback,
        timestamp: new Date()
      });

      console.log("Feedback submitted successfully for", selectedCounselor.email);
      setFeedback("");
      setRating(0);
      setSelectedCounselor(null);
    } catch (error) {
      console.error("Error submitting feedback:", error);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-4">
      <Card>
        <CardContent>
          {/* Feedback Section */}
          <div className="mt-4 p-4 border rounded">
            <h3 className="text-lg mb-2">Rate Your Counselor</h3>

            {/* Counselor Selection Dropdown */}
            <select
              className="border p-2 w-full mb-2"
              value={selectedCounselor?.id || ""}
              onChange={(e) => {
                const counselor = counselors.find(c => c.id === e.target.value);
                setSelectedCounselor(counselor);
              }}
            >
              <option value="">Select a Counselor</option>
              {counselors.length > 0 ? (
                counselors.map(c => (
                  <option key={c.id} value={c.id}>
                    {c.email} {/* Display counselor's email */}
                  </option>
                ))
              ) : (
                <option>No counselors available</option>
              )}
            </select>

            {/* Star Rating */}
            <div className="flex mb-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`cursor-pointer ${rating >= star ? "text-yellow-500" : "text-gray-300"}`}
                  onClick={() => setRating(star)}
                />
              ))}
            </div>

            {/* Feedback Input */}
            <textarea
              className="border p-2 w-full"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Share your feedback..."
            ></textarea>

            {/* Submit Feedback Button */}
            <Button onClick={submitFeedback} className="mt-2 w-full">Submit Feedback</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Feedback;