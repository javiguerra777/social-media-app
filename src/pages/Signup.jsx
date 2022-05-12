import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const Signup = () => {
  const [name, setName] = useState('');
  const [password, setPassword] =useState('');
  const [newName, setNewname] =useState('');
  const [newPassword, setNewpassword] = useState('');
  const navigate = useNavigate();
  let disabled = false;
  if(!newName || !newPassword){
    disabled = true;
  }
  const createUser= () => {
    setName(newName);
    setPassword(newPassword);
    localStorage.setItem('token', name);
    navigate('/home');
  }
  return (
    <div>
      <h1>Signup</h1>
      <form onSubmit={createUser}>
        <label htmlfor="username">
          Username:
          <input 
          value={newName}
          onChange={(e)=> setNewname(e.target.value)}
          />
        </label>
        <label htmlfor="password">
          Password:
          <input
          value={newPassword}
          onChange={(e)=> setNewpassword(e.target.value)}
          />
        </label>
      <button type="submit" disabled ={disabled}>Create Profile</button>
      </form>
    </div>
  )
}

export default Signup