import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../firebase/firebase-config';
import { collection, addDoc } from 'firebase/firestore';
import styled from 'styled-components';

const SignupWrapper = styled.main`
background: rgb(100,95,175);
background: linear-gradient(90deg, rgba(100,95,175,1) 22%, rgba(166,166,227,1) 52%, rgba(153,202,212,1) 88%);
display: flex;
flex-direction: column;
align-items: center;
height: 100vh;
width: 100vw;
.bottom-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 1em;
}
.form {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.signup-container {
  background-color: #FFFAFA;
  border-radius:.5em;
  margin-top: 2em;
  width: 75%;
  height: auto;
}
header {
  display: flex;
  justify-content: center;
    h1 {
      text-align: center;
      width: 90%;
  }
}
input {
  background-color: #DCDCDC;
  border: none;
}
`;

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
       navigate('/home'); 
    }catch(err){
      console.log(err.message);
    }
  }

  return (
    <SignupWrapper>
    <section className='signup-container'>
      <header>
        <h1>Signup</h1>
      </header>
        <form className='form' onSubmit={createUser}>
          <section className='form-group'>
            <label htmlFor="username">
            <input 
                type='text'
                id='username'
                name='username'
                placeholder='Name*'
                className='form-control'
            onChange={(e)=> setName(e.target.value)}
          />
        </label>
          </section>
          <section className='form-group'>
            <label htmlFor="email">
            <input
                type='email'
                id='email'
                name='email'
                placeholder='Email*'
                className='form-control'
          onChange={(e)=> setRegisterEmail(e.target.value)}
          />
        </label>
          </section>
          <section className='form-group'>
            <label htmlFor="password">
            <input
            type='password'
            id='password'
            name='password'
                placeholder='Password*'
                className='form-control'
            onChange={(e)=> setRegisterPassword(e.target.value)}
            />
        </label>
          </section>

        
        
        
        <section className='btn-container'>
        <Button style={{backgroundColor:"lightblue", color: "white"}} type="submit" disabled ={disabled}>Sign Up</Button>
        </section>
      </form>
      <hr />
      <section className='bottom-container'>
        <p>Already have an account?</p>
        <Link to='/'>Sign In</Link>
        </section>
    </section>
    </SignupWrapper>
  )
}

export default Signup;