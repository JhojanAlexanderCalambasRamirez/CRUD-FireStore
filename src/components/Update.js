// src/components/Update.js
import React, { useState } from 'react';
import { db } from '../firebase';
import { doc, updateDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const Update = () => {
  const [userId, setUserId] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const auth = getAuth();

  const handleUpdate = async (e) => {
    e.preventDefault();
    const user = auth.currentUser;
    if (!user) {
      alert('Please sign in to update a user');
      return;
    }
    const userDoc = doc(db, 'users', userId);
    try {
      await updateDoc(userDoc, {
        name: name,
        email: email
      });
      alert('User updated successfully');
    } catch (err) {
      console.error('Error updating document: ', err);
    }
  };

  return (
    <form onSubmit={handleUpdate}>
      <input 
        type="text" 
        placeholder="User ID" 
        value={userId} 
        onChange={(e) => setUserId(e.target.value)} 
      />
      <input 
        type="text" 
        placeholder="Name" 
        value={name} 
        onChange={(e) => setName(e.target.value)} 
      />
      <input 
        type="email" 
        placeholder="Email" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
      />
      <button type="submit">Update User</button>
    </form>
  );
};

export default Update;
