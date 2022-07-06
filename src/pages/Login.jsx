import '../styles/login.css';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react';
import { Button } from 'react-bootstrap';
import { auth } from '../firebase/firebase-config';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useDispatch } from 'react-redux/es/hooks/useDispatch';
import { db } from '../firebase/firebase-config';
import { getDocs, collection, where, query } from 'firebase/firestore';
import { toggleLoggedIn,updateUser } from '../store/userSlice';
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
        navigate('/home');
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

export default Login;