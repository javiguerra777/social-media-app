import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import {BsFillPencilFill} from 'react-icons/bs'
import { AiOutlineVideoCameraAdd, AiFillCamera, AiFillFileText } from 'react-icons/ai';
const Wrapper = styled.section`
background-color: white;
width: 100%;
.mar-top {
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-between;
  margin-top: 2px;
  .tooltips{
    button {
      margin-right: 1em;
    }
  }
}
.panel {
    box-shadow: 0 2px 0 rgba(0,0,0,0.075);
    border-radius: 0;
    border: 0;
    margin-bottom: 15px;
}

.panel .panel-footer, .panel>:last-child {
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
}

.panel .panel-heading, .panel>:first-child {
    border-top-left-radius: 0;
    border-top-right-radius: 0;
}

.panel-body {
    padding: 25px 20px;
}
input {
  cursor:pointer;
  width: 100%;
  border:none;
}
`;

const CreatePost = () => {
  const navigate = useNavigate();
  return (
    <Wrapper className='panel'>
      <section className='panel-body'>
        <textarea disabled={true} class="form-control" rows="2" placeholder="What are you thinking?"></textarea>
        <section class="mar-top">
          <section>
            <button onClick ={()=>navigate('/newpost')} className="btn btn-sm btn-primary pull-right" type="submit"><i class="fa fa-pencil fa-fw"></i><BsFillPencilFill/> Share</button>
          </section>	
          <section className='tooltips'>
        			<button className="btn btn-trans btn-icon fa fa-video-camera add-tooltip" href="#" data-original-title="Add Video" data-toggle="tooltip"><AiOutlineVideoCameraAdd/></button>
        			<button class="btn btn-trans btn-icon fa fa-camera add-tooltip" href="#" data-original-title="Add Photo" data-toggle="tooltip"><AiFillCamera/></button>
        			<button class="btn btn-trans btn-icon fa fa-file add-tooltip" href="#" data-original-title="Add File" data-toggle="tooltip"><AiFillFileText/></button>
              </section>
        </section>
      </section>
    </Wrapper>
  )
}

export default CreatePost;