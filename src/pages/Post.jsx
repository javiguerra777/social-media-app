/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import {
  collection,
  doc,
  getDocs,
  addDoc,
  query,
  where,
} from 'firebase/firestore';

import { useSelector } from 'react-redux/es/exports';
import { BsHandThumbsUp } from 'react-icons/bs';
import { BiMessageAlt } from 'react-icons/bi';
import { TiArrowForwardOutline } from 'react-icons/ti';
import { IoIosArrowBack } from 'react-icons/io';
import styled from 'styled-components';
import { db } from '../firebase/firebase-config';
import { convertUnix } from '../utils/functions';

const PostWrapper = styled.main`
  height: 93vh;
  width: 100vw;
  overflow-y: scroll;
  img {
    width: 3em;
    height: 3em;
    margin-right: 0.5em;
    border-radius: 3em;
  }
  .body-container {
    position: relative;
    top: 4em;
  }
  .comment {
    display: flex;
    flex-direction: column;
    footer {
      align-self: center;
      border-top: #e5e4e2 1px solid;
      border-bottom: #e5e4e2 1px solid;
      width: 98%;
      button {
        width: 33%;
        border: none;
        background: none;
      }
    }
  }
  .com-container {
    display: flex;
    flex-direction: row;
  }
  .comment-foot {
    display: flex;
    flex-direction: row;
    margin-left: 3.5em;
    button {
      border: none;
      background: none;
    }
  }
  .comments {
    display: flex;
    flex-direction: column;
    margin-left: 0.5em;
    margin-top: 0.5em;
  }
  .comment-form {
    background-color: #f5f5f5;
    position: fixed;
    bottom: 7vh;
  }
  .comment-section {
    padding-bottom: 2em;
  }
  .date {
    color: gray;
    font-size: 0.7em;
  }
  .item {
    display: flex;
    flex-direction: row;
    width: 20vw;
    font-size: 14px;
    div {
      margin-left: 0.5em;
    }
  }
  .thecomment {
    background-color: #f0f0f0;
    min-width: auto;
    max-width: 80%;
    border-radius: 1em;
    word-wrap: break-word;
  }
  .top-page {
    background-color: #f5f5f5;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    top: 0;
    z-index: 2;
    height: 3.5em;
    width: 100%;
    .left-content {
      display: flex;
    }
    button {
      background: none;
      border: none;
      margin-right: 1em;
    }
  }
`;
function Post() {
  const navigate = useNavigate();
  const commentCollectionRef = collection(db, 'comments');
  const { user } = useSelector((state) => state);
  const [post, setPost] = useState([]);
  const { id } = useParams();
  const [comment, setComment] = useState('');
  const thePost = doc(db, 'posts', id);
  const [dbData, setDbData] = useState([thePost]);
  const postsCollectionRef = collection(db, 'posts');
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const getDbData = async () => {
      const data = await getDocs(postsCollectionRef);
      setDbData(
        data.docs.map((document) => ({
          ...document.data(),
          id: document.id,
        })),
      );
    };
    getDbData();
  }, [id]);

  useEffect(() => {
    const pData = dbData.find((data) => data.id === id);
    setPost(pData);
  }, [dbData, id]);

  useEffect(() => {
    const q = query(commentCollectionRef, where('postid', '==', id));
    const getComments = async () => {
      const commentsArr = [];
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((document) => {
        commentsArr.push({ ...document.data(), id: document.id });
      });
      setComments(commentsArr);
    };
    getComments();
  }, []);

  const addComment = async (e) => {
    e.preventDefault();
    const newComment = {
      username: user.name,
      userid: user.uid,
      comment,
      date: Date.now(),
      profilepic: user.profilepic,
      postid: post.id,
    };
    await addDoc(commentCollectionRef, newComment);
    setComments([...comments, newComment]);
    setComment('');
  };
  const mentionUser = (oneUser) => {
    setComment(`@${oneUser}`);
  };
  return (
    <PostWrapper className="webkit">
      <header className="top-page">
        <section className="left-content">
          <button onClick={() => navigate('/media')} type="button">
            <IoIosArrowBack />
          </button>
          <img src={post.profilepic} alt="user-pic" />
          <h5>
            {post.username} <br />
            <span className="date">{convertUnix(post.date)}</span>
          </h5>
        </section>
      </header>
      <section className="body-container">
        <section className="comment">
          <section className="container-fluid">
            <h5>{post.title}</h5>
            <p>{post.body}</p>
          </section>
          <footer>
            <button type="button">
              <BsHandThumbsUp /> Like
            </button>
            <button type="button">
              <BiMessageAlt /> Comment
            </button>
            <button type="button">
              <TiArrowForwardOutline /> Share
            </button>
          </footer>
        </section>
        <section className="comment-section">
          {Object.keys(comments).length !== 0 &&
            comments.map((com) => {
              return (
                <section className="comments" key={com.id}>
                  <section className="com-container">
                    <img src={com.profilepic} alt="profile-pic" />
                    <section className="thecomment">
                      <h5>{com.username}</h5>
                      <p>{com.comment}</p>
                    </section>
                  </section>
                  <section className="comment-foot">
                    <section className="item">
                      <p>{convertUnix(com.date)}</p>
                      <div type="button">Like</div>
                      <div
                        type="button"
                        onClick={() => mentionUser(com.username)}
                      >
                        Reply
                      </div>
                    </section>
                  </section>
                </section>
              );
            })}
        </section>
      </section>
      <form className="comment-form" onSubmit={addComment}>
        <label htmlFor="comment">
          <Button
            style={{ backgroundColor: 'blue', color: 'white' }}
            type="submit"
            disabled={comment === ''}
          >
            {' '}
            Add comment
          </Button>{' '}
          <input
            placeholder="Write a comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
          />
        </label>
      </form>
    </PostWrapper>
  );
}

export default Post;
