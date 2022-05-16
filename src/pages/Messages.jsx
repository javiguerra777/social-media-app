import React, { useEffect, useState } from 'react';
import { getMessages } from '../utils/api';
import '../styles/messages.css';
import Thread from '../components/Thread';
export const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [activeMessage, setActiveMessage] = useState(0);
  const user = localStorage.getItem('token');

  useEffect(()=> {
    getMessages()
    .then(response => setMessages(response.data))
    .catch(err => console.log(err));
  },[]);
  const showMessage = (id)=> {
    console.log(id);
    setActiveMessage(id);
  }

  const userMessages = messages.filter(message => {
    if(message.username?.toLowerCase() === user){
      return message;
    }
  }).map((message, index)=> {
    return (
      <div className='card onemessage card-message' key={message.id} onClick={()=>showMessage(message.id)}>
        <h5>To: {message.to}</h5>
        <p>{message.message}</p>
      </div>
    )
  });
  return (
    <>
    <div>Messages</div>
    <div className='messages-container'>
      <div>
      {userMessages}
      </div>
      <div>
      <Thread activeMessage={activeMessage} messages={messages}/>
      </div>
    </div>
    </>
  )
}
export default Messages;