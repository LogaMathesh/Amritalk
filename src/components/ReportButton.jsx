import React, { useState } from 'react';
import { Trash2 } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { db } from '../firebase';
import { doc, deleteDoc, collection, query, where, getDocs } from 'firebase/firestore';

const ReportButton = ({ userId, userEmail, onUserDeleted }) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      
      // Delete user document
      await deleteDoc(doc(db, "users", userId));

      // Delete all messages where the user is either sender or receiver
      const messagesRef = collection(db, "messages");
      const senderQuery = query(messagesRef, where("senderId", "==", userId));
      const receiverQuery = query(messagesRef, where("receiverId", "==", userId));

      const senderMessages = await getDocs(senderQuery);
      const receiverMessages = await getDocs(receiverQuery);

      // Delete sender messages
      const deleteSenderPromises = senderMessages.docs.map(doc => deleteDoc(doc.ref));
      // Delete receiver messages
      const deleteReceiverPromises = receiverMessages.docs.map(doc => deleteDoc(doc.ref));

      await Promise.all([...deleteSenderPromises, ...deleteReceiverPromises]);

      // Call the callback to update UI
      onUserDeleted(userId);
    } catch (error) {
      console.error('Error deleting user:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button 
          variant="destructive" 
          size="icon"
          className="hover:bg-destructive/10 hover:text-destructive"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Report and Remove User</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently remove {userEmail} and all their messages from the chat. This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            disabled={isDeleting}
            className="bg-destructive hover:bg-destructive/90"
          >
            {isDeleting ? 'Removing...' : 'Remove User'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ReportButton;
