/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/prop-types */
import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { AiFillLock } from 'react-icons/ai';
import {
  BsPinAngle,
  BsPencil,
  BsTrash,
  BsBellSlash,
} from 'react-icons/bs';
import { GiKnightBanner } from 'react-icons/gi';

const OptionsWrapper = styled.section`
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
  .btn-wrapper {
    padding-top: 0.5em;
    display: flex;
    flex-direction: row;
    justify-content: center;
    background-color: whitesmoke;
    width: 100%;
  }
  .exit-btn {
    background-color: darkgray;
    margin-bottom: 0.4em;
    width: 10%;
    height: 0.5em;
    border-radius: 1em;
    border: none;
  }
  .option-section {
    background-color: whitesmoke;
    display: flex;
    flex-direction: column;
    .options {
      background-color: white;
      display: flex;
      flex-direction: column;
      margin-top: 1em;
      margin-bottom: 1em;
      border-radius: 1em;
    }
    button {
      border: none;
      display: flex;
      flex-direction: row;
    }
  }
`;

function Options({ post, deletePost, setDisplayOptions }) {
  const { user } = useSelector((state) => state);
  const navigate = useNavigate();

  const editPost = (id) => {
    setDisplayOptions(false);
    navigate(`../edit/${id}`);
  };
  const exit = () => {
    setDisplayOptions(false);
  };
  return (
    <OptionsWrapper>
      <section className="btn-wrapper">
        <button className="exit-btn" type="button" onClick={exit} />
      </section>
      {user.uid === post.userid ? (
        <section className="option-section container-fluid">
          <section className="options">
            <button type="button">
              <BsPinAngle /> Pin Post
            </button>
            <button type="button">
              <GiKnightBanner /> Save Post
            </button>
            <button type="button" onClick={() => editPost(post.id)}>
              <BsPencil /> Edit Post
            </button>
            <button type="button">
              <AiFillLock /> Edit Privacy
            </button>
            <button
              type="button"
              onClick={() => deletePost(post.id)}
              className="delete"
            >
              <BsTrash /> Delete Post
            </button>
            <button type="button">
              <BsBellSlash /> Turn off updates for this post
            </button>
          </section>
        </section>
      ) : (
        <section className="option-section">
          <button type="button">Hide Post</button>
        </section>
      )}
    </OptionsWrapper>
  );
}

export default Options;
