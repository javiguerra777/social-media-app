import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { db } from '../firebase/firebase-config';
import { collection, doc, getDocs, addDoc, query, where } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux/es/exports';
import { BsHandThumbsUp } from 'react-icons/bs';
import { BiMessageAlt } from 'react-icons/bi';
import { TiArrowForwardOutline } from 'react-icons/ti';
import {IoIosArrowBack} from 'react-icons/io'
import styled from 'styled-components';
import { convertUnix } from '../utils/functions';

const PostWrapper = styled.main`
height: 93vh;
width: 100vw;
overflow-y:scroll;
 img {
    width: 3em;
    height: 3em;
    margin-right: .5em;
    border-radius: 3em;
  }
  .body-container {
  position: relative;
  top: 4em;
  }
.comment {
  display:flex;
  flex-direction: column;
  footer{
    align-self:center;
    border-top: #e5e4e2 1px solid;
    border-bottom: #e5e4e2 1px solid;
    width: 98%;
    button {
      width: 33%;
      border: none;
      background: none;
    }
  }
}
.com-container {
  display: flex;
  flex-direction: row;
}
.comment-foot {
  display: flex;
  flex-direction: row;
  margin-left: 3.5em;
  button {
    border:none;
    background:none;
  }
}
.comments {
  display: flex;
  flex-direction: column;
  margin-left: .5em;
  margin-top: .5em;
}
.comment-form {
  background-color: #f5f5f5;
  position: fixed;
  bottom: 7vh;
}
.comment-section {
  padding-bottom: 2em;
}
.date {
  color: gray;
  font-size: .7em;
}
.item {
  display: flex;
  flex-direction: row;
  width: 20vw;
  font-size: 14px;
  div {
    margin-left: .5em;
  }
}
.thecomment {
  background-color: #F0F0F0;
  min-width: auto;
  max-width: 80%;
  border-radius: 1em;
  word-wrap: break-word;

}
.top-page {
  background-color: #f5f5f5;
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
    margin-right: 1em;
  }
}
`;
const Post = () => {
  const navigate = useNavigate();
  const commentCollectionRef = collection(db, 'comments');
  const { user } = useSelector((state) => state);
  const [post, setPost] = useState([]);
  const { id } = useParams();
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
    const q = query(commentCollectionRef, where("postid", "==", id));
    const getComments = async () => {
      const comments = []; 
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        comments.push({...doc.data(), id: doc.id})
      });
      setComments(comments);
    }
    getComments();
  }, [])

  const addComment = async (e) => {
    e.preventDefault();
    const newComment = {
      username: user.name,
      comment,
      date: Date.now(),
      profilepic: user.profilepic,
      postid: post.id
    }
    await addDoc(commentCollectionRef, newComment)
    setComments([...comments, newComment]);
    setComment("");
  }
  const mentionUser = (user) => {
    setComment(`@${user}`)
  }
  return (
    <PostWrapper className='webkit'>
      <header className='top-page'>
        <section className='left-content'>
          <button onClick={() => navigate('/media')} type="button"><IoIosArrowBack /></button>
          <img src={post.profilepic} alt="user-pic"/>
          <h5>{post.username} <br />
            <span className='date'>{convertUnix(post.date)}</span>
          </h5>
        </section>
      </header>
      <section className='body-container'>
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
    <section className='comment-section'>
      {comments?.map(comment => {
        return (
          <section className='comments' key={comment.id}>
            <section className='com-container'>
              <img src={comment.profilepic} alt="profile-pic"/>
              <section className='thecomment'>
              <h5>{comment.username}</h5>
                <p>{comment.comment}</p>
              </section>
            </section>
            <section className='comment-foot'>
              <section className='item'>
                <p>{convertUnix(comment.date)}</p>
              <div type="button">Like</div>
              <div type="button" onClick={()=>mentionUser(comment.username)}>Reply</div>
              </section>
            </section>
          </section>
    )
  })}
        </section>
    </section>
    <form className='comment-form' onSubmit={addComment}>
    <label htmlFor='comment'>
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