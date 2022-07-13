import React, { useState } from 'react';
import Options from './Options';
import { Share } from './Share';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase/firebase-config';
import { deleteDoc, doc} from 'firebase/firestore';
import { nanoid } from 'nanoid';
import { BsHandThumbsUp, BsThreeDots } from 'react-icons/bs';
import { BiMessageAlt } from 'react-icons/bi';
import { TiArrowForwardOutline } from 'react-icons/ti';
import styled from 'styled-components';
import { convertUnix } from '../utils/functions';
const PostsWrapper = styled.section`
padding-top: .5em;
background-color: #ebeef0;
.accordion {
  a {
    text-decoration: none;
    color: black;
  }
  button {
    border: none;
    background: none;
  }
  .non-user {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 30vw;
  }
}
.accordion-button, .accordion-item, .accordion-header {
  border: none;
  background:none;
}
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
    border-top: #e5e4e2 1px solid;
    button{ 
      width: 33%;
      background: none;
      border: none;
    }
    button:hover {
      background-color: #1E90FF;
      color: white;
    }
  }
}
.card:hover {
  -webkit-box-shadow: 5px 5px 5px 0px #000000, inset 4px 4px 15px 0px #000000, 5px 5px 37px 5px rgba(0,0,0,0); 
  box-shadow: 5px 5px 5px 0px #000000, inset 4px 4px 15px 0px #000000, 5px 5px 37px 5px rgba(0,0,0,0);
}
.date {
  color: gray;
  font-size: .7em;
}
.dots {
  background: none;
  border: none;
}
.main-content {
  cursor:pointer;
}
.main-content: hover {
  -webkit-box-shadow: 0px 20px 0px -10px #FFFFFF, 0px -20px 0px -10px #FFFFFF, 20px 0px 0px -10px #FFFFFF, -20px 0px 0px -10px #FFFFFF, 0px 0px 0px 10px #FF0000, 5px 5px 37px 5px rgba(0,0,0,0); 
  box-shadow: 0px 20px 0px -10px #FFFFFF, 0px -20px 0px -10px #FFFFFF, 20px 0px 0px -10px #FFFFFF, -20px 0px 0px -10px #FFFFFF, 0px 0px 0px 10px #FF0000, 5px 5px 37px 5px rgba(0,0,0,0);
background: #FFFFFF;
}
.post-info {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  .beginning-content {
    margin-left: .5em;
  }
  .end-content {
    display: flex;
    flex-direction: row;
    div {
      margin-right: .5em;
    }
  }
}
.shared-post {
  border: solid 1px #e5e4e2;
  cursor:pointer;
  width: 95%;
  align-self:center;
  .shared-header {
    display: flex;
    flex-direction: row;
  }
}
`;

const Posts = ({ data, setPosts }) => {
  const { comments } = useSelector((state) => state.data);
  const navigate = useNavigate();
  const [displayShared, setDisplayShared] = useState(false);
  const [displayOptions, setDisplayOptions] = useState(false);
  const [showId, setShowId] = useState(null);
  const [shareId, setShareId] = useState(null);
  const viewPost = (id) => {
    navigate(`../posts/${id}`)
  }
  const deletePost = async (id) => {
    try {
      const postRef = doc(db, 'posts', id);
      await deleteDoc(postRef);
      const remainingPosts = data.filter((post) => post.id !== id);
      setPosts(remainingPosts);
      setDisplayOptions(false);
    } catch (err) {
      console.log(err)
    }
  };

  const toggleLiked = () => {
    console.log('you liked the post');
  }
  const sharePost = (id) => {
    setDisplayShared(true);
    setShareId(id);
  }
  const showOptions = (id) => {
    setDisplayOptions(true);
    setShowId(id);
  }
  
  return (
    <PostsWrapper className='container-fluid'>
      {data.sort((a, b) => a.date < b.date ? 1 : -1).map((post) => {
        let count = 0;
        for (const i in comments) {
          if (post.id === comments[i].postid) {
            count++;
          }
        }
        return (
          <section className='card' key={nanoid()}>
            {displayShared && post.id === shareId &&(<Share setDisplayShared={setDisplayShared} post={post} />)}
            <header>
              <section className='container-fluid'>
                <img src={`${post.profilepic}`} alt="profile-pic"/>
                <h5>
                  {post.username} <br />
                  <span className='date'>{convertUnix(post.date)}</span>
                </h5>
              </section>
              <button className='dots' type='button' onClick={()=>showOptions(post.id)}><BsThreeDots/></button>
              {displayOptions && post.id === showId && (
                <Options post={post} deletePost={deletePost} setDisplayOptions={setDisplayOptions} />
              )}
            </header>
            <section className=' container-fluid main-content' onClick={() => viewPost(post.id)}>
              <h5>{post.title} </h5>
              <p>{post.body}</p>
            </section>
             {post.shared && (
              <section className='shared-post container-fluid'>
                <section className='shared-header' onClick={()=>viewPost(post.shared.id)}>
                  <img src={`${post.shared.profilepic}`} alt="profile-pic"/>
                <h5>
                  {post.shared.username} <br />
                  <span className='date'>{convertUnix(post.shared.date)}</span>
                </h5>
                </section>
                <section className='shared-body'>
                <h5>{post.shared.title} </h5>
              <p>{post.shared.body}</p>
                </section>
              </section>
            )}
            <section className='post-info'>
              <section className='beginning-content'>
                {post.likes && 'Likes'}
              </section>
              <section className='end-content'>
                <div>
                {count > 0 && (count === 1 ? `${count} comment` : `${count} comments`)}
              </div>
              <div>
                  {post.sharedBy && (
                    post.sharedBy.length === 1 ? `${post.sharedBy.length} share` : `${post.sharedBy.length} shares`
                )}
              </div>
              </section>
            </section>
            <footer>
              <button type='button' onClick={toggleLiked}><BsHandThumbsUp /> Like</button>
              <button type='button' onClick={()=> viewPost(post.id)}><BiMessageAlt /> Comment</button>
              <button type='button' onClick={()=> sharePost(post.id)}><TiArrowForwardOutline/> Share</button>
            </footer>
          </section>
        )
      })}
    </PostsWrapper>
  )
}

export default Posts;