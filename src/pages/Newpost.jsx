import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addPost } from '../utils/api';

const Newpost = () => {
  const user = localStorage.getItem('token');
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
      username:user,
    }
    addPost(newPost);
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