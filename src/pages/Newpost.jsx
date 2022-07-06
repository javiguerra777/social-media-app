import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase/firebase-config';
import { collection, addDoc } from 'firebase/firestore';
import { useSelector } from 'react-redux/es/exports';
import styled from 'styled-components';

const NewPostWrapper = styled.main`
width: 100vw;
header {
  display: flex;
  justify-content:space-between;
}
form {
  display: flex;
  flex-direction: column;
  width: 100%
}
textarea {
  width: 100%;
  max-width: 100%;
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
      username: user.name
    }
    addDoc(postCollection,newPost);
    navigate('/home');
  }
  return (
    <NewPostWrapper>
      <header>
        <button type="button" onClick={()=>navigate("/home")}>X</button>
        <h4>Create Post</h4>
        <button disabled={disabled} type='submit'>Post</button>
      </header>
    <form onSubmit={createNewPost}>
          <label htmlFor='title'>
            Title:
            <input
            type='text'
            id='title'
            name='title'
            placeholder='description of post'
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
            rows="15"
            cols="100vw"
            value={body}
            onChange={(e)=> setBody(e.target.value)}
            ></textarea>
          </label>
          <div className='btn-container'>
          </div>
      </form>
    </NewPostWrapper>
  )
}

export default Newpost;