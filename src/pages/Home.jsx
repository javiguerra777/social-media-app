import React, { useState, useEffect } from 'react';
import CreatePost from '../components/CreatePost';
import Posts from '../components/Posts';
import { db } from '../firebase/firebase-config';
import { getDocs, collection, where, query } from 'firebase/firestore';
import { useSelector } from 'react-redux/es/exports';
import styled from 'styled-components';

const HomeWrapper = styled.main`
background-color: #ebeef0;
height: 93vh; 
width: 100vw;
overflow-x: hidden;
overflow-y: scroll;
display: flex;
flex-direction: column;
align-items:center;
.card {
  margin-top: .5em;
  width: 100%;
  header {
    display:flex;
    justify-content:space-between;
  }
}
.image-container {
  postion: relative;
  display:flex;
  flex-direction: column;
  align-items:center;
  width: 100vw;
  #header-image {
    height: 15em;
    width: 99%;
    border-radius: .5em;
  }
  #profile-image {
    height: 10em;
    width: 10em;
    border-radius: 99999em;
    top: -5em;
    position: relative;
  }
}
.main-header {
  display: flex;
  flex-direction:column;
  background-color: white;
  width: 100%;
  align-items: center;
}
.profile-details {
  text-align: center;
}
.body-content {
  position:relative;
  top: -5em;
}
.home-footer {
  background-color: white;
  height: 13em;
  width: 100vw;
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
        <section className='image-container'>
        <img id="header-image" src="https://toppng.com/uploads/preview/cool-backgrounds-hd-11553722962xmab2pqpcv.jpg" alt="header-pic" />
        <img id="profile-image" src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" alt="profile-pic"/>
        </section>
      </header>
      <section className='body-content'>
        <section className='profile-details'>
          <h3>{user.name}</h3>
        </section>
      <CreatePost/>
      <Posts data={posts} setPosts={setPosts} />
      </section>
    </HomeWrapper>
  )
}

export default Home