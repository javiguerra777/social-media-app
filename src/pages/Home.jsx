import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { db } from '../firebase/firebase-config';
import { getDocs, collection, deleteDoc, doc, where, query } from 'firebase/firestore';
import { useSelector } from 'react-redux/es/exports';
import {nanoid} from 'nanoid';

const Home = () => {
  const user = useSelector((state)=> state.user);
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const postsCollectionsRef = collection(db, 'posts');
    const q = query(postsCollectionsRef, where("userid", "==", user.uid));
    const getData = async () => {
      const userPosts = []
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        userPosts.push(doc.data());
      });
      setPosts(userPosts);
    }
    getData();
  },[user.uid]);
  const deletePost = async (id) => {
    try{
    const thispost = doc(db, 'posts', id);
    await deleteDoc(thispost);

    const remainingPosts = posts.filter((post)=> post.id !== id );
    setPosts(remainingPosts);
    }catch(err){
      console.log(err)
    }
    
  }
  return (
    <>
      <div>
        <h1>Home</h1>
      </div>
      <div>
        <Link to='/newpost'>Create new post</Link>
      {posts.map((post)=> {
    return (
      <div className='card' key={nanoid()}>
      <h5>{post.title} <Link to={`../edit/${[post.id]}`}>Edit Post</Link> <button onClick={()=> deletePost(post.id)} className='delete'>x</button></h5>
      <p>{post.body}</p>
      </div>
    )
  })}
      </div>
    </>
  )
}

export default Home