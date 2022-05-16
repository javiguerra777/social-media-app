import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { editPost, getPost } from '../utils/api';
import { Button } from 'react-bootstrap';
const Edit = () => {
  const user = localStorage.getItem('token');
  const [post, setPost] = useState({});
  const {id} = useParams();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const navigate = useNavigate();
  let disabled = false;
  if(!title || !body){
    disabled = true;
  }
  useEffect(()=> {
    getPost(id)
    .then(({data: post}) => setPost(post))
    .catch((err)=> console.log(err));
  },[getPost, id]);

  const updatePost=()=> {
    const editpost = {
      title: title,
      body: body,
      username: user
    }
    editPost(editpost, id);
    navigate('/home');
  }
  return (
    <div>
      <form>
        <label htmlFor="newtitle">
          Edit title:
          <input
          type='text'
          id='newtitle'
          value={title}
          onChange={(e)=> setTitle(e.target.value)}
          />
        </label>
        <label htmlFor="newbody">
          Edit body:
          <input
          type='text'
          id='newbody'
          value={body}
          onChange={(e)=> setBody(e.target.value)}
          />
        </label>
        <div className='btn-container'>
        <Button disabled={disabled} onClick={updatePost} > Submit Changes</Button>
        </div>

      </form>
    </div>
  )
}

export default Edit