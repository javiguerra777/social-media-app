import React, {useState, useEffect, useRef} from 'react';
import { Link } from 'react-router-dom';
import { auth, db } from '../firebase/firebase-config';
import { getDocs, collection, deleteDoc, doc } from 'firebase/firestore';
import { onAuthStateChanged} from 'firebase/auth';
const Home = () => {
  const [Post, setPost] = useState([]);
  const [user, setUser]= useState({});
  const postsCollectionsRef = collection(db, 'posts');
  //useEffects
  onAuthStateChanged(auth, (currentUser)=> {
    setUser(currentUser);
  });
  
  useEffect(()=> {
    const getPosts = async ()=> {
      const data = await getDocs(postsCollectionsRef);
      setPost(data.docs.map((doc)=> ({...doc.data(), id: doc.id})))
    }
    getPosts();
  },[]);

  // const userPosts = Post.filter(post => {
  //   if(post.email?.toLowerCase() === user.email){
  //     return post;
  //   }
  // }).map((post)=> {
  //   return (
  //     <div className='card' key={post.id}>
  //     <h5>{post.title} <Link to={`../edit/${[post.id]}`}>Edit Post</Link> <button onClick={()=> deletePost(post.id)} className='delete'>x</button></h5>
  //     <p>{post.body}</p>
  //     </div>
  //   )
  // });
  const deletePost = async (id) => {
    try{
    const thispost = doc(db, 'posts', id);
    // const newPosts = Post && Post.filter((element, i) => element.id !== id);
    // setPost(newPosts);
    deleteDoc(thispost);

    const remainingPosts = Post.filter((post)=> post.id !== id );
    setPost(remainingPosts);
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
      {Post.filter(post => {
    if(post.email?.toLowerCase() === user.email){
      return post;
    }
  }).map((post)=> {
    return (
      <div className='card' key={post.id}>
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