import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import {
  doc,
  updateDoc,
  collection,
  getDocs,
} from 'firebase/firestore';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import styled from 'styled-components';
import { db } from '../firebase/firebase-config';

const EditWrapper = styled.main`
  height: 93vh;
  width: 100vw;
  .above-post {
    position: relative;
    top: 0;
    width: 100%;
  }
  .exit {
    background: transparent;
    border: none;
  }
  .save-post {
    background-color: #6495ed;
    color: white;
    border: none;
    border-radius: 0.5em;
    margin-right: 0.2em;
  }
  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    top: 0;
    z-index: 2;
    height: 3.5em;
    width: 100%;
  }
  input {
    width: 100%;
  }
  .form {
    position: relative;
    display: flex;
    flex-direction: column;
    width: 100%;
  }
  textarea {
    width: 100%;
    max-width: 100%;
    resize: none;
  }
  button {
    height: 75%;
  }
`;

function Edit() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const { id } = useParams();
  const [userPost, setUserPost] = useState({});
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const post = doc(db, 'posts', id);
  const [dbData, setDbData] = useState([post]);
  const postsCollectionsRef = collection(db, 'posts');

  useEffect(() => {
    const getDbData = async () => {
      const data = await getDocs(postsCollectionsRef);
      setDbData(
        data.docs.map((document) => ({
          ...document.data(),
          id: document.id,
        })),
      );
    };
    getDbData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    const pData = dbData.find((data) => data.id === id);
    setUserPost(pData);
    setTitle(pData.title);
    setBody(pData.body);
  }, [dbData, id]);

  let disabled = false;
  if (!title || !body) {
    disabled = true;
  }

  const updatePost = async () => {
    const editpost = {
      ...userPost,
      title: title,
      body: body,
      date: Date.now(),
    };
    await updateDoc(post, editpost);
    navigate('/home');
  };
  return (
    <EditWrapper>
      <header>
        <button
          className="exit"
          type="button"
          onClick={() => navigate('/media')}
        >
          X
        </button>
        <h4>Edit Post</h4>
        <Button
          className="save-post"
          disabled={disabled}
          onClick={updatePost}
        >
          Save
        </Button>
      </header>
      <section className="above-post">
        <p>
          <strong>{user.name}</strong>
        </p>
      </section>
      <section className="form container-fluid">
        <label htmlFor="edittitle">
          Edit title*
          <input
            type="text"
            id="edittitle"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <label htmlFor="editbpdy">
          Edit body*
          <textarea
            type="text"
            id="editbody"
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
        </label>
      </section>
    </EditWrapper>
  );
}

export default Edit;
