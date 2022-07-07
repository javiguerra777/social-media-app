import React from 'react';
import { Link } from 'react-router-dom';

const Options = ({post, deletePost}) => {
  return (
    <div>
      <Link to={`../edit/${post.id}`}>Edit Post</Link> <button onClick={()=> deletePost(post.id)} className='delete'>Delete Post</button>
    </div>
  )
}

export default Options;