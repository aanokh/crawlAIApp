import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDoubleRight, faCommentMedical, faChevronDown } from '@fortawesome/free-solid-svg-icons'

import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { buttonPressed } from '@/app/redux/slices/navBarSlice'
import { addChat } from '@/app/redux/slices/asstListSlice'
import { newChatHistory } from '@/app/redux/slices/currentChatSlice';
import { exitEditMode } from '@/app/redux/slices/editAsstSlice';

import Amplify from 'aws-amplify';
import awsconfig from './aws-exports';
import { API } from 'aws-amplify';

const Header = () => {
  Amplify.configure(awsconfig);
  const currentAssisstant = useSelector(state => state.asstList.currentAssisstant);
  const currentChat = useSelector(state => state.asstList.currentChat);

  const dispatch = useDispatch();
  
  const handleNavPress = (e) => {
    e.preventDefault();
    dispatch(buttonPressed())
  }

  const addChatPress = (e) => {
    e.preventDefault();
    dispatch(addChat(currentAssisstant));
    dispatch(newChatHistory());
    dispatch(exitEditMode());
  }

  const handleLoginPress = async () => {
    try {
      const response = await API.get('amplify-test-api', '/on-user-message'); // Replace with your resource path
      console.log('Lambda Response:', response);
    } catch (error) {
      console.error('Error calling Lambda:', error);
    }
  }

  return (
    <div className="header">
      <div className="chat-btns-container">
        <button className="open-sidebar" onClick={handleNavPress}>
          <FontAwesomeIcon icon={faAngleDoubleRight} />
        </button>
        <button className="new-chat">
          <FontAwesomeIcon icon={faCommentMedical} onClick={addChatPress}/>
        </button>
        <button className='change-model'>GPT-4o
          <FontAwesomeIcon icon={faChevronDown} className="down-carat"/>
        </button>
      </div>
      <div className='assisstant-name-container'>
        <h2 className='assisstant-name'>{`${currentAssisstant} - ${currentChat}`}</h2>
      </div>
      <div className='login-btn-container'>
        <button className='login-btn' onClick={handleLoginPress}>Login</button>
      </div>
    </div>
  );
}

export default Header;