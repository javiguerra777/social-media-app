import React, {useState, useEffect} from 'react';
import { getPosts } from '../utils/api';
import { useNavigate } from 'react-router-dom';
const Home = () => {
  const [Post, setPost] = useState([]);
  const navigate = useNavigate();
  const user = localStorage.getItem('token');
  useEffect(()=> {
    getPosts()
    .then(response => {
      setPost(response.data[0])})
    .catch((err)=> console.log(err));
  },[])
  const userPosts = Post.filter(post => {
    if(post.username === user){
      console.log(post)
      return post;
    }
  }).map(post=> {
    return (
      <div key={post.id}>
      <h1>{post.title}</h1>
      <p>{post.body}</p>
      </div>
    )
  });
  const logout=()=> {
    localStorage.removeItem('token');
    navigate('/');
  }
  return (
    <>
      <div>
        <h1>Home</h1>
        <button onClick={logout}>Logout</button>
      </div>
      <div>
      {userPosts}
      </div>
    </>
  )
}

export default Home