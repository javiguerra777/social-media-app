import React from 'react';
import { useSelector, useDispatch } from 'react-redux/es/exports';
import { setSuggestions } from '../store/searchSlice';
import { BsSearch } from 'react-icons/bs';
import styled from 'styled-components';

const SearchWrapper = styled.section`
background-color: #F0F0F0;
margin-left: 2em;
display: flex;
border-radius: 1em;
width: 90vw;
section {
  padding-left:1em;
  margin-right:.5em;
}
input {
  border: none;
  background:none;
  height: 100%;
  width: 100%
}
`;

const SearchBar = ({ userInput, searchFunc }) => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.data.users);
  const searchUsers = (text) => {
    let matches = [];
    if (text.length > 0) {
      matches = users.filter((user) => {
        const regex = new RegExp(`${text}`, "gi");
        return user.name.match(regex);
      });
    };
    dispatch(setSuggestions(matches));
    searchFunc(text);
  };
  return (
    <SearchWrapper>
      <section>
        <BsSearch/>
      </section>
       <input
        placeholder='Search'
        value={userInput}
        onChange={(e)=> searchUsers(e.target.value)}
        />
    </SearchWrapper>
  )
}

export default SearchBar;