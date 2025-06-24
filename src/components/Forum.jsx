import React, { useState, useEffect } from "react";
import { db, auth } from "../firebase";
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  where,
  orderBy,
  serverTimestamp,
  doc,
  updateDoc,
} from "firebase/firestore";

const Forum = () => {
  const [topics, setTopics] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [posts, setPosts] = useState([]);
  const [newTopic, setNewTopic] = useState("");
  const [newContent, setNewContent] = useState("");
  const [newPost, setNewPost] = useState("");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch user and topics on component mount
  useEffect(() => {
    const fetchData = async () => {
      const currentUser = auth.currentUser;
      setUser(currentUser ? { email: currentUser.email, id: currentUser.uid } : null);
      setLoading(false);
    };

    const topicsQuery = query(collection(db, "forumTopics"), orderBy("timestamp", "desc"));
    const unsubscribeTopics = onSnapshot(topicsQuery, (snapshot) => {
      setTopics(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });

    fetchData();

    return () => unsubscribeTopics();
  }, []);

  // Fetch posts when a topic is selected
  useEffect(() => {
    if (!selectedTopic) return;
    const postsQuery = query(
      collection(db, "forumPosts"),
      where("topicId", "==", selectedTopic.id),
      orderBy("timestamp", "asc")
    );

    const unsubscribePosts = onSnapshot(postsQuery, (snapshot) => {
      setPosts(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });

    return () => unsubscribePosts();
  }, [selectedTopic]);

  const handleCreateTopic = async (e) => {
    e.preventDefault();
    if (!newTopic.trim() || !newContent.trim()) return;

    try {
      const topicData = {
        title: newTopic,
        content: newContent,
        authorId: user.id,
        authorEmail: user.email,
        timestamp: serverTimestamp(),
      };

      await addDoc(collection(db, "forumTopics"), topicData);
      setNewTopic("");
      setNewContent("");
    } catch (error) {
      console.error("Error creating topic:", error);
    }
  };

  const handleCreatePost = async (e) => {
    e.preventDefault();
    if (!newPost.trim() || !selectedTopic) return;

    try {
      const postData = {
        content: newPost,
        authorId: user.id,
        authorEmail: user.email,
        topicId: selectedTopic.id,
        timestamp: serverTimestamp(),
      };

      await addDoc(collection(db, "forumPosts"), postData);

      // Update the topic's last activity
      const topicRef = doc(db, "forumTopics", selectedTopic.id);
      await updateDoc(topicRef, { timestamp: serverTimestamp() });

      setNewPost("");
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ padding: "20px", maxWidth: "1000px", margin: "0 auto" }}>
      <h1>Forum</h1>
      {!user && <p>Please sign in to participate.</p>}
      {user && (
        <div>
          <div>
            <h2>Create New Topic</h2>
            <form onSubmit={handleCreateTopic} style={{ marginBottom: "20px" }}>
              <input
                type="text"
                placeholder="Topic Title"
                value={newTopic}
                onChange={(e) => setNewTopic(e.target.value)}
                style={{ marginBottom: "10px", padding: "5px", width: "100%" }}
              />
              <textarea
                placeholder="Topic Content"
                value={newContent}
                onChange={(e) => setNewContent(e.target.value)}
                style={{ marginBottom: "10px", padding: "5px", width: "100%" }}
              ></textarea>
              <button type="submit">Create Topic</button>
            </form>
          </div>

          <div style={{ display: "flex", gap: "20px" }}>
            <div style={{ flex: 1 }}>
              <h2>Topics</h2>
              {topics.map((topic) => (
                <div
                  key={topic.id}
                  onClick={() => setSelectedTopic(topic)}
                  style={{
                    padding: "10px",
                    marginBottom: "10px",
                    cursor: "pointer",
                    backgroundColor: selectedTopic?.id === topic.id ? "white" : "black",
                  }}
                >
                  <h3>{topic.title}</h3>
                  <p>by {topic.authorEmail}</p>
                </div>
              ))}
            </div>
            <div style={{ flex: 2 }}>
              {selectedTopic && (
                <>
                  <h2>{selectedTopic.title}</h2>
                  <p>by {selectedTopic.authorEmail}</p>
                  <p>{selectedTopic.content}</p>
                  <hr />
                  <h3>Posts</h3>
                  <div>
                    {posts.map((post) => (
                      <div
                        key={post.id}
                        style={{
                          padding: "10px",
                          marginBottom: "10px",
                          border: "1px solid #ddd",
                        }}
                      >
                        <p>{post.content}</p>
                        <p style={{ fontSize: "0.8em", color: "#666" }}>
                          by {post.authorEmail}
                        </p>
                      </div>
                    ))}
                  </div>
                  <form onSubmit={handleCreatePost}>
                    <textarea
                      placeholder="Write your reply"
                      value={newPost}
                      onChange={(e) => setNewPost(e.target.value)}
                      style={{ marginBottom: "10px", padding: "5px", width: "100%" }}
                    ></textarea>
                    <button type="submit">Post Reply</button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Forum;
