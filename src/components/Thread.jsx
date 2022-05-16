import React, {useEffect, useState} from 'react';
import { Button } from 'react-bootstrap';

const Thread = ({activeMessage, messages}) => {
  const [message, setMessage] = useState('');
  const [userInput, setUserInput] = useState('');
  const thisMessage = messages.filter(message => {
    if(message.id === activeMessage){
      return message;
    }
  }).map((message, index)=> {
    return (
      <div className='' key={message.id} >
        <h5>{message.to}</h5>
        <p>{message.message}</p>
      </div>
    )
  });
  useEffect(()=> {
    setMessage(userInput)
  },[message])
  const sendMessage = (e)=> {
    e.preventDefault();
    setMessage(userInput);
    setUserInput('');
  }
  console.log(message);
  return (
    <div>
      {thisMessage}
      {activeMessage !== 0 && <form onSubmit={sendMessage}>
      <label htmlFor="send">
        <Button type='submit' style={{backgroundColor:'blue', color:'white'}}> Send</Button>
        <input
        type='text'
        value={userInput}
        onChange={(e)=> setUserInput(e.target.value)}
        />
      </label>
      </form>}
    </div>
  )
}

export default Thread