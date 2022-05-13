import './App.css';
import Layout from './pages/Layout';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import Edit from './pages/Edit';
import Media from './pages/Media';
import Post from './pages/Post';
import NotFound from './pages/NotFound';

import {Routes, Route} from 'react-router-dom';
function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout/>}>
      <Route index element = {<Login />} />
      <Route path='signup' element={<Signup />} />
      <Route path='home' element={<Home />}/>
      <Route path='edit/:id' element={<Edit/>}/>
      <Route path='media' element={<Media/>}/>
      <Route path='posts/:id' element={<Post />} />
      <Route path='*' element={<NotFound />}/>
      </Route>
    </Routes>
  );
}

export default App;
