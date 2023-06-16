import React, { useEffect, useState } from 'react';
import './UserMyWatchlist.css';
import LaunchesList from '../launches/LaunchesList';
import { useHistory } from 'react-router-dom';
import { logoutUser } from '../../reducers/authReducer';
import { removeUser } from '../../reducers/usersReducer';
import Modal from '../../shared/UIElements/Modal';
import { useAppDispatch, useAppSelector } from '../../reducers/hooks';

const UserMyWatchlist: React.FC = () => {
  const launches = useAppSelector((state) => state.launches);
  const authState = useAppSelector((state) => state.auth);
  const users = useAppSelector((state) => state.users);
  const dispatch = useAppDispatch();
  const history = useHistory();
  const [show, setShow] = useState(false)

  const handleModalClose = () => {
    setShow(false) 
    history.push('/auth')
    dispatch(logoutUser())

    const url = `https://spacex-project-backend.vercel.app/api/users/user/${authState.userId}`
    dispatch(removeUser(url))
  }
    
  useEffect(() => {
    window.scrollTo({ behavior: 'smooth', top: 0 });
  }, []);

  let myUser;

  for(let i=0; i<users.length; i++) {
    if(users[i].id === authState.userId) {
        myUser = users[i]
    }
  }

  const loadedPastL = []

  if(!!launches && !!myUser) {
    for(let i=0; i<launches.length; i++) {
      for(let j=0; j<myUser.launches.length; j++) {
        if(launches[i].id === myUser.launches[j].launchId) {
          loadedPastL.push(launches[i])
        }
      }
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
        <div className='userW' key={authState.userId}>
              <h1>My watchlist</h1>
              <LaunchesList launches={loadedPastL} />
              {loadedPastL.length === 0 && <p>No launches!</p>}
              <button onClick={handleDelete}>Delete Account</button>
        </div>
      </>
      )
    } else {
      return (
        <h2 className='userw-error'>Waiting for data...</h2>
      )
    }

    
}

export default UserMyWatchlist;