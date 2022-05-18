import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/firebase-config';
import context from '../context/context';
import { useContext } from 'react';

const Signup = () => {
  const {authenticateLogin} = useContext(context);
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const navigate = useNavigate();
  let disabled = false;

  if(!registerEmail || !registerPassword){
    disabled = true;
  }

  const createUser= async (e) => {
    e.preventDefault();
    try{
      const user = await createUserWithEmailAndPassword(auth, registerEmail, registerPassword);
    }catch(err){
      console.log(err.message);
    }
    authenticateLogin();
    navigate('/home'); 
  }

  return (
    <div>
      <h1>Signup</h1>
      <Link to='/'>Cancel</Link>
      <form onSubmit={createUser}>
        {/* <label htmlFor="username">
          Username:
          <input 
          type='text'
          id='username'
          name='username'
          placeholder='SlimShady67'
          />
        </label> */}
        <label htmlFor="email">
          Email:
          <input
          type='email'
          id='email'
          name='email'
          placeholder='eminem54@gmail.com'
          
          onChange={(e)=> setRegisterEmail(e.target.value)}
          />
        </label>
        <label htmlFor="password">
          Password:
          <input
          type='password'
          id='password'
          name='password'
          placeholder='password'
    
          onChange={(e)=> setRegisterPassword(e.target.value)}
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