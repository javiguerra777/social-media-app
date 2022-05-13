import React, {useState, useEffect, useRef} from 'react';
import { getPosts, deleteUserPost, addPost } from '../utils/api';
import { Link } from 'react-router-dom';
const Home = () => {
  const [Post, setPost] = useState([]);
  const [active, setActive] = useState(false);
  const bodyRef = useRef();
  const titleRef = useRef();
  const user = localStorage.getItem('token').toLowerCase();
  let highestId;
  //useEffects
  useEffect(()=> {
    getPosts()
    .then(response => {
      setPost(response.data)})
    .catch((err)=> console.log(err));
  },[]);

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
  })
  
  const changeActive= ()=> {
    if(!active){
      setActive(true);
    }else {
      setActive(false);
    }
  }
  const createNewPost =(e)=> {
    e.preventDefault();
    const title = titleRef.current.value.trim();
    const body = bodyRef.current.value.trim();
    const newPost = {
      title:title,
      body:body,
      username:user,
      id: highestId + 1
    }
    
    addPost(newPost);
    setPost([...Post, newPost]);
    setActive(false);
  }
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
        <button onClick={changeActive}>Create new post</button>
        {active ? <form onSubmit={createNewPost}>
          <label htmlFor='title'>
            Title:
            <input
            type='text'
            id='title'
            name='title'
            placeholder='description of post'
            ref={titleRef}
            />
          </label>
          <label htmlFor='body'>
            Body:
            <input
            type='text'
            id='body'
            name='body'
            placeholder='Your message'
            ref={bodyRef}
            />
          </label>
          <button type='submit'>Submit post</button>
        </form>: ''}
      {userPosts}
      </div>
    </>
  )
}

export default Home