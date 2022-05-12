import './App.css';
import Layout from './pages/Layout';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import {Routes, Route} from 'react-router-dom';
function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout/>}>
      <Route index element = {<Login />} />
      <Route path='signup' element={<Signup />} />
      <Route path='home' element={<Home />} />
      </Route>
    </Routes>
  );
}

export default App;
