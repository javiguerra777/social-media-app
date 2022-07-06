import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../firebase/firebase-config';
import { collection, addDoc} from 'firebase/firestore';

const Signup = () => {
  const userCollection = collection(db, 'users');
  const [name, setName] = useState("");
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const navigate = useNavigate();
  let disabled = false;

  if(!registerEmail || !registerPassword){
    disabled = true;
  }

  const createUser= async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, registerEmail, registerPassword)
        .then(cred => {
          return addDoc(userCollection, {
            id: cred.user.uid,
            email: registerEmail,
            name: name
          })
        })
      disabled = true;
    }catch(err){
      console.log(err.message);
    }
    navigate('/home'); 
  }

  return (
    <div>
      <h1>Signup</h1>
      <Link to='/'>Cancel</Link>
      <form onSubmit={createUser}>
        <label htmlFor="username">
          Name:
          <input 
            type='text'
            id='username'
            name='username'
            placeholder='SlimShady67'
            onChange={(e)=> setName(e.target.value)}
          />
        </label>
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