/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import styled from 'styled-components';
import CreatePost from '../components/CreatePost';
import Posts from '../components/Posts';
import { db } from '../firebase/firebase-config';

const MediaWrapper = styled.main`
  background-color: #ebeef0;
  height: 93vh;
  overflow-x: hidden;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 1em;
  width: 100vw;
`;

function Media() {
  const [posts, setPosts] = useState([]);
  const postsCollectionsRef = collection(db, 'posts');
  useEffect(() => {
    const getPosts = async () => {
      const unsub = await onSnapshot(
        postsCollectionsRef,
        (document) => {
          setPosts(
            document.docs.map((theDoc) => ({
              ...theDoc.data(),
              id: theDoc.id,
            })),
          );
        },
      );
    };
    getPosts();
  }, []);
  return (
    <MediaWrapper className="webkit">
      <CreatePost />
      <Posts data={posts} setPosts={setPosts} />
    </MediaWrapper>
  );
}

export default Media;
