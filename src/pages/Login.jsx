import React from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react';
import { Button } from 'react-bootstrap';
import { auth } from '../firebase/firebase-config';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useDispatch } from 'react-redux/es/hooks/useDispatch';
import { db } from '../firebase/firebase-config';
import { getDocs, collection, where, query } from 'firebase/firestore';
import { toggleLoggedIn, updateUser } from '../store/userSlice';
import styled from 'styled-components';

const LoginWrapper = styled.main`
background: rgb(153,202,212);
background: linear-gradient(90deg, rgba(153,202,212,1) 0%, rgba(155,197,214,1) 0%, rgba(187,186,195,1) 0%, rgba(162,178,222,1) 0%, rgba(28,92,230,1) 0%, rgba(199,199,226,1) 18%, rgba(168,168,225,1) 38%, rgba(167,167,226,1) 53%, rgba(166,166,227,1) 67%, rgba(4,79,230,1) 100%);
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
.form-container {
  border-radius: 1em;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items:center;
  width: 75%;
  padding-bottom: 10px;
  margin-top: 3em;
}
a {
 text-decoration: none;
}
form{
  display: flex;
  flex-direction: column;
}
input {
  background-color: #DCDCDC;
  border: none;
}
`;
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userCollectionRef = collection(db, 'users');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [failedLogin, setFailedlogin] = useState(false);
  let disabled = false;
  if(!email || !password){
    disabled=true;
  }
  const login = async (e)=> {
    e.preventDefault();
    try{
      const thisuser = await signInWithEmailAndPassword(auth, email, password);
      if (thisuser) {
      const q = query(userCollectionRef, where("email", "==", email));
        const getData = async () => {
        const userData = []
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          return (doc.id, "=>", userData.push(doc.data()))
        });
          dispatch(updateUser(userData[0],userData[1],userData[2]))
        }
        getData();
        dispatch(toggleLoggedIn());
        navigate('/media');
      }
    }catch(err){
      console.log(err.message);
      setFailedlogin(true);
      setPassword('');
    }
  }
  if(failedLogin){
    setTimeout(()=>{
      setFailedlogin(false)
    }, 4000)
  }
  return (
    <LoginWrapper>
      {failedLogin && <h1>Failed login, try again</h1>}
      <section className='form-container'>
        <header>
          <h1>Login</h1>
        </header>
      <form id="form" onSubmit={login}>
        <section className='form-group'>
        <label htmlFor='email'>
              <input
                type='email'
                className='form-control'
                placeholder='Email*'
          value={email}
          onChange={(e)=> setEmail(e.target.value)}
          />
        </label>
        </section>
       <section className='form-group'>
       <label htmlFor='password'>
          <input 
          type='password'
                className='form-control'
                placeholder='Password*'
          value={password}
          onChange={(e)=> setPassword(e.target.value)}
          />
        </label>
       </section>
       <div className='btn-container'>
      <Button style={{backgroundColor: 'green', color: 'white'}} type='submit' disabled={disabled}>Login</Button>
      </div>
      </form>
      <hr/>
      <section>
        <p>Don't have an account? <span><Link to="/signup">Signup</Link></span></p>
      </section>
      </section>
    </LoginWrapper>
    
  )
}

export default Login;