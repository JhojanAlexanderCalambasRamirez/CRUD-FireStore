// src/components/Delete.js
import React, { useState } from 'react';
import { db } from '../firebase';
import { doc, deleteDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const Delete = () => {
  const [userId, setUserId] = useState('');
  const auth = getAuth();

  const handleDelete = async (e) => {
    e.preventDefault();
    const user = auth.currentUser;
    if (!user) {
      alert('Please sign in to delete a user');
      return;
    }
    const userDoc = doc(db, 'users', userId);
    try {
      await deleteDoc(userDoc);
      alert('User deleted successfully');
    } catch (err) {
      console.error('Error deleting document: ', err);
    }
  };

  return (
    <form onSubmit={handleDelete}>
      <input 
        type="text" 
        placeholder="User ID" 
        value={userId} 
        onChange={(e) => setUserId(e.target.value)} 
      />
      <button type="submit">Delete User</button>
    </form>
  );
};

export default Delete;
