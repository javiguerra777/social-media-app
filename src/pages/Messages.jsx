/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux/es/exports';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import {
  collection,
  addDoc,
  query,
  where,
  onSnapshot,
} from 'firebase/firestore';
import { nanoid } from 'nanoid';
import { db } from '../firebase/firebase-config';
import { setSuggestions } from '../store/searchSlice';
import SearchBar from '../components/SearchBar';
import { convertUnix } from '../utils/functions';

const MessageWrapper = styled.main`
  height: 93vh;
  overflow-y: scroll;
  .chatroom {
    cursor: pointer;
    border-bottom: 1px solid #e5e4e2;
  }
  .chatroom: hover {
    -webkit-box-shadow: 5px 5px 5px 0px #000000,
      inset 4px 4px 15px 0px #000000,
      5px 5px 37px 5px rgba(0, 0, 0, 0);
    box-shadow: 5px 5px 5px 0px #000000,
      inset 4px 4px 15px 0px #000000,
      5px 5px 37px 5px rgba(0, 0, 0, 0);
  }
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
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state);
  const { suggestions } = useSelector((state) => state.search);
  const messagesCollectionRef = collection(db, 'messages');
  const [searchInput, setSearchInput] = useState('');
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    const q = query(
      messagesCollectionRef,
      where('users', 'array-contains', user.uid),
    );
    const getChatRooms = async () => {
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const chatRooms = [];
        querySnapshot.forEach((document) => {
          chatRooms.push({
            ...document.data(),
            id: document.id,
          });
        });
        setMessages(chatRooms);
      });
    };
    getChatRooms();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.uid]);
  const addChatRoom = async (id) => {
    const messageRoom = {
      users: [user.uid, id],
      date: Date.now(),
    };
    await addDoc(messagesCollectionRef, messageRoom).then(
      (response) => navigate(`../chatroom/${response.id}`),
    );
    setSearchInput('');
    dispatch(setSuggestions([]));
  };
  useEffect(() => {
    dispatch(setSuggestions([]));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // console.log(messages);
  return (
    <MessageWrapper className="webkit">
      <header className="first-header">
        <SearchBar
          userInput={searchInput}
          searchFunc={setSearchInput}
        />
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
        <section className="messages-container container-fluid">
          <section>
            {messages
              .sort((a, b) => (a.date < b.date ? 1 : -1))
              .map((message) => {
                return (
                  <section
                    className="chatroom"
                    onClick={() =>
                      navigate(`../chatroom/${message.id}`)
                    }
                  >
                    <h5>
                      Room:{' '}
                      {message.chatName
                        ? message.chatName
                        : 'chatroom name is undefined'}
                    </h5>
                    {message.lastMessage && (
                      <p>
                        {message.lastMessage.userid === user.uid
                          ? 'You: '
                          : ''}
                        {message.lastMessage.message}{' '}
                        {convertUnix(message.date)}
                      </p>
                    )}
                  </section>
                );
              })}
          </section>
        </section>
      )}
    </MessageWrapper>
  );
}
