import './App.css';
import Layout from './pages/Layout';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import Edit from './pages/Edit';
import Media from './pages/Media';
import Post from './pages/Post';
import Messages from './pages/Messages';
import NotFound from './pages/NotFound';
import {Routes, Route, Navigate} from 'react-router-dom';
import Newpost from './pages/Newpost';
import { useSelector } from 'react-redux/es/exports';

const ProtectedRoute = ({loggedin, children})=> {
  if(!loggedin){
    return <Navigate to="/" replace/>
  }
  return children;
}
function App() {
  const loggedIn = useSelector((state) => state.user.loggedIn);
  return (
    <Routes>
      <Route path='/' element={<Layout/>}>
      <Route index element = {<Login />} />
      <Route path='signup' element={<Signup />} />
      <Route path='home' element={
      <ProtectedRoute loggedin={loggedIn}>
      <Home />
      </ProtectedRoute>} />
      <Route path='edit/:id' element={
      <ProtectedRoute loggedin={loggedIn}>
      <Edit/>
      </ProtectedRoute>}/>
      <Route path='media' element={
      <ProtectedRoute loggedin={loggedIn}>
      <Media/>
      </ProtectedRoute>}/>
      <Route path='posts/:id' element={
      <ProtectedRoute loggedin={loggedIn}>
      <Post />
      </ProtectedRoute>} />
      <Route path="messages" element={
      <ProtectedRoute loggedin={loggedIn}>
      <Messages/>
      </ProtectedRoute>} />
      <Route path="newpost" element={
      <ProtectedRoute loggedin={loggedIn}>
      <Newpost/>
      </ProtectedRoute>} />
      <Route path='*' element={<NotFound />}/>
      </Route>
    </Routes>
  );
}

export default App;
