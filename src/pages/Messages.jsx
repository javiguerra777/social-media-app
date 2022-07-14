/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState, useEffect } from 'react';
import '../styles/messages.css';
import { useSelector, useDispatch } from 'react-redux/es/exports';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
} from 'firebase/firestore';
// import { AiOutlineSend } from 'react-icons/ai';
import { nanoid } from 'nanoid';
import { db } from '../firebase/firebase-config';
import { setSuggestions } from '../store/searchSlice';
import SearchBar from '../components/SearchBar';

const MessageWrapper = styled.main`
  height: 93vh;
  .first-header {
    display: flex;
    button {
      border: none;
      background: none;
    }
  }
  .nomessages {
    text-align: center;
  }
  .suggestions {
    cursor: pointer;
  }
`;

export default function Messages() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state);
  const suggestions = useSelector(
    (state) => state.search.suggestions,
  );
  const messagesCollectionRef = collection(db, 'messages');
  const [searchInput, setSearchInput] = useState('');
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    const q = query(
      messagesCollectionRef,
      where('users', 'array-contains', user.uid),
    );
    const getChatRooms = async () => {
      const chatRooms = [];
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        chatRooms.push({ ...doc.data(), id: doc.id });
      });
      setMessages(chatRooms);
    };
    getChatRooms();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.uid]);
  const addChatRoom = async (id) => {
    const messageRoom = {
      users: [user.uid, id],
      date: Date.now(),
    };
    await addDoc(messagesCollectionRef, messageRoom);
    setSearchInput('');
    dispatch(setSuggestions([]));
  };
  useEffect(() => {
    dispatch(setSuggestions([]));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <MessageWrapper>
      <header className="first-header">
        <SearchBar
          userInput={searchInput}
          searchFunc={setSearchInput}
        />
        {/* <button type='button' onClick={()=>searchForUser(searchInput)}><AiOutlineSend/></button> */}
      </header>
      {suggestions &&
        suggestions.map((sug) => {
          return (
            <section
              className="suggestions"
              onClick={() => addChatRoom(`${sug.userid}`)}
              key={nanoid()}
            >
              {sug.name}
            </section>
          );
        })}
      {messages.length === 0 ? (
        <section className="nomessages">
          <p>No messages, start a conversation!</p>
        </section>
      ) : (
        <div className="messages-container">
          <section>
            {messages.map((message) => {
              return (
                <section
                  className="card onemessage card-message"
                  key={nanoid()}
                >
                  <Link to={`../chatroom/${message.id}`}>
                    Go to chatroom
                  </Link>
                </section>
              );
            })}
          </section>
        </div>
      )}
    </MessageWrapper>
  );
}
