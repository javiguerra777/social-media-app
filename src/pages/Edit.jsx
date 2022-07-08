import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { db } from '../firebase/firebase-config';
import { doc, updateDoc } from 'firebase/firestore';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import styled from 'styled-components';

const EditWrapper = styled.main`
height: 85vh;
width: 100vw;
.above-post{
  position: relative;
  top: 0;
  width: 100%;
}
.exit {
  background:transparent;
  border: none;
  color: white;
}
.save-post {
  background-color: #6495ED;
  color: white;
  border: none;
  border-radius: .5em;
  margin-right: .2em;
}
header {
  background-color: #333333;
  color: white;
  display: flex;
  justify-content:space-between;
  align-items: center;
  position:fixed;
  top:0;
  z-index:2;
  height: 3.5em;
  width: 100%;
}
input {
  width: 100%;
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

const Edit = () => {
  const user = useSelector((state)=> state.user);
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
      userid: user.uid,
      useremail: user.email
    }
    await updateDoc(post, editpost);
    navigate('/home');
  }
  return (
    <EditWrapper>
      <header>
        <button className="exit" type="button" onClick={()=>navigate("/media")}>X</button>
        <h4>Edit Post</h4>
        <Button className='save-post' disabled={disabled} onClick={updatePost}>Save</Button>
      </header>
      <section className='above-post'>
        <p><strong>{user.name}</strong></p>
      </section>
      <section className='form container-fluid'>
        <label htmlFor="edittitle">
          Edit title*
          <input
          type='text'
          id='edittitle'
          value={title}
          onChange={(e)=> setTitle(e.target.value)}
          />
        </label>
        <label htmlFor="editbpdy">
          Edit body*
          <textarea
          type='text'
          id='editbody'
          value={body}
          onChange={(e)=> setBody(e.target.value)}
          ></textarea>  
        </label>
      </section>
    </EditWrapper>
  )
}

export default Edit;