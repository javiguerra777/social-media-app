import React, { useState, useEffect } from 'react';
import CreatePost from '../components/CreatePost';
import { Accordion } from 'react-bootstrap';
import Posts from '../components/Posts';
import { db } from '../firebase/firebase-config';
import { getDocs, collection, deleteDoc, doc, where, query } from 'firebase/firestore';
import { useSelector } from 'react-redux/es/exports';
import styled from 'styled-components';

const HomeWrapper = styled.main`
background-color: #ebeef0;
height: 88vh; 
width: 100vw;
overflow-x: hidden;
overflow-y: scroll;
display: flex;
flex-direction: column;
align-items:center;
padding-bottom: 1em;
.card {
  margin-top: .5em;
  width: 100%;
  header {
    display:flex;
    justify-content:space-between;
  }
}
.main-header {
  background-color: white;
  width: 100%;
  h1 {
    text-align:center;
  }
}
`;

const Home = () => {
  const user = useSelector((state)=> state.user);
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const postsCollectionsRef = collection(db, 'posts');
    const q = query(postsCollectionsRef, where("userid", "==", user.uid));
    const getData = async () => {
      const userPosts = [];
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        userPosts.push({...doc.data(), id: doc.id});
      });
      setPosts(userPosts);
    }
    getData();
  }, [user.uid]);
  return (
    <HomeWrapper className='webkit'>
      <header className='main-header'>
        <h1>{user.name}</h1>
         <CreatePost/>
      </header>
      <Posts data={posts} setPosts={setPosts} />
    </HomeWrapper>
  )
}

export default Home