import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { Button } from 'react-bootstrap';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useDispatch } from 'react-redux/es/hooks/useDispatch';
import {
  getDocs,
  collection,
  where,
  query,
} from 'firebase/firestore';
import styled from 'styled-components';
import { db, auth } from '../firebase/firebase-config';
import {
  toggleLoggedIn,
  updateUser,
  toggleDisplayFooter,
} from '../store/userSlice';

const LoginWrapper = styled.main`
  background: rgb(225, 225, 242);
  background: linear-gradient(
    90deg,
    rgba(225, 225, 242, 1) 7%,
    rgba(208, 208, 252, 1) 33%,
    rgba(166, 166, 227, 1) 58%,
    rgba(103, 137, 249, 1) 73%,
    rgba(54, 101, 218, 1) 87%,
    rgba(4, 79, 230, 1) 100%
  );
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
    align-items: center;
    width: 45%;
    padding-bottom: 10px;
    margin-top: 3em;
  }
  a {
    text-decoration: none;
  }
  button:disabled {
    background-color: #d0d0fc;
    color: white;
    border: none;
  }
  form {
    display: flex;
    flex-direction: column;
  }
  input {
    background-color: #dcdcdc;
    border: none;
    width: 30vw;
    margin-bottom: 1em;
  }
  @media (max-width: 800px) {
    .form-container {
      width: 65%;
    }
    input {
      width: 50vw;
    }
  }
`;
function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userCollectionRef = collection(db, 'users');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [failedLogin, setFailedlogin] = useState(false);
  let disabled = false;
  if (!email || !password) {
    disabled = true;
  }
  const login = async (e) => {
    e.preventDefault();
    try {
      const thisuser = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );
      if (thisuser) {
        const q = query(
          userCollectionRef,
          where('email', '==', email),
        );
        const getData = async () => {
          const userData = [];
          const querySnapshot = await getDocs(q);
          querySnapshot.forEach((doc) => {
            // eslint-disable-next-line no-sequences
            return doc.id, '=>', userData.push(doc.data());
          });
          dispatch(
            updateUser(
              userData[0],
              userData[1],
              userData[2],
              userData[3],
            ),
          );
        };
        getData();
        dispatch(toggleLoggedIn());
        dispatch(toggleDisplayFooter());
        navigate('/media');
      }
    } catch (err) {
      console.log(err.message);
      setFailedlogin(true);
      setPassword('');
    }
  };
  if (failedLogin) {
    setTimeout(() => {
      setFailedlogin(false);
    }, 4000);
  }
  return (
    <LoginWrapper>
      {failedLogin && <h1>Failed login, try again</h1>}
      <section className="form-container">
        <header>
          <h1>Login</h1>
        </header>
        <form id="form" onSubmit={login}>
          <section className="form-group">
            <label htmlFor="email">
              <input
                type="email"
                className="form-control"
                placeholder="Email*"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
          </section>
          <section className="form-group">
            <label htmlFor="password">
              <input
                type="password"
                className="form-control"
                placeholder="Password*"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
          </section>
          <div className="btn-container">
            <Button type="submit" disabled={disabled}>
              Login
            </Button>
          </div>
        </form>
        <hr />
        <section>
          <p>
            Do not have an account?{' '}
            <span>
              <Link className="btn btn-secondary" to="/signup">
                Sign Up
              </Link>
            </span>
          </p>
        </section>
      </section>
    </LoginWrapper>
  );
}

export default Login;
