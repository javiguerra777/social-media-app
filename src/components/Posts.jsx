import React from 'react';
import Options from './Options';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase/firebase-config';
import { deleteDoc, doc} from 'firebase/firestore';
import { Accordion } from 'react-bootstrap';
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
  img {
    width: 3em;
    height: 3em;
    margin-right: .5em;
    border-radius: 3em;
  }
  header {
    display:flex;
    justify-content:space-between;
    section{
      display:flex;
    }
  }
  footer {
    width: 97%;
    display: flex;
    justify-content: center;
    align-self:center;
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
              <section className='container-fluid'>
                <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" alt="profile picture"/>
                <h5>{post.username}</h5>
              </section>
              {user.uid === post.userid && <Options post={post} deletePost={deletePost}/>}
            </header>
            <section className=' container-fluid main-content' onClick={() => viewPost(post.id)}>
              <h5>{post.title} </h5>
              <p>{post.body}</p>
            </section>            
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