import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toggleDisplayFooter } from '../store/userSlice';
import styled from 'styled-components';
import { IoIosArrowBack } from 'react-icons/io';
import { db } from '../firebase/firebase-config';
import { getDocs, collection, where, query, updateDoc } from 'firebase/firestore';


const EditWrapper = styled.main`
height: 100vh;
width: 100vw;
header {
  display: flex;
  flex-direction: row;
  width: 100%;
  button {
    border: none;
    background: none;
    justify-self: flex-start;
  }
}
textarea {
  width: 100%;
  max-width: 100%;
  resize:none;
}
.main-content{
  display: flex;
  flex-direction: column;

  width: 100vw;
  .image-container {
    display: flex;
    flex-direction: row;
    justify-content: center;
    width: 100%;
    .cover {
      height: 15em;
      width: 95%;
    }
    .image {
    height: 10em;
    border-radius: 9em;
    width: 10em;
    }
}
  div {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    button {
      border: none;
      background: none;
      color: blue;
    }
  }
}
`;

const EditProfile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state);
  const userCollectionRef = collection(db, 'users');
  const [data, setData] = useState({})
  const [profilepic, setProfilePic] = useState('');
  const [coverpic, setCoverPic] = useState('');
  const [bio, setBio] = useState('');
  useEffect(() => {
    const q = query(userCollectionRef, where("id", "==", user.uid));
    const getUserData = async () => {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setData(doc.data());
      });
      setCoverPic(data.coverpic);
      setProfilePic(data.profilepic);
    };
    getUserData();
  }, [user.uid]);
 
  const returnHome = () => {
    dispatch(toggleDisplayFooter());
    navigate('../home');
  }
  const editBio = async () => {
    const userInfo = {
      ...data,
      bio
    }
    await updateDoc(userCollectionRef, userInfo);
    setBio('');
  }
  return (
    <EditWrapper>
      <header>
        <button type='button' onClick={returnHome}><IoIosArrowBack /></button>
      </header>
      <section className='main-content'>
        <section>
          <div>
            <h3>Profile Picture</h3>
            <button type='button'>Edit</button>
          </div>
          <div className='image-container'>
            <img className='image' src={profilepic} alt="profile-pic" />
          </div>
        </section>
        <section>
          <div>
            <h3>Cover Photo</h3>
            <button type='button'>Edit</button>
          </div>
          <div className='image-container'>
            <img className='cover' src={coverpic} alt="cover-pic" />
          </div>
        </section>
        <section>
          <div>
            <h3>Bio</h3>
            <button type='button' onClick={editBio}>Edit</button>
          </div>
          <textarea className='container-fluid'
            placeholder='enter bio'
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          >
          </textarea>
        </section>
      </section>
    </EditWrapper>
  )
};

export default EditProfile;