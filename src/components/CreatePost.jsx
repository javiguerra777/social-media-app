import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Wrapper = styled.section`

width: 100vw;
input {
  cursor:pointer;
  width: 100%;
}
`;

const CreatePost = () => {
  const navigate = useNavigate();
  return (
    <Wrapper onClick ={()=>navigate('/newpost')}>
        <input
          placeholder="What's on your mind?"
        />
    </Wrapper>
  )
}

export default CreatePost;