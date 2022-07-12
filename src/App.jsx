import './App.css';
import Layout from './pages/Layout';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import Edit from './pages/Edit';
import Media from './pages/Media';
import Post from './pages/Post';
import Messages from './pages/Messages';
import Menu from './pages/Menu';
import EditProfile from './pages/EditProfile';
import NotFound from './pages/NotFound';
import {Routes, Route, Navigate} from 'react-router-dom';
import Newpost from './pages/Newpost';
import { useSelector, useDispatch } from 'react-redux/es/exports';
import { setAllUsers } from './store/dataSlice';
import { useEffect } from 'react';
import { db } from './firebase/firebase-config';
import { collection, getDocs } from 'firebase/firestore';
const ProtectedRoute = ({loggedin, children})=> {
  if(!loggedin){
    return <Navigate to="/" replace/>
  }
  return children;
}
function App() {
  const dispatch = useDispatch();
  const loggedIn = useSelector((state) => state.user.loggedIn);
  useEffect(() => {
    const userCollectionRef = collection(db, 'users');
    const getUsers = async () => {
      const data = await getDocs(userCollectionRef);
      dispatch(setAllUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))))
    }
    getUsers();
  }, []);
  return (
    <Routes>
      <Route path='/' element={<Layout/>}>
      <Route index element = {<Login />} />
      <Route path='signup' element={<Signup />} />
      <Route path='home' element={
        <ProtectedRoute loggedin={loggedIn}>
        <Home />
        </ProtectedRoute>}
      />
      <Route path='edit/:id' element={
        <ProtectedRoute loggedin={loggedIn}>
        <Edit/>
        </ProtectedRoute>}
      />
      <Route path='media' element={
        <ProtectedRoute loggedin={loggedIn}>
        <Media/>
        </ProtectedRoute>}
      />
      <Route path='posts/:id' element={
        <ProtectedRoute loggedin={loggedIn}>
        <Post />
        </ProtectedRoute>}
      />
      <Route path="messages" element={
        <ProtectedRoute loggedin={loggedIn}>
        <Messages/>
        </ProtectedRoute>}
      />
      <Route path="newpost" element={
        <ProtectedRoute loggedin={loggedIn}>
        <Newpost/>
        </ProtectedRoute>}
      />
      <Route path="menu" element={
        <ProtectedRoute loggedin={loggedIn}>
        <Menu />
        </ProtectedRoute>}
      />
      <Route path="editprofile" element={
        <ProtectedRoute loggedin={loggedIn}>
        <EditProfile />
        </ProtectedRoute>}
      />
      <Route path='*' element={<NotFound />}/>
      </Route>
    </Routes>
  );
}

export default App;
