import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
 const [username, setUsername] = useState('');
 const [password, setPassword] = useState('');
 const [message, setMessage] = useState('');
 const handleSubmit = async (e) => {
 e.preventDefault();
 try {
 const response = await axios.post('http://localhost:5000/login', {
username, password });
 setMessage(response.data.message);
 }
 catch (error) {
 console.error(error);
 }
 };
 return (
 <div>
 <h1>Login</h1>
 <form onSubmit={handleSubmit}>
 <input type="text" placeholder="Username" value={username}
onChange={(e) => setUsername(e.target.value)}/>
 <input type="text" placeholder="Password" value={password}
onChange={(e) => setPassword(e.target.value)}/>
 <button type="submit">Login</button>
 </form>
 {message && <p>{message}</p>}
 </div>
 );
}

export default App;