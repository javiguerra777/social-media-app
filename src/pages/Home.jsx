import React, {useState, useEffect, useRef} from 'react';
import { getPosts, deleteUserPost } from '../utils/api';
import { Link } from 'react-router-dom';
import { auth } from '../firebase/firebase-config';
import { onAuthStateChanged} from 'firebase/auth';
const Home = () => {
  const [Post, setPost] = useState([]);
  // const user = localStorage.getItem('token').toLowerCase();
  const [user, setUser]= useState({});
  let highestId;
  //useEffects
  onAuthStateChanged(auth, (currentUser)=> {
    setUser(currentUser);
  });
  useEffect(()=> {
    getPosts()
    .then(response => {
      setPost(response.data)})
    .catch((err)=> console.log(err));
  },[]);
  console.log(user)
  for(let i in Post){
    highestId = Math.max(Post[i].id);
  }
  console.log(highestId);

  const userPosts = Post.filter(post => {
    if(post.username?.toLowerCase() === user){
      return post;
    }
  }).map((post, index)=> {
    return (
      <div className='card' key={post.id}>
      <h5>{post.title} <Link to={`../edit/${[post.id]}`}>Edit Post</Link> <button onClick={()=> deletePost(index, post.id)} className='delete'>x</button></h5>
      <p>{post.body}</p>
      </div>
    )
  });
  const deletePost = (index, id) => {
    const newPosts = Post && Post.filter((element, i) => element.id !== id);
    setPost(newPosts);
    deleteUserPost(id);
  }
  return (
    <>
      <div>
        <h1>Home</h1>
      </div>
      <div>
        <Link to='/newpost'>Create new post</Link>
      {userPosts}
      </div>
    </>
  )
}

export default Home