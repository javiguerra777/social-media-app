/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { useState, useEffect } from 'react';
import '../styles/media.css';
import CreatePost from '../components/CreatePost';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase/firebase-config';
import { collection, getDocs } from 'firebase/firestore';
import { nanoid } from 'nanoid';
import styled from 'styled-components';

const MediaWrapper = styled.main`
background-color: #B0B0B0;
height: 80vh;
overflow-x:hidden;
overflow-y:scroll;
display: flex;
flex-direction: column;
width: 100vw;
.card {
  margin-top: .5em;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  cursor:pointer;
}
.card:hover {
  color: white;
  background-color: black;
}
`;

const Media = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const postsCollectionsRef = collection(db, 'posts');
  useEffect(() => {
    const getPosts = async () => {
      const data = await getDocs(postsCollectionsRef);
      setPosts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    }
    getPosts();
  }, []);
  
  const viewPost = (id) => {
    navigate(`../posts/${id}`)
  }
  return (
    <MediaWrapper>
      <CreatePost />
      {posts.map((post) => {
        return (
          <div className='card' onClick={() => viewPost(post.id)} key={nanoid()}>
            <h4>{post.username}</h4>
            <h5>{post.title} </h5>
            <p>{post.body}</p>
          </div>
        )
      })}
    </MediaWrapper>
  )
};

export default Media;