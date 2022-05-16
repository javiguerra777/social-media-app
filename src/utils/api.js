import axios from 'axios';

const urlBase = 'http://localhost:3001';

//get routes
export const getPeople = () => {
  return axios.get(`${urlBase}/users`);
}
export const getPosts = ()=> {
  return axios.get(`${urlBase}/posts`)
}
export const getPost = (id)=> {
  return axios.get(`${urlBase}/posts/${id}`)
}
export const getMessages=()=> {
  return axios.get(`${urlBase}/messages`)
}

//post routes
export const createNewUser = (user)=> {
  return axios.post(`${urlBase}/users`, user, {
    headers: {
      'Content-Type': 'application/json',
    },
  })
}

export const addPost= (post) => {
  return axios.post(`${urlBase}/posts`, post, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
}
//put routes
export const editPost = (post, id)=> {
  return axios.put(`${urlBase}/posts/${id}`, post, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

//delete routes
export const deleteUserPost =(id)=> {
  return axios.delete(`${urlBase}/posts/${id}`);
}