import '../styles/login.css';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react';
import { Button } from 'react-bootstrap';
import context from '../context/context';
import { useContext } from 'react';
import { auth } from '../firebase/firebase-config';
import { signInWithEmailAndPassword } from 'firebase/auth';
const Login = () => {
  const navigate = useNavigate();
  const {authenticateLogin} = useContext(context);
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
      const user = await signInWithEmailAndPassword(auth, email, password);
      if(user){
        setFailedlogin(false);
        authenticateLogin();
        navigate('/home')
      }
    }catch(err){
      console.log(err.message);
    }
  }
  return (
    <div className='container'>
      {failedLogin && <h1>Failed login, try again</h1>}
      <div className='form-container'>
      <h1>Login</h1>
      <form id="form" onSubmit={login}>
        <div className='form-group'>
        <label htmlFor='email'>
          Email:
          <input
          type='email'
          className='form-control'
          value={email}
          onChange={(e)=> setEmail(e.target.value)}
          />
        </label>
        </div>
       <div className='form-group'>
       <label htmlFor='password'>
          Password:
          <input 
          type='password'
          className='form-control'
          value={password}
          onChange={(e)=> setPassword(e.target.value)}
          />
        </label>
       </div>
       <div className='btn-container'>
      <Button style={{backgroundColor: 'green'}} type='submit' disabled={disabled}>Login</Button>
      </div>
      </form>
      <hr/>
      <form>
        <p>Click Here to Signup: <span><Link to="/signup">Signup</Link></span></p>
      </form>

      </div>

    </div>
    
  )
}

export default Login