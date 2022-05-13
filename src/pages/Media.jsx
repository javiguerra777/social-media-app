import React from 'react';
import { useState, useEffect } from 'react';
import { getPosts } from '../utils/api';
import '../styles/media.css';
const Media = () => {
  const [posts, setPosts] = useState([]);
  
  useEffect(()=> {
    getPosts()
    .then(response => setPosts(response.data))
    .catch(err=> console.log(err))
  },[])
  //console.log(posts);
  return (
    <div>
      {posts.map((post)=> {
        return( 
          <div className='card' key={post.id}>
            <h5>{post.title} posted by: {post.username}</h5>
            <p>{post.body}</p>
          </div>
        )
      })}
    </div>
  )
}

export default Media