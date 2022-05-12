import '../styles/login.css';
import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react';
import { getPeople } from '../utils/api';
const Login = () => {
  const [User, setUser] = useState('');
  const [username, setUsername]= useState('');
  const [password, setPassword]= useState('');
  const [newName, setNewname] = useState('');
  const [newPassword, setNewPassword] =useState('');
  const [failedLogin, setFailedlogin] = useState(null)
  let disabled = false;
  if(!newName || !newPassword){
    disabled=true;
  }

  useEffect(()=> {
    getPeople()
    .then(response => setUser(response.data))
    .catch((err)=> console.log(err));
  },[])
  const navigate = useNavigate();
  const validate = (name, password)=> {
    for(let i in User){
    if(name.toLowerCase() === User[i].username.toLowerCase() && password === User[i].password){
      setFailedlogin(false);
      localStorage.setItem("token", name);
      navigate('/home')
      console.log('valid user');
      console.log(User[i].username)
    }else if (name.length > 0 && password.length > 0 && failedLogin){
      console.log('Invalid login')
    }
  }
  }
  useEffect(()=> {
    validate(username,password);
  }, [validate]);

  const submit = (e)=> {
    e.preventDefault();
    setUsername(newName);
    setPassword(newPassword);
    setNewname('');
    setNewPassword('');
  }
  return (
    <div className='container'>
      <div className='form-container'>

      <h1>Login</h1>
      <form id="form" onSubmit={submit}>
        <label htmlFor='username'>
          Username:
          <input
          value={newName}
          onChange={(e)=> setNewname(e.target.value)}
          />
        </label>
        <label htmlFor='password'>
          Password:
          <input 
          type='password'
          value={newPassword}
          onChange={(e)=> setNewPassword(e.target.value)}
          />
        </label>
      <button type='submit' disabled={disabled}>Login</button>
      </form>
      <hr/>
      <form>

        <Link to="/signup">Signup</Link>
      </form>

      </div>

    </div>
    
  )
}

export default Login