/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState, useEffect } from 'react';
import '../styles/messages.css';
import { useSelector, useDispatch } from 'react-redux/es/exports';
import styled from 'styled-components';
import { AiOutlineSend } from 'react-icons/ai';
import { nanoid } from 'nanoid';
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
  const user = useSelector((state) => state.user);
  const suggestions = useSelector(
    (state) => state.search.suggestions,
  );
  const [searchInput, setSearchInput] = useState('');
  const [messages, setMessages] = useState([]);

  const suggestionHandler = (text) => {
    setSearchInput(text);
    dispatch(setSuggestions([]));
  };
  // const searchForUser = (user) => {
  //   console.log(user)
  //   setSearchInput("");
  //   dispatch(setSuggestions([]))
  // }
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
              onClick={() => suggestionHandler(`${sug}`)}
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
                  key={message.id}
                >
                  <h5>
                    User:{' '}
                    {message.thread.toemail === user.email
                      ? message.thread.fromemail
                      : message.thread.toemail}
                  </h5>
                  <p>{message.thread.message}</p>
                </section>
              );
            })}
          </section>
        </div>
      )}
    </MessageWrapper>
  );
}
