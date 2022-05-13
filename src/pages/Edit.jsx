import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { editPost, getPost } from '../utils/api';
const Edit = () => {
  const user = localStorage.getItem('token');
  const [post, setPost] = useState({});
  const {id} = useParams();
  const titleRef = useRef();
  const bodyRef = useRef();
  const navigate = useNavigate();
  let disabled = false;
  if(titleRef === '' || bodyRef === ''){
    disabled = true;
  }

  useEffect(()=> {
    getPost(id)
    .then(({data: post}) => setPost(post))
    .catch((err)=> console.log(err));
  },[getPost, id]);

  const updatePost=()=> {
    const title = titleRef.current.value;
    const body = bodyRef.current.value;
    const post = {
      title: title,
      body: body,
      username: user
    }
    editPost(post, id);
    navigate('/home');
  }
  //console.log(post)
  // console.log(titleRef);
  return (
    <div>
      <form>
        <label htmlFor="newtitle">
          Edit title:
          <input
          ref={titleRef}
          />
        </label>
        <label htmlFor="newbody">
          Edit body:
          <input
          ref={bodyRef}
          />
        </label>
      <button disabled={disabled} onClick={updatePost} > Submit Changes</button>

      </form>
    </div>
  )
}

export default Edit