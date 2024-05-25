// src/App.js
import React, { useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import Login from './components/Login';
import Create from './components/Create';
import UploadImage from './components/UploadImage';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const auth = getAuth();

  onAuthStateChanged(auth, (currentUser) => {
    if (currentUser) {
      setUser(currentUser);
    } else {
      setUser(null);
    }
  });

  return (
    <div className="App">
      <h1>Firebase CRUD App</h1>
      {user ? (
        <div>
          <h2>Welcome, {user.email}</h2>
          <Create />
          <UploadImage />
        </div>
      ) : (
        <Login />
      )}
    </div>
  );
}

export default App;
