import React, { useState } from 'react';
import '../styles/messages.css';
import Thread from '../components/Thread';
import { useSelector, useDispatch } from 'react-redux/es/exports';
import { setSuggestions } from '../store/searchSlice';
import styled from 'styled-components';
import SearchBar from '../components/SearchBar';
const MessageWrapper = styled.main`
`;

export const Messages = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const suggestions = useSelector((state) => state.search.suggestions)
  const [searchInput, setSearchInput] = useState("")
  const [messages, setMessages] = useState([]);
  const [activeMessage, setActiveMessage] = useState(0);
  const showMessage = (id)=> {
    console.log(id);
    setActiveMessage(id);
  }
  const suggestionHandler = (text) => {
    setSearchInput(text);
    dispatch(setSuggestions([]));
  }
  const searchForUser = () => {
    setSearchInput("");
    dispatch(setSuggestions([]))
  }
  return (
    <MessageWrapper>
      <header>
        <SearchBar userInput={searchInput} searchFunc={setSearchInput} />
        <button type='button' onClick={searchForUser}>Start Conversation</button>
      </header>
      {suggestions && suggestions.map((sug, i) => {
        return (
          <section onClick={()=> suggestionHandler(`${sug.name}`)} key={i}>
            {sug.name}
          </section>
        )
      })}
      {messages.length === 0 ? (
        <section>
          <p>start conversation</p>
        </section>
      ) : (
          <div className='messages-container'>
      <section>
        {messages.map(message => {
          return (
      <section className='card onemessage card-message' key={message.id} onClick={() => showMessage(message.id)}>
        <h5>User: {message.thread.toemail === user.email? message.thread.fromemail : message.thread.toemail}</h5>
        <p>{message.thread.message}</p>
      </section>
    )
  })}
      </section>
      <section>
          <Thread activeMessage={activeMessage} messages={messages} user={user}/>
      </section>
    </div>
      )}
      
    </MessageWrapper>
  )
}
export default Messages;