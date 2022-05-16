import React from 'react';
import { useState, useEffect } from 'react';
import { getPosts } from '../utils/api';
import '../styles/media.css';
import { Link } from 'react-router-dom';

const Media = () => {
  const [posts, setPosts] = useState([]);
  useEffect(()=> {
    getPosts()
    .then(response => setPosts(response.data))
    .catch(err=> console.log(err))
  },[]);

  return (
    <div>
      {posts.map((post)=> {
        return( 
          <>
          <div className='card' key={post.id}>
            <h4>{post.username}</h4>
            <h5>{post.title} <Link to={`../posts/${[post.id]}`} >View Post</Link> </h5>
            <p>{post.body}</p>
          </div>
          </>
        )
      })}
    </div>
  )
}

export default Media