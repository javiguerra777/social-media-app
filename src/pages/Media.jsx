/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import CreatePost from '../components/CreatePost';
import Posts from '../components/Posts';
import { db } from '../firebase/firebase-config';
import { collection, getDocs } from 'firebase/firestore';
import styled from 'styled-components';

const MediaWrapper = styled.main`
background-color: #ebeef0;
height: 93vh;
overflow-x:hidden;
overflow-y:scroll;
display: flex;
flex-direction: column;
align-items: center;
padding-bottom: 1em;
width: 100vw;
`;

const Media = () => {
  const [posts, setPosts] = useState([]);
  const postsCollectionsRef = collection(db, 'posts');
  useEffect(() => {
    const getPosts = async () => {
      const data = await getDocs(postsCollectionsRef);
      setPosts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    }
    getPosts();
  }, []);
  return (
    <MediaWrapper className='webkit'>
      <CreatePost/>
      <Posts data={posts} setPosts={setPosts} />
    </MediaWrapper>
  )
};

export default Media;