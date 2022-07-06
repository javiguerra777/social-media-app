import React from 'react';
import { useState, useEffect } from 'react';
import '../styles/media.css';
import { Link } from 'react-router-dom';
import { db } from '../firebase/firebase-config';
import { collection, getDocs } from 'firebase/firestore';
import { nanoid } from 'nanoid';

const Media = () => {
  const [posts, setPosts] = useState([]);
  const postsCollectionsRef = collection(db, 'posts');
  useEffect(()=> {
    const getPosts = async ()=> {
      const data = await getDocs(postsCollectionsRef);
      setPosts(data.docs.map((doc)=> ({...doc.data(), id: doc.id})))
    }
    getPosts();
  },[postsCollectionsRef]);
  return (
    <div>
      {posts.map((post)=> {
        return( 
          <>
          <div className='card' key={nanoid()}>
            <h4>post made by: {post.username}</h4>
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