import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux/es/exports';
import { toggleDisplayFooter } from '../store/userSlice';
import CreatePost from '../components/CreatePost';
import Posts from '../components/Posts';
import { db } from '../firebase/firebase-config';
import { getDocs, collection, where, query } from 'firebase/firestore';
import { useSelector } from 'react-redux/es/exports';
import styled from 'styled-components';
import { BsThreeDots, BsFillPlusCircleFill, BsPencilFill } from 'react-icons/bs';

const HomeWrapper = styled.main`
background-color: #ebeef0;
height: 93vh; 
width: 100vw;
overflow-x: hidden;
overflow-y: scroll;
display: flex;
flex-direction: column;
align-items:center;
.buttons {
  background-color: white;
  display: flex;
  flex-direction: row;
  justify-content: center;
  border-bottom: solid 1px #e5e4e2;
  button {
    margin-right: .5em;
    margin-bottom: 1em;
    border: none;
    border-radius: .5em;
    padding: .5em;
  }
}
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
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [userHome, setUserHome] = useState({});
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

  useEffect(() => {
    const userCollectionRef = collection(db, 'users');
    const q = query(userCollectionRef, where("id", "==", user.uid));
    const getUserData = async () => {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUserHome(doc.data());
      });
    };
    getUserData();
  }, [user.uid]);
  const editProfileDetails = () => {
    dispatch(toggleDisplayFooter());
    navigate('../editprofile');
  }
  return (
    <HomeWrapper className='webkit'>
      <header className='main-header'>
        <section className='image-container'>
        <img id="header-image" src="https://toppng.com/uploads/preview/cool-backgrounds-hd-11553722962xmab2pqpcv.jpg" alt="header-pic" />
        <img id="profile-image" src={`${userHome.profilepic}`} alt="profile-pic"/>
        </section>
      </header>
      <section className='body-content'>
        <section className='profile-details'>
          <h3>{userHome.name}</h3>
        </section>
        <section className='buttons'>
          <button type='button' style={{color:"white", backgroundColor:"#0d6efd"}}><BsFillPlusCircleFill/> Add to story</button>
          <button type='button' onClick={editProfileDetails}><BsPencilFill/> Edit Profile</button>
          <button type='button'><BsThreeDots/></button>
        </section>
      <CreatePost/>
      <Posts data={posts} setPosts={setPosts} />
      </section>
    </HomeWrapper>
  )
}

export default Home