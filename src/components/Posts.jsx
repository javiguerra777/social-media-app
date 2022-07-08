import React from 'react';
import Options from './Options';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase/firebase-config';
import { getDocs, collection, deleteDoc, doc} from 'firebase/firestore';

import { nanoid } from 'nanoid';
import { BsHandThumbsUp } from 'react-icons/bs';
import { BiMessageAlt } from 'react-icons/bi';
import { TiArrowForwardOutline } from 'react-icons/ti';
import styled from 'styled-components';

const PostsWrapper = styled.section`
.card {
  margin-top: .5em;
  display: flex;
  flex-direction: column;
  header {
    display:flex;
    justify-content:space-between;
  }
  footer {
    width: 90%;
    display: flex;
    justify-content: space-evenly;
    border-top: gray 1px solid;
    button{ 
      width: 33%;
      background: none;
      border: none;
    }
  }
}
.card:hover {
  -webkit-box-shadow: 5px 5px 5px 0px #000000, inset 4px 4px 15px 0px #000000, 5px 5px 37px 5px rgba(0,0,0,0); 
  box-shadow: 5px 5px 5px 0px #000000, inset 4px 4px 15px 0px #000000, 5px 5px 37px 5px rgba(0,0,0,0);
}
.main-content {
  cursor:pointer;
}
.main-content: hover {
  -webkit-box-shadow: 0px 20px 0px -10px #FFFFFF, 0px -20px 0px -10px #FFFFFF, 20px 0px 0px -10px #FFFFFF, -20px 0px 0px -10px #FFFFFF, 0px 0px 0px 10px #FF0000, 5px 5px 37px 5px rgba(0,0,0,0); 
  box-shadow: 0px 20px 0px -10px #FFFFFF, 0px -20px 0px -10px #FFFFFF, 20px 0px 0px -10px #FFFFFF, -20px 0px 0px -10px #FFFFFF, 0px 0px 0px 10px #FF0000, 5px 5px 37px 5px rgba(0,0,0,0);
background: #FFFFFF;
}
`;

const Posts = ({ data, setPosts }) => {
  const user = useSelector((state)=> state.user)
  const navigate = useNavigate();
  const viewPost = (id) => {
    navigate(`../posts/${id}`)
  }
  const deletePost = async (id) => {
    try {
    const postRef = doc(db, 'posts', id);
    await deleteDoc(postRef);

    const remainingPosts = data.filter((post)=> post.id !== id);
    setPosts(remainingPosts);
    }catch(err){
      console.log(err)
    } 
  }
  return (
    <PostsWrapper className='container-fluid'>
      {data.map((post) => {
        return (
          <section className='card' key={nanoid()}>
            <header>
              <h5>{post.username}</h5>
              {user.uid === post.userid && <Options post={post} deletePost={deletePost}/>}
            </header>
            <div className='main-content' onClick={() => viewPost(post.id)}>
              <h5>{post.title} </h5>
              <p>{post.body}</p>
            </div>            
            <hr/>
            <footer>
              <button><BsHandThumbsUp /> Like</button>
              <button onClick={()=> viewPost(post.id)}><BiMessageAlt /> Comment</button>
              <button><TiArrowForwardOutline/> Share</button>
            </footer>
          </section>
        )
      })}
    </PostsWrapper>
  )
}

export default Posts;