import './App.css';
import { useState } from 'react';
import Layout from './pages/Layout';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import Edit from './pages/Edit';
import Media from './pages/Media';
import Post from './pages/Post';
import Messages from './pages/Messages';
import NotFound from './pages/NotFound';
import context from './context/context';

import {Routes, Route} from 'react-router-dom';
import Newpost from './pages/Newpost';

function App() {
  const [loggedin, setLoggedin] = useState(false);
  return (
    <context.Provider value={{
      loggedin,
      authenticateLogin: ()=> {if(!loggedin){
        setLoggedin(true);
      }else {
        setLoggedin(false);
      }}
    }}>
    <Routes>
      <Route path='/' element={<Layout/>}>
      <Route index element = {<Login />} />
      <Route path='signup' element={<Signup />} />
      <Route path='home' element={<Home />}/>
      <Route path='edit/:id' element={<Edit/>}/>
      <Route path='media' element={<Media/>}/>
      <Route path='posts/:id' element={<Post />} />
      <Route path="messages" element={<Messages/>} />
      <Route path="newpost" element={<Newpost/>} />
      <Route path='*' element={<NotFound />}/>
      </Route>
    </Routes>
    </context.Provider>
  );
}

export default App;
