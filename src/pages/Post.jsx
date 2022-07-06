import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { db } from '../firebase/firebase-config';
import { collection, doc, getDocs } from 'firebase/firestore';
import { useSelector } from 'react-redux/es/exports';
import { nanoid } from 'nanoid';
const Post = () => {
  const user = useSelector((state)=> state.user)
  const [post, setPost] = useState([]);
  const {id} = useParams();
  const [comment, setComment] = useState('');
  const thePost = doc(db, 'posts', id);
  const [dbData, setDbData] = useState([thePost]);
  const postsCollectionRef = collection(db, "posts");
  const [comments, setComments] = useState([]);
  useEffect(() => {
    const getDbData = async () => {
      const data = await getDocs(postsCollectionRef);
      setDbData(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
    };
    getDbData();
  }, [postsCollectionRef, id]);
  useEffect(() => {
    const pData = dbData.find(data => data.id === id);
    setPost(pData);
  }, [dbData, id]);
  
  const addComment = (e) => {
    e.preventDefault();
    setComments((prev) => [...prev, { id: nanoid(), name: user.name, comment }])
    setComment("")
  }
  return (
    <>
    <div>
      <h4>{post.username}</h4>
      <h5>{post.title}</h5>
      <p>{post.body}</p>
    </div>
    <div>
      {comments.map(comment => {
        return (
          <div key={comment.id}>
            <h5>{comment.name}</h5>
            <p>{comment.comment}</p>
      </div>
    )
  })}
    </div>
    <form className='commentform' onSubmit={addComment}>
    <label>
    <Button style={{backgroundColor:'blue', color:'white'}} type='submit'> Add comment</Button>{' '}
      <input
      placeholder='add comment here'
      value={comment}
      onChange={(e)=> setComment(e.target.value)} 
      required
      />
    </label>
    </form>
    </>
  )
}

export default Post