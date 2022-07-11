import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase/firebase-config';
import { collection, addDoc } from 'firebase/firestore';
import { useSelector } from 'react-redux/es/exports';
import styled from 'styled-components';

const NewPostWrapper = styled.main`
height: 93vh;
width: 100vw;
.above-post{
  position: relative;
  top: 0;
  width: 100%;
}
.exit {
  background:transparent;
  border: none;
}
.submit-post {
  background-color: #6495ED;
  color: white;
  border: none;
  border-radius: .5em;
  margin-right: .2em;
}
header {
  display: flex;
  justify-content:space-between;
  align-items: center;
  top:0;
  z-index:2;
  height: 3.5em;
  width: 100%;
}
input {
  width: 100%;
  margin-bottom: 1em;
}
.form {
  position:relative;
  display: flex;
  flex-direction: column;
  width: 100%
}
textarea {
  width: 100%;
  max-width: 100%;
  resize:none;
}
button {
  height: 75%;
}
`;

const Newpost = () => {
  const user = useSelector((state) => state.user);
  const postCollection = collection(db, 'posts');
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const navigate = useNavigate();
  let disabled = false;
  if(!title || !body){
    disabled = true;
  }
  const createNewPost =(e)=> {
    e.preventDefault();
    const newPost = {
      title:title,
      body:body,
      userid: user.uid,
      useremail: user.email,
      username: user.name,
      date: Date.now()
    }
    addDoc(postCollection,newPost);
    navigate('/media');
  }
  return (
    <NewPostWrapper>
      <header>
        <button className="exit" type="button" onClick={()=>navigate("/media")}>X</button>
        <h4>Create Post</h4>
        <button className="submit-post" disabled={disabled} type='button' onClick={createNewPost}>Post</button>
      </header>
      <section className='above-post'>
        <p><strong>{user.name}</strong></p>
      </section>
    <section className='form container-fluid'>
          <label htmlFor='title'>
            <input
            type='text'
            id='title'
            name='title'
            placeholder='Title'
            value={title}
            onChange={(e)=> setTitle(e.target.value)}
            />
          </label>
          <label htmlFor='body'>
            <textarea
            type='text'
            id='body'
            name='body'
            placeholder="What's on your mind?"
            rows="5"
            value={body}
            onChange={(e)=> setBody(e.target.value)}
            ></textarea>
          </label>
          <div className='btn-container'>
          </div>
      </section>
    </NewPostWrapper>
  )
}

export default Newpost;