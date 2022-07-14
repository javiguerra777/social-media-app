/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';
import {
  doc,
  updateDoc,
  addDoc,
  collection,
  arrayUnion,
} from 'firebase/firestore';
import { db } from '../firebase/firebase-config';

const ShareWrapper = styled.section`
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  position: fixed;
  overflow: hidden;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  z-index: 2;
  .exit-btn {
    align-self: center;
    margin-bottom: 0.4em;
    width: 10%;
    height: 0.75em;
    border-radius: 1em;
    border: none;
  }
  .share-section {
    background-color: white;
    display: flex;
    flex-direction: column;
    .inputs {
      display: flex;
      flex-direction: column;
      border-bottom: solid black 1px;
      width: 100%;
      margin-bottom: 1em;
    }
    .share-btn {
      background-color: #1e90ff;
      color: white;
      border: none;
      width: 15%;
      align-self: flex-end;
      margin-right: 1em;
      margin-bottom: 1em;
    }
  }
  input {
    width: 100%;
    margin-bottom: 1em;
    border: none;
  }
  textarea {
    width: 100%;
    max-width: 100%;
    resize: none;
    border: none;
    margin-bottom: 1em;
  }
`;
export default function Share({ setDisplayShared, post }) {
  const { user } = useSelector((state) => state);
  const thisPost = doc(db, 'posts', post.id);
  const postCollection = collection(db, 'posts');
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const exit = () => {
    setDisplayShared(false);
  };
  const share = async () => {
    const newPost = {
      shared: post,
      userid: user.uid,
      useremail: user.email,
      username: user.name,
      date: Date.now(),
      profilepic: user.profilepic,
      title,
      body,
    };
    const sharedBy = {
      userid: user.uid,
      useremail: user.email,
      username: user.name,
      profilepic: user.profilepic,
      date: Date.now(),
    };
    await updateDoc(thisPost, {
      sharedBy: arrayUnion(sharedBy),
    });
    await addDoc(postCollection, newPost);
    setDisplayShared(false);
  };
  return (
    <ShareWrapper>
      <button className="exit-btn" type="button" onClick={exit} />
      <section className="share-section">
        <header>
          <h4>{user.name}</h4>
        </header>
        <section className="inputs">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            name="message"
            id="message"
            placeholder="Say something about this"
            rows="5"
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
          <Button className="share-btn" type="button" onClick={share}>
            Share Now
          </Button>
        </section>
      </section>
    </ShareWrapper>
  );
}
