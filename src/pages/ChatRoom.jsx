import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import {
  AiOutlineSend,
  AiOutlineCamera,
  AiOutlineAppstore,
} from 'react-icons/ai';
import { BiHappyBeaming } from 'react-icons/bi';
import { IoIosArrowBack } from 'react-icons/io';
import { FiVideo } from 'react-icons/fi';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux/es/exports';
import {
  doc,
  updateDoc,
  collection,
  getDocs,
  arrayUnion,
} from 'firebase/firestore';
import { nanoid } from 'nanoid';
import { db } from '../firebase/firebase-config';

const ChatRoomWrapper = styled.main`
  background-color: #333333;
  height: 93vh;
  header {
    color: white;
    background-color: #3b3c36;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    button {
      border: none;
      background: none;
      color: #1e90ff;
    }
  }
  footer {
    position: fixed;
    bottom: 7vh;
    width: 100vw;
    button {
      border: none;
      background: none;
      color: white;
      height: 100%;
    }
  }
  .box {
    border: white 2px solid;
    border-radius: 1em;
    height: 100%;
    width: 85vw;
    input {
      background: none;
      border: none;
      width: 95%;
      color: white;
    }
    button {
      width: 5%;
    }
  }
  .form {
    display: flex;
    flex-direction: row;
  }
  .icon {
    width: 5vw;
  }
  .messages-container {
    color: white;
    display: flex;
    flex-direction: column;
  }
  .user {
    align-self: flex-end;
    background-color: #1e90ff;
    margin-right: 0.5em;
  }
  .nonuser {
    background-color: #3b3c36;
    margin-left: 0.5em;
  }
  .onemessage {
    margin-top: 1em;
    min-width: 50%;
    max-width: 75%;
    border-radius: 1em;
    word-wrap: break-word;
  }
`;

function ChatRoom() {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state);
  const { id } = useParams();
  const room = doc(db, 'messages', id);
  const [dbData, setDbData] = useState([room]);
  const messagesCollectionRef = collection(db, 'messages');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [messagesRef, setMessagesRef] = useState({});

  useEffect(() => {
    const getDbData = async () => {
      const data = await getDocs(messagesCollectionRef);
      setDbData(
        data.docs.map((document) => ({
          ...document.data(),
          id: document.id,
        })),
      );
    };
    getDbData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const pData = dbData.find((data) => data.id === id);
    setMessagesRef(pData);
    if (messagesRef.messages) {
      setMessages(messagesRef.messages);
    }
  }, [dbData, id, messagesRef.messages]);
  const returnHome = () => {
    navigate('../messages');
  };
  const sendMessage = async (e) => {
    e.preventDefault();
    const sentMessage = {
      userid: user.uid,
      name: user.name,
      message,
      date: Date.now(),
    };
    await updateDoc(room, {
      date: Date.now(),
      lastMessage: message,
      messages: arrayUnion(sentMessage),
    });
    setMessage('');
    setMessages([...messages, sentMessage]);
  };
  return (
    <ChatRoomWrapper>
      <header>
        <button type="button" onClick={returnHome}>
          <IoIosArrowBack />
        </button>
        <h1>Chatroom name</h1>
        <button type="button">
          <FiVideo />
        </button>
      </header>
      <section className="messages-container">
        {Object.keys(messages).length !== 0 &&
          messages.map((mes) => {
            return (
              <section
                className={
                  user.uid === mes.userid
                    ? 'user onemessage'
                    : 'nonuser onemessage'
                }
                key={nanoid()}
              >
                <p>{mes.message}</p>
              </section>
            );
          })}
      </section>
      <footer>
        <form className="form" onSubmit={sendMessage}>
          <button type="button" className="icon">
            <AiOutlineCamera />
          </button>
          <button type="button" className="icon">
            <AiOutlineAppstore />
          </button>
          <button type="button" className="icon">
            <BiHappyBeaming />
          </button>
          <section className="box">
            <input
              placeholder="Send message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button type="submit">
              {' '}
              <AiOutlineSend />
            </button>
          </section>
        </form>
      </footer>
    </ChatRoomWrapper>
  );
}

export default ChatRoom;
