import React, { useState } from 'react';
import { createNewUser } from '../utils/api';
import { useNavigate, Link } from 'react-router-dom';
import context from '../context/context';
import { useContext } from 'react';
import { Button } from 'react-bootstrap';
const Signup = () => {
  const {authenticateLogin} = useContext(context);
  const [username, setName] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  let disabled = false;

  if(!username || !password){
    disabled = true;
  }
  const createUser= () => {
    localStorage.setItem('token', username);
    createNewUser({username: username, password: password});
    authenticateLogin();
    navigate('/home');
  }
  return (
    <div>
      <h1>Signup</h1>
      <Link to='/'>Cancel</Link>
      <form onSubmit={createUser}>
        <label htmlFor="username">
          Username:
          <input 
          type='text'
          id='username'
          name='username'
          placeholder='SlimShady67'
          value={username}
          onChange={(e)=> setName(e.target.value)}
          />
        </label>
        <label htmlFor="password">
          Password:
          <input
          type='password'
          id='password'
          name='password'
          placeholder='password'
          value={password}
          onChange={(e)=> setPassword(e.target.value)}
          />
        </label>
        <div className='btn-container'>
        <Button style={{backgroundColor:"lightblue"}} type="submit" disabled ={disabled}>Create Profile</Button>
        </div>
      </form>
    </div>
  )
}

export default Signup;