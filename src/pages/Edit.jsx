import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { db, auth } from '../firebase/firebase-config';
import {doc, updateDoc} from 'firebase/firestore';
const Edit = () => {
  const {id} = useParams();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const post = doc(db, 'posts', id);
  const navigate = useNavigate();
  let disabled = false;
  if(!title || !body){
    disabled = true;
  }
  
  const updatePost= async ()=> {
    const editpost = {
      title: title,
      body: body,
      email: auth.currentUser.email
    }
    await updateDoc(post, editpost);
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

export default Edit;