import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
const Thread = ({ activeMessage, messages,user }) => {
  const [message, setMessage] = useState('');
  const sendMessage = (e)=> {
    e.preventDefault();
    setMessage("");
  }
  return (
    <div>
      {messages.map((message)=> {
    return (
      <div className={message.thread.toemail !== user.email? 'to' : 'from'} key={message.id} >
        <p>{message.thread.message}</p>
      </div>
    )
  })}
      {activeMessage !== 0 && <form onSubmit={sendMessage}>
      <label htmlFor="send">
        <Button type='submit' style={{backgroundColor:'blue', color:'white'}}> Send</Button>
        <input
        type='text'
        value={message}
        onChange={(e)=> setMessage(e.target.value)}
        />
      </label>
      </form>}
    </div>
  )
}

export default Thread;