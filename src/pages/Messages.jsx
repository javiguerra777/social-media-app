import React, { useState } from 'react';
import '../styles/messages.css';
import Thread from '../components/Thread';
import { useSelector } from 'react-redux/es/exports';

export const Messages = () => {
  const { user } = useSelector((state)=> state.user)
  const [messages] = useState([]);
  const [activeMessage, setActiveMessage] = useState(0);
  
  const showMessage = (id)=> {
    console.log(id);
    setActiveMessage(id);
  }
  return (
    <>
    <div>Messages</div>
    <div className='messages-container'>
      <div>
        { messages.map(message => {
    return (
      <div className='card onemessage card-message' key={message.id} onClick={() => showMessage(message.id)}>
        <h5>User: {message.thread.toemail === user.email? message.thread.fromemail : message.thread.toemail}</h5>
        <p>{message.thread.message}</p>
      </div>
    )
  })}
      </div>
      <div>
          <Thread activeMessage={activeMessage} messages={messages} user={user}/>
      </div>
    </div>
    </>
  )
}
export default Messages;