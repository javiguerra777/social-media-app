import React from 'react';
import { useSelector, useDispatch } from 'react-redux/es/exports';
import { setSuggestions } from '../store/searchSlice';
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
    <div>
       <input
        placeholder='search for user'
        value={userInput}
        onChange={(e)=> searchUsers(e.target.value)}
        />
    </div>
  )
}

export default SearchBar;