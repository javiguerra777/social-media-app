import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addPost } from '../utils/api';
import { db, auth } from '../firebase/firebase-config';
import { collection, addDoc } from 'firebase/firestore';

const Newpost = () => {
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
      email: auth.currentUser.email,
    }
    addDoc(postCollection,newPost);
    navigate('/home');
  }
  return (
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
            Body:
            <input
            type='text'
            id='body'
            name='body'
            placeholder='Your message'
            value={body}
            onChange={(e)=> setBody(e.target.value)}
            />
          </label>
          <div className='btn-container'>
          <button disabled={disabled} type='submit'>Submit post</button>
          </div>
        </form>
  )
}

export default Newpost;