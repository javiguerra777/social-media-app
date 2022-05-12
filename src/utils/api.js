import axios from 'axios';

const urlBase = 'http://localhost:3001';

export const getPeople = () => {
  return axios.get(`${urlBase}/users`);
}
export const getPosts = ()=> {
  return axios.get(`${urlBase}/posts`)
}