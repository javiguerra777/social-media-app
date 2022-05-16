import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { getPost } from '../utils/api';
import { Button } from 'react-bootstrap';

const Post = () => {
  const [post, setPost] = useState([]);
  const {id} = useParams();
  const commentRef = useRef();
  const user = localStorage.getItem('token');

  useEffect(()=> {
    getPost(id)
    .then(({data: post}) => setPost(post))
    .catch((err)=> console.log(err));
  },[getPost, id]);

  const postComment = post.comments?.map(comment => {
    return(
      <div key={comment.id}>
        <h5>{comment.username}</h5>
        <p>{comment.comment}</p>
      </div>
    )
  });
  console.log();
  
  const addComment = (e)=> {
  e.preventDefault();  
  const comment = commentRef.current.value;
  console.log(comment);
  }
  return (
    <>
    <div>
      <h4>{post.username}</h4>
      <h5>{post.title}</h5>
      <p>{post.body}</p>
    </div>
    <div>
    {postComment}
    </div>
    <form className='commentform' onSubmit={addComment}>
    <label>
    <Button style={{backgroundColor:'blue', color:'white'}} type='submit'> Add comment</Button>{' '}
      <input
      placeholder='add comment here'
      ref={commentRef}
      required
      />
    </label>
    </form>
    </>
  )
}

export default Post