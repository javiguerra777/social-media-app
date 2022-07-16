import React, { useEffect, useState } from 'react';
import { getMessages } from '../utils/api';
import { Link } from 'react-router-dom';
export const Messages = ({user}) => {
  const [messages, setMessages] = useState([]);

  useEffect(()=> {
    getMessages()
    .then(response => setMessages(response.data))
    .catch(err => console.log(err));
  },[]);
  const userMessages = messages.filter(message => {
    if(message.username?.toLowerCase() === user){
      return message;
    }
  }).map((message)=> {
    return (
      <div className='card onemessage' key={message.id}>
        <h5>To: {message.to}</h5>
        <p>{message.message}</p>
      </div>
    )
  })
  return (
    <>
    <div>Messages</div>
    <div>
      {userMessages}
      <Link to='/messages'>View all messages</Link>
    </div>
    </>
  )
}
