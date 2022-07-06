import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { db } from '../firebase/firebase-config';
import { collection, doc, getDocs } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux/es/exports';
import { nanoid } from 'nanoid';
import styled from 'styled-components';

const PostWrapper = styled.main`
background-color: #fffaf0;
height: 85vh;
width: 100vw;
overflow-y:scroll;
margin-bottom: 6em;
.comment {
  position:relative;
}
.comment-form {
  position: fixed;
  bottom: 3em;
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
  height: 3em;
  width: 100%;
}
`;
const Post = () => {
  const navigate = useNavigate();
  const user = useSelector((state)=> state.user)
  const [post, setPost] = useState([]);
  const {id} = useParams();
  const [comment, setComment] = useState('');
  const thePost = doc(db, 'posts', id);
  const [dbData, setDbData] = useState([thePost]);
  const postsCollectionRef = collection(db, "posts");
  const [comments, setComments] = useState([]);
  useEffect(() => {
    const getDbData = async () => {
      const data = await getDocs(postsCollectionRef);
      setDbData(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
    };
    getDbData();
  }, [id]);
  useEffect(() => {
    const pData = dbData.find(data => data.id === id);
    setPost(pData);
  }, [dbData, id]);
  
  const addComment = (e) => {
    e.preventDefault();
    setComments((prev) => [...prev, { id: nanoid(), name: user.name, comment }])
    setComment("")
  }
  return (
    <PostWrapper>
      <header>
        <button onClick={()=> navigate('/home')} type="button">arrow home</button>
        <h4>{post.username}</h4>
      </header>
      <div className='comment'>
      <h5>{post.title}</h5>
      <p>{post.body}</p>
      </div>
    <div>
      
      {comments.map(comment => {
        return (
          <div key={comment.id}>
            <h5>{comment.name}</h5>
            <p>{comment.comment}</p>
      </div>
    )
  })}
    </div>
    <form className='comment-form' onSubmit={addComment}>
    <label>
    <Button style={{backgroundColor:'blue', color:'white'}} type='submit'> Add comment</Button>{' '}
      <input
      placeholder='add comment here'
      value={comment}
      onChange={(e)=> setComment(e.target.value)} 
      required
      />
    </label>
    </form>
    </PostWrapper>
  )
}

export default Post;