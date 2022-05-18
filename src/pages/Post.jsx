import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { db } from '../firebase/firebase-config';
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
const Post = () => {
  const [post, setPost] = useState([]);
  const {id} = useParams();
  const commentRef = useRef();
  const thePost = doc(db, 'posts', id);

  useEffect(()=> {
    const getPost = async ()=> {
      const data = await getDoc(thePost);
      setPost(data.docs.map((doc)=> ({...doc.data(), id: doc.id})))
    }
    getPost();
  },[getDoc, id]);
  
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
      <h4>{post.email}</h4>
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