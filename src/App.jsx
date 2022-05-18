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
import {Routes, Route, Navigate} from 'react-router-dom';
import Newpost from './pages/Newpost';

const ProtectedRoute = ({loggedin, children})=> {
  if(!loggedin){
    return <Navigate to="/" replace/>
  }

  return children;
}
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
      <Route path='home' element={
      <ProtectedRoute loggedin={loggedin}>
      <Home />
      </ProtectedRoute>} />
      <Route path='edit/:id' element={
      <ProtectedRoute loggedin={loggedin}>
      <Edit/>
      </ProtectedRoute>}/>
      <Route path='media' element={
      <ProtectedRoute loggedin={loggedin}>
      <Media/>
      </ProtectedRoute>}/>
      <Route path='posts/:id' element={
      <ProtectedRoute loggedin={loggedin}>
      <Post />
      </ProtectedRoute>} />
      <Route path="messages" element={
      <ProtectedRoute loggedin={loggedin}>
      <Messages/>
      </ProtectedRoute>} />
      <Route path="newpost" element={
      <ProtectedRoute loggedin={loggedin}>
      <Newpost/>
      </ProtectedRoute>} />
      <Route path='*' element={<NotFound />}/>
      </Route>
    </Routes>
    </context.Provider>
  );
}

export default App;
