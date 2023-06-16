import React, { useEffect, useState } from 'react';
import './UserItem.css';
import { useLocation } from 'react-router-dom';
import LaunchesList from '../launches/LaunchesList';
import { useParams, useHistory } from 'react-router-dom';
import { logoutUser } from '../../reducers/authReducer';
import { removeUser } from '../../reducers/usersReducer';
import Modal from '../../shared/UIElements/Modal';
import { useAppSelector, useAppDispatch } from "../../reducers/hooks"


const UserItem: React.FC = () => {
  const launches = useAppSelector((state) => state.launches);
  const authState = useAppSelector((state) => state.auth);
  const { state } = useLocation<any>();
  const userIdFromURL = useParams<{userId: string}>().userId;
  const dispatch = useAppDispatch();
  const history = useHistory();
  const [show, setShow] = useState(false)

  useEffect(() => {
    window.scrollTo({ behavior: 'smooth', top: 0 });
  }, []);

  const loadedPastL: Array<any> = []

  if(!!launches && !!state) {
    for(let i=0; i<launches.length; i++) {
      for(let j=0; j<state.launches.length; j++) {
        if(launches[i].id === state.launches[j].launchId) {
          loadedPastL.push(launches[i])
        }
      }
    }

    const handleModalClose = () => {
      setShow(false) 
  
      const url = `https://spacex-project-backend.vercel.app/api/users/user/${state.id}`
      dispatch(logoutUser())
      dispatch(removeUser(url))
      history.push('/auth')
    }

  const handleDelete = async (e: React.MouseEvent) => {
    e.preventDefault()
    setShow(true)
  }

  return (
    <>
      <Modal title="Warning" onClose={handleModalClose} show={show}>
        <p>Your account was deleted</p>
      </Modal>
      <div className='userItem' key={state.id}>
      <h1>{!!authState.isLoggedIn && userIdFromURL === authState.userId ? 'My' : `${state.name}'s`} watchlist</h1>
      <LaunchesList launches={loadedPastL} />
      {loadedPastL.length === 0 && <p>No launches!</p>}
      {authState.isLoggedIn && state.id === authState.userId && <button onClick={handleDelete}>Delete Account</button>}
      </div>
    </>
    
    )
  }

  

  return (
    <h2 className='userItem-error'>Something went wrong</h2>
  )
}

export default UserItem;