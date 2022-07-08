import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { db } from '../firebase/firebase-config';
import { collection, doc, getDocs } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux/es/exports';
import { nanoid } from 'nanoid';
import { BsHandThumbsUp } from 'react-icons/bs';
import { BiMessageAlt } from 'react-icons/bi';
import { TiArrowForwardOutline } from 'react-icons/ti';
import {IoIosArrowBack} from 'react-icons/io'
import styled from 'styled-components';

const PostWrapper = styled.main`
height: 75vh;
width: 100vw;
overflow-y:scroll;
 img {
    width: 3em;
    height: 3em;
    margin-right: .5em;
    border-radius: 3em;
  }
.comment {
  position:relative;
  top: 1px;
  display:flex;
  flex-direction: column;
  footer{
    align-self:center;
    border-top: gray 1px solid;
    border-bottom: gray 1px solid;
    width: 98%;
    button {
      width: 33%;
      border: none;
      background: none;
    }
  }
}
.comments {
  display: flex;
  margin-left: .5em;
  margin-top: .5em;
}
.comment-form {
  position: fixed;
  bottom: 5vh;
}
.thecomment {
  background-color: #F0F0F0;
  min-width: auto;
  max-width: 80%;
  border-radius: 1em;

}
.top-page {
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
  .left-content {
    display:flex;
    }
  button {
    background:none;
    border: none;
    color: white;
    margin-right: 1em;
  }
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
  useEffect(() => {
    setComments(post.comments)
  }, [post])
  const addComment = (e) => {
    e.preventDefault();
    setComments((prev) => [...prev, { id: nanoid(), username: user.name, comment }]);
    setComment("");
  }
  console.log(comments);
  return (
    <PostWrapper className='webkit'>
      <header className='top-page'>
        <section className='left-content'>
          <button onClick={() => navigate('/media')} type="button"><IoIosArrowBack /></button>
          <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" alt="profile picture"/>
          <h5>{post.username}</h5>
        </section>
      </header>
      <section className='comment'>
        <section className='container-fluid'>
          <h5>{post.title}</h5>
          <p>{post.body}</p>
        </section>
        <footer>
          <button><BsHandThumbsUp /> Like</button>
          <button><BiMessageAlt /> Comment</button>
          <button><TiArrowForwardOutline/> Share</button>
        </footer>
      </section>
    <section>
      {comments?.map(comment => {
        return (
          <section className='comments' key={comment.id}>
            <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" alt="profile picture"/>
            <section className='thecomment'>
            <h5>{comment.username}</h5>
            <p>{comment.comment}</p>
            </section>
          </section>
    )
  })}
    </section>
    <form className='comment-form' onSubmit={addComment}>
    <label>
    <Button style={{backgroundColor:'blue', color:'white'}} type='submit' disabled={comment === ""}> Add comment</Button>{' '}
      <input
      placeholder='Write a comment...'
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