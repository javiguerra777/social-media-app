import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { collection, addDoc } from 'firebase/firestore';
import styled from 'styled-components';
import { auth, db } from '../firebase/firebase-config';

const SignupWrapper = styled.main`
  background: rgb(100, 95, 175);
  background: linear-gradient(
    90deg,
    rgba(100, 95, 175, 1) 22%,
    rgba(166, 166, 227, 1) 52%,
    rgba(153, 202, 212, 1) 88%
  );
  display: flex;
  flex-direction: column;
  align-items: flex-end;
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
    background-color: white;
    border-radius: 0.5em;
    width: 25%;
    height: 100vh;
  }
  button {
    margin-top: 1em;
    width: 20vw;
    background: rgb(100, 95, 175);
    background: linear-gradient(
      90deg,
      rgba(100, 95, 175, 1) 22%,
      rgba(166, 166, 227, 1) 52%,
      rgba(153, 202, 212, 1) 88%
    );
    color: white;
    border-radius: 1em;
  }
  header {
    display: flex;
    justify-content: center;
    margin-top: 3em;
    h2 {
      text-align: start;
      width: 90%;
    }
  }
  input {
    width: auto;
    border: none;
    border-bottom: solid 1px gray;
  }

  @media (max-width: 1000px) {
    .signup-container {
      width: 35%;
    }
  }
  @media (max-width: 800px) {
    .signup-container {
      width: 45%;
    }
  }
  @media (max-width: 600px) {
    .signup-container {
      width: 55%;
    }
  }
`;

function Signup() {
  const navigate = useNavigate();
  const userCollection = collection(db, 'users');
  const [name, setName] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  let disabled = false;

  if (!registerEmail || !registerPassword) {
    disabled = true;
  }

  const createUser = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword,
      ).then((cred) => {
        return addDoc(userCollection, {
          userid: cred.user.uid,
          email: registerEmail,
          name: name,
        });
      });
      navigate('/home');
    } catch (err) {
      throw Error(err.message);
    }
  };

  return (
    <SignupWrapper>
      <section className="signup-container">
        <header>
          <h2>Sign Up</h2>
        </header>
        <form className="form" onSubmit={createUser}>
          <section className="form-group">
            <label htmlFor="name">
              Full Name <br />
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Name*"
                className="form-control"
                onChange={(e) => setName(e.target.value)}
              />
            </label>
          </section>
          <section className="form-group">
            <label htmlFor="email">
              Email <br />
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Email*"
                className="form-control"
                onChange={(e) => setRegisterEmail(e.target.value)}
              />
            </label>
          </section>
          <section className="form-group">
            <label htmlFor="password">
              Password <br />
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Password*"
                className="form-control"
                onChange={(e) => setRegisterPassword(e.target.value)}
              />
            </label>
          </section>
          <section className="btn-container">
            <Button type="submit" disabled={disabled}>
              Sign Up
            </Button>
          </section>
        </form>
        <hr />
        <section className="bottom-container">
          <p>Already have an account?</p>
          <Link className="btn btn-secondary" to="/">
            Sign In
          </Link>
        </section>
      </section>
    </SignupWrapper>
  );
}

export default Signup;
