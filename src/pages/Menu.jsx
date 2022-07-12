import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toggleLoggedIn, updateUser, toggleDisplayFooter } from '../store/userSlice';
import { Button } from 'react-bootstrap';
import styled from 'styled-components';
import menuData from '../json/menuData.json';
import { nanoid } from 'nanoid';

const MenuWrapper = styled.main`
background-color: #f5f5f5;
display: flex;
flex-direction: column;
align-items: center;
height: 93vh;
width: 100vw;
.item {
  background-color: white;
  width: 45%;
  margin-bottom: 1em;
  border-radius: .5em;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  cursor:pointer;
}
.item:hover {
  box-shadow: rgba(240, 46, 170, 0.4) 5px 5px, rgba(240, 46, 170, 0.3) 10px 10px, rgba(240, 46, 170, 0.2) 15px 15px, rgba(240, 46, 170, 0.1) 20px 20px, rgba(240, 46, 170, 0.05) 25px 25px;
}
}
.menu-content {
  width: 90%;
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
}
.shortcuts{
  align-self: flex-start;
  margin-left: 2em;
}
button {
  background-color: #E0E0E0;
  color: black;
  border: none;
  width: 80%
}
header {
  align-self: flex-start;
  border-bottom: #e5e4e2 solid 1px;
  display: flex;
  cursor:pointer;
  width: 96vw;
  margin-left: 2vw;
  margin-bottom: 1em;
}
header:hover {
  box-shadow: rgb(38, 57, 77) 0px 20px 30px -10px;
}
img {
    width: 3em;
    height: 3em;
    margin-right: .5em;
    border-radius: 3em;
  }
`;
const Menu = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state);
  const logout = async () => {
    dispatch(toggleLoggedIn());
    dispatch(updateUser("", 0, ""));
    dispatch(toggleDisplayFooter());
    navigate('/');
  };
  return (
    <MenuWrapper>
      <header onClick={()=> navigate('/home')}>
        <img src={user.profilepic} alt="profile-pic" />
        <p>{user.name} <br />
          <span>See your profile</span>
        </p>
      </header>
      <section className='shortcuts'>
        <p>All shortcuts</p>
      </section>
      <section className='menu-content'>
        {menuData.map((item) => {
          return (
            <section key={nanoid()} className='item'>
              <p>{item.text}</p>
            </section>
          )
        })}
      </section>
      <Button onClick={logout}>Log Out</Button>
    </MenuWrapper>
  )
}

export default Menu;