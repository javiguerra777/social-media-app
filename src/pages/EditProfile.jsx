import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toggleDisplayFooter, updatePicture } from '../store/userSlice';
import styled from 'styled-components';
import { IoIosArrowBack } from 'react-icons/io';
import { db } from '../firebase/firebase-config';
import { getDocs, collection, where, query, setDoc, doc } from 'firebase/firestore';


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
    flex-direction: column;
    align-items: center;
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
    input {
      margin-left: .5em;
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
  const [data, setData] = useState({})
  const [bio, setBio] = useState('');
  const [profilePic, setProfilePic] = useState('');
  const [headerPic, setHeaderPic] = useState('')
  useEffect(() => {
    const userCollectionRef = collection(db, 'users');
    const q = query(userCollectionRef, where("id", "==", user.uid));
    const getUserData = async () => {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setData({...doc.data(), docid: doc.id});
      });
    };
    getUserData();
  }, [user.uid]);
  const returnHome = () => {
    dispatch(toggleDisplayFooter());
    navigate('../home');
  }
  const editProfile = async (newdata, option) => {
    switch (option){
      case "bio":
        await setDoc(doc(db, 'users', data.docid), {
          ...data, bio: newdata
        });
        break;
      case "profile":
        await setDoc(doc(db, 'users', data.docid), {
          ...data, profilepic: newdata
        });
        dispatch(updatePicture(newdata));
        break;
      case "header":
        await setDoc(doc(db, 'users', data.docid), {
          ...data, coverpic: newdata
        });
        break;
      default:
        return "Not valid choice";
    }
  }
  return (
    <EditWrapper className='webkit'>
      <header>
        <button type='button' onClick={returnHome}><IoIosArrowBack /></button>
      </header>
      <section className='main-content container-fluid'>
        <section>
          <div>
            <h3>Profile Picture</h3>
            <button type='button' onClick={()=>editProfile(profilePic, "profile")}>Edit</button>
          </div>
          <div className='image-container'>
            <img className='image' src={data.profilepic} alt="profile-pic" />
            <label>
              Submit a photo hyperlink:
              <input
                type="url"
                placeholder='www.photoreference.com'
                value={profilePic}
                onChange={(e)=> setProfilePic(e.target.value)}
              />
            </label>
          </div>
        </section>
        <section>
          <div>
            <h3>Cover Photo</h3>
            <button type='button' onClick={()=> editProfile(headerPic, "header")}>Edit</button>
          </div>
          <div className='image-container'>
            <img className='cover' src={data.coverpic} alt="cover-pic" />
            <label>
              Submit a photo hyperlink:
              <input
                type="url"
                placeholder='www.photoreference.com'
                value={headerPic}
                onChange={(e)=> setHeaderPic(e.target.value)}
              />
            </label>
          </div>
        </section>
        <section>
          <div>
            <h3>Bio</h3>
            <button type='button' onClick={()=>editProfile(bio, "bio")}>Edit</button>
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