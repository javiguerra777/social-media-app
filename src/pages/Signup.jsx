import React, { useRef } from 'react';
import { createNewUser } from '../utils/api';
import { useNavigate } from 'react-router-dom';
const Signup = () => {
 const nameRef = useRef();
 const passwordRef = useRef();
  const navigate = useNavigate();
  let disabled = false;

  if(!nameRef || !passwordRef){
    disabled = true;
  }
  const createUser= (e) => {
    //e.preventDefault();
    const username = nameRef.current.value.trim();
    const password = passwordRef.current.value.trim();
    localStorage.setItem('token', username);
    createNewUser({username, password})
    navigate('/home')
  }
  return (
    <div>
      <h1>Signup</h1>
      <form onSubmit={createUser}>
        <label htmlFor="username">
          Username:
          <input 
          type='text'
          id='username'
          name='username'
          placeholder='SlimShady67'
          ref={nameRef}
          />
        </label>
        <label htmlFor="password">
          Password:
          <input
          type='password'
          id='password'
          name='password'
          placeholder='password'
          ref={passwordRef}
          />
        </label>
      <button type="submit" disabled ={disabled}>Create Profile</button>
      </form>
    </div>
  )
}

export default Signup