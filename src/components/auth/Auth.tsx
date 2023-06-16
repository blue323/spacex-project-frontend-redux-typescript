import React, { useState } from 'react';
import './Auth.css';
import Modal from '../../shared/UIElements/Modal';

import { loginUser, signupUser, closeModal } from "../../reducers/authReducer";
import { changeMode } from '../../reducers/authReducer';
import { useAppSelector, useAppDispatch } from '../../reducers/hooks';

const Auth: React.FC = () => {
  const authState = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch()
  
  const [userName, setUserName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value)
  }

  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }

  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
  }

  const handleMode = () => {
    dispatch(changeMode())
  }

  

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (authState.isLoginMode) {
      dispatch(loginUser(email, password))
    } else {
      dispatch(signupUser(userName, email, password))
    }
  };


    return (
      <>
      <Modal title="Error" onClose={() => dispatch(closeModal())} show={authState.error}>
        <p>Something went wrong</p>
      </Modal>
      <form onSubmit={handleSubmit}>
      {!authState.isLoginMode ? <h3>Signup Required</h3> : <h3>Login Required</h3>}
          {!authState.isLoginMode && <>
          <label htmlFor="name">Name</label>
          <input 
              type="text" 
              id="name" 
              name="name" 
              value={userName} 
              onChange={handleName} 
              minLength={1}
              required 
          />
          </>}
          <label htmlFor="mail">E-Mail</label>
          <input 
              type="email" 
              id="mail" 
              name="mail" 
              value={email} 
              onChange={handleEmail} 
              required 
          />
          <label htmlFor="pass">Password</label>
          <input 
              type="password" 
              id="pass" 
              name="pass" 
              minLength={6}
              value={password} 
              onChange={handlePassword} 
              required
          />
          <button className='auth' type="submit">{!authState.isLoginMode ? "Signup" : "Login"}</button>
          <button onClick={handleMode}>Switch to {authState.isLoginMode ? "Signup" : "Login"}</button>
      </form>
  </>
  );
};

export default Auth;