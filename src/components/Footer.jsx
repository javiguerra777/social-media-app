import React, {useState} from 'react';
import { Messages } from './Messages';
import { Button } from 'react-bootstrap';
import '../styles/footer.css'

const Footer = () => {
  const [display, setDisplay] = useState(false);
  const toggleDisplay= () => {
    if(!display){
      setDisplay(true);
    }else {
      setDisplay(false);
    }
  }
  return (
    <footer className='footer text-center text-lg-start bg-light text-muted'>
    <div>
      2022 copyright
    </div>
    <Button onClick={toggleDisplay}>Display messages</Button>
    {display && 
    <div className='messages'>
      <Messages/>
    </div>}
    </footer>
  )
}

export default Footer