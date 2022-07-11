import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const OptionsWrapper = styled.section`
display: flex;
flex-direction: column;
align-items: center;
width: 30vw;
`;

const Options = ({post, deletePost}) => {
  return (
    <OptionsWrapper>
      <Link to={`../edit/${post.id}`}>Edit Post</Link> <button onClick={()=> deletePost(post.id)} className='delete'>Delete Post</button>
    </OptionsWrapper>
  )
}

export default Options;