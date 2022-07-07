import React, { useState, useEffect } from 'react';
import CreatePost from '../components/CreatePost';
import { Link } from 'react-router-dom';
import { Accordion } from 'react-bootstrap';
import { db } from '../firebase/firebase-config';
import { getDocs, collection, deleteDoc, doc, where, query } from 'firebase/firestore';
import { useSelector } from 'react-redux/es/exports';
import { nanoid } from 'nanoid';
import styled from 'styled-components';
import Options from '../components/Options';

const HomeWrapper = styled.main`
background-color: #B0B0B0;
height: 80vh; 
overflow-x: hidden;
overflow-y: scroll;
.card {
  margin-top: .5em;
  header {
    display:flex;
    justify-content:space-between;
  }
}
.main-header {
  background-color: white;
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
        userPosts.push(doc.data());
      });
      setPosts(userPosts);
    }
    getData();
  },[user.uid]);
  const deletePost = async (id) => {
    try {
    // const postRef = doc(db, 'posts', id);
    // await deleteDoc(postRef);

    const remainingPosts = posts.filter((post)=> post.id !== id);
    setPosts(remainingPosts);
    }catch(err){
      console.log(err)
    } 
  }
  return (
    <HomeWrapper>
      <header className='main-header'>
        <h1>{user.name}</h1>
         <CreatePost/>
      </header>
      <div>
      {posts.map((post)=> {
    return (
      <div className='card' key={nanoid()}>
        <header>
          <p>{post.username}</p>
          <Options deletePost={deletePost} post={post}/>
        </header>
      <h5>{post.title}</h5>
      <p>{post.body}</p>
      </div>
    )
  })}
      </div>
    </HomeWrapper>
  )
}

export default Home