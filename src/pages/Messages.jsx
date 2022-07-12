import React, { useState, useEffect } from 'react';
import '../styles/messages.css';
import { useSelector, useDispatch } from 'react-redux/es/exports';
import { setSuggestions } from '../store/searchSlice';
import styled from 'styled-components';
import SearchBar from '../components/SearchBar';
import { AiOutlineSend } from 'react-icons/ai';

const MessageWrapper = styled.main`
height: 93vh;
.first-header {
  display:flex;
  button {
    border: none;
    background:none;
  }
}
.nomessages {
  text-align:center;
}
`;

export const Messages = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const suggestions = useSelector((state) => state.search.suggestions)
  const [searchInput, setSearchInput] = useState("")
  const [messages, setMessages] = useState([]);
  const suggestionHandler = (text) => {
    setSearchInput(text);
    dispatch(setSuggestions([]));
  }
  const searchForUser = () => {
    setSearchInput("");
    dispatch(setSuggestions([]))
  }
  useEffect(() => {
    dispatch(setSuggestions([]))
  }, [])
  return (
    <MessageWrapper>
      <header className='first-header'>
        <SearchBar userInput={searchInput} searchFunc={setSearchInput} />
        <button type='button' onClick={searchForUser}><AiOutlineSend/></button>
      </header>
      {suggestions && suggestions.map((sug, i) => {
        return (
          <section onClick={()=> suggestionHandler(`${sug.name}`)} key={i}>
            {sug.name}
          </section>
        )
      })}
      {messages.length === 0 ? (
        <section className='nomessages'>
          <p>No messages, start a conversation!</p>
        </section>
      ) : (
          <div className='messages-container'>
      <section>
        {messages.map(message => {
          return (
      <section className='card onemessage card-message' key={message.id}>
        <h5>User: {message.thread.toemail === user.email? message.thread.fromemail : message.thread.toemail}</h5>
        <p>{message.thread.message}</p>
      </section>
    )
  })}
      </section>
    </div>
      )}
      
    </MessageWrapper>
  )
}
export default Messages;