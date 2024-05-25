// src/components/Create.js
import React, { useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const Create = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const auth = getAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = auth.currentUser;
    if (!user) {
      alert('Please sign in to add a user');
      return;
    }
    try {
      await addDoc(collection(db, 'users'), {
        name: name,
        email: email,
        uid: user.uid
      });
      alert('User added successfully');
    } catch (err) {
      console.error('Error adding document: ', err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
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
      <button type="submit">Add User</button>
    </form>
  );
};

export default Create;
