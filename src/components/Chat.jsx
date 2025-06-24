import { useState, useEffect } from "react";
import { db, auth } from "../firebase";
import {
  collection, addDoc, onSnapshot, query, where, 
  orderBy, serverTimestamp, doc, getDoc, getDocs, setDoc
} from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import { 
  Send, LogOut, User, Search, Settings, Menu, 
  MoreVertical, Phone, Video, Pin, Check, Clock 
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Command, CommandInput } from "@/components/ui/command";

import ReportButton from "./ReportButton";

const handleUserDeleted = (deletedUserId) => {
  setUsers(prevUsers => prevUsers.filter(user => user.id !== deletedUserId));
  if (selectedUser?.id === deletedUserId) {
    setSelectedUser(null);
    setMessages([]);
  }
};

const Chat = () => {
  // ... keep existing state and functions ...
const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [currentUserRole, setCurrentUserRole] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);

  const getInitials = (email) => {
    return email
      .split('@')[0]
      .split('.')
      .map(part => part[0].toUpperCase())
      .join('');
  };

  const formatTime = (timestamp) => {
    if (!timestamp) return '';
    const date = timestamp.toDate();
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit'
    });
  };

   // Fetch current user's role
   useEffect(() => {
    const fetchCurrentUserRole = async () => {
      const user = auth.currentUser;
      if (user) {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          setCurrentUserRole(userDoc.data().role);
        }
      }
    };

    fetchCurrentUserRole();
  }, []);

  // Fetch all users
  useEffect(() => {
    const fetchUsers = async () => {
      const usersSnapshot = await getDocs(collection(db, "users"));
      const usersData = usersSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setUsers(usersData);
    };

    fetchUsers();
  }, []);

  // Fetch all messages to populate anonymous users
  useEffect(() => {
    const q = query(collection(db, "messages"), orderBy("timestamp"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const messagesData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      console.log("Messages:", messagesData); // Log fetched messages
      setMessages(messagesData);
    });

    return () => unsubscribe();
  }, []);

  // Filter chat partners based on role
  const getChatPartners = () => {
    const chatPartners = [];

    if (currentUserRole === "student") {
      // Students can only chat with counselors
      chatPartners.push(...users.filter((user) => user.role === "counselor"));
    } else if (currentUserRole === "counselor") {
      // Counselors can chat with all users and anonymous users
      chatPartners.push(...users);

      // Fetch unique anonymous users from messages
      const anonymousUsers = messages
        .filter((message) => message.isAnonymous)
        .map((message) => ({
          id: message.senderId,
          email: "Anonymous",
          role: "anonymous",
        }));

      // Remove duplicate anonymous users
      const uniqueAnonymousUsers = [...new Map(anonymousUsers.map((user) => [user.id, user])).values()];
      chatPartners.push(...uniqueAnonymousUsers);
    }

    return chatPartners;
  };

  // Fetch messages between the current user and the selected user
  useEffect(() => {
    if (!selectedUser) return;

    const currentUserId = auth.currentUser.uid;
    const selectedUserId = selectedUser.id;

    let q;
    if (selectedUserId.startsWith("anonymous_")) {
      // Fetch messages from the selected anonymous user
      q = query(
        collection(db, "messages"),
        where("senderId", "==", selectedUserId),
        where("receiverId", "==", currentUserId),
        orderBy("timestamp")
      );
    } else {
      // Fetch messages between the current user and the selected user
      q = query(
        collection(db, "messages"),
        where("senderId", "in", [currentUserId, selectedUserId]),
        where("receiverId", "in", [currentUserId, selectedUserId]),
        orderBy("timestamp")
      );
    }

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const messagesData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        console.log("Messages:", messagesData); // Log fetched messages
        setMessages(messagesData);
      },
      (error) => {
        console.error("Error in snapshot listener:", error); // Log errors
      }
    );

    return () => unsubscribe();
  }, [selectedUser]);

  // Send a new message
  const sendMessage = async (e) => {
    e.preventDefault();
    if (newMessage.trim() === "" || !selectedUser) {
      console.log("Message is empty or no user is selected.");
      return;
    }

    const currentUser = auth.currentUser;
    if (!currentUser) {
      console.log("No authenticated user.");
      return;
    }

    try {
      console.log("Sending message...");

      let anonymousId = null;
      if (isAnonymous) {
        // Fetch the student's document to check if they already have an anonymous ID
        const studentDoc = await getDoc(doc(db, "users", currentUser.uid));
        if (studentDoc.exists()) {
          anonymousId = studentDoc.data().anonymousId; // Use existing anonymous ID
        }

        // If no anonymous ID exists, generate a new one and save it
        if (!anonymousId) {
          anonymousId = `anonymous_${uuidv4()}`;
          await setDoc(
            doc(db, "users", currentUser.uid),
            { anonymousId },
            { merge: true } // Merge with existing document
          );
          console.log("New anonymous ID generated and saved:", anonymousId);
        }
      }

      const messageData = {
        text: newMessage,
        senderId: isAnonymous ? anonymousId : currentUser.uid, // Use anonymous ID for anonymous messages
        senderEmail: isAnonymous ? "Anonymous" : currentUser.email, // Use "Anonymous" for anonymous messages
        senderRole: currentUserRole,
        receiverId: selectedUser.id,
        receiverEmail: selectedUser.email,
        receiverRole: selectedUser.role,
        timestamp: serverTimestamp(),
        isAnonymous: isAnonymous, // Indicate if the message is anonymous
      };
      console.log("Message data:", messageData); // Log message data
      await addDoc(collection(db, "messages"), messageData);
      console.log("Message sent successfully!");
      setNewMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };
 // Logout function
 const handleLogout = async () => {
  try {
    await auth.signOut();
    setMessages([]); // Clear messages state on logout
    setSelectedUser(null); // Clear selected user
    setCurrentUserRole(""); // Clear role
    if (unsubscribeMessages) unsubscribeMessages(); // Unsubscribe from message listener
    console.log("User logged out successfully.");
  } catch (error) {
    console.error("Error during logout:", error);
  }
};

  return (
    <div className="flex h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Sidebar */}
      <div className="w-80 border-r bg-white/80 backdrop-blur-sm">
        <div className="p-4 border-b">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-purple-900"><a href="javascript:window.history.go(-2)">Home</a></h2>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Options</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" /> Settings
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" /> Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          
          <Command className="rounded-lg border shadow-sm">
            <CommandInput placeholder="Search conversations..." />
          </Command>
        </div>

        <ScrollArea className="h-[calc(100vh-8rem)]">
          <div className="p-2 space-y-1">
            {getChatPartners().map((user) => (
              <button
                key={user.id}
                onClick={() => setSelectedUser(user)}
                className={`w-full rounded-lg p-3 transition-all duration-200
                  hover:bg-purple-50 hover:shadow-md
                  ${selectedUser?.id === user.id ? 'bg-purple-100 shadow-sm' : ''}`}
              >
                <div className="flex items-center space-x-3">
                  <Avatar className="h-12 w-12 border-2 border-white shadow-sm">
                    <AvatarImage src={`https://api.dicebear.com/7.x/personas/svg?seed=${user.email}`} />
                    <AvatarFallback className="bg-gradient-to-br from-purple-400 to-indigo-400 text-white">
                      {getInitials(user.email)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 text-left">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-gray-900">{user.email}</span>
                      <Badge variant={user.role === 'counselor' ? 'default' : 'secondary'} className="ml-2">
                        {user.role}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-500 truncate">
                      {user.lastMessage || 'Start a conversation'}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {selectedUser ? (
          <>
            {/* Chat Header */}
            <div className="h-16 border-b bg-white/80 backdrop-blur-sm px-6 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={`https://api.dicebear.com/7.x/personas/svg?seed=${selectedUser.email}`} />
                  <AvatarFallback>{getInitials(selectedUser.email)}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold text-gray-900">{selectedUser.email}</h3>
                  <p className="text-sm text-gray-500">Active now</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
              {currentUserRole === "counselor" && (
      <ReportButton 
        userId={selectedUser.id}
        userEmail={selectedUser.email}
        onUserDeleted={handleUserDeleted}
      />)}
                
              </div>
            </div>

            {/* Messages Area */}
            <ScrollArea className="flex-1 p-6">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.senderId === auth.currentUser?.uid ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    <div className="flex items-end space-x-2">
                      {message.senderId !== auth.currentUser?.uid && (
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={`https://api.dicebear.com/7.x/personas/svg?seed=${message.senderEmail}`} />
                          <AvatarFallback>{getInitials(message.senderEmail)}</AvatarFallback>
                        </Avatar>
                      )}
                      <div
                        className={`max-w-md rounded-2xl p-4 shadow-sm ${
                          message.senderId === auth.currentUser?.uid
                            ? 'bg-gradient-to-br from-purple-500 to-indigo-600 text-white'
                            : 'bg-white'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className={`text-sm font-medium ${
                            message.senderId === auth.currentUser?.uid ? 'text-purple-100' : 'text-gray-500'
                          }`}>
                            {message.isAnonymous ? 'Anonymous' : message.senderEmail}
                          </span>
                          <span className={`text-xs ml-2 ${
                            message.senderId === auth.currentUser?.uid ? 'text-purple-200' : 'text-gray-400'
                          }`}>
                            {formatTime(message.timestamp)}
                          </span>
                        </div>
                        <p className={message.senderId === auth.currentUser?.uid ? 'text-white' : 'text-gray-800'}>
                          {message.text}
                        </p>
                        <div className="flex items-center justify-end mt-1">
                          <Check className="h-4 w-4 text-purple-200" />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            {/* Message Input */}
            <div className="p-4 bg-white/80 backdrop-blur-sm border-t">
              <form onSubmit={sendMessage} className="flex items-center space-x-4">
                {currentUserRole === "student" && (
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="anonymous"
                      checked={isAnonymous}
                      onCheckedChange={setIsAnonymous}
                    />
                    <label htmlFor="anonymous" className="text-sm text-gray-600">
                      Send anonymously
                    </label>
                  </div>
                )}
                <div className="flex-1">
                  <Input
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type your message..."
                    className="border-0 bg-gray-100 focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <Button type="submit" className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700">
                  <Send className="h-4 w-4 mr-2" />
                  Send
                </Button>
              </form>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Welcome to Chat</h3>
              <p className="text-gray-500">Select a conversation to start messaging</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Chat;
