import React from 'react';
import './NavBar.css'
import { NavLink } from 'react-router-dom';
import { logoutUser } from '../../reducers/authReducer';
import { useAppSelector, useAppDispatch } from "../../reducers/hooks"

const NavBar: React.FC = () => {
    const authState = useAppSelector((state => state.auth))
    const dispatch = useAppDispatch();

    let url = `/mywatchlist/${authState.userId}`

    const handleLogout = (e: React.MouseEvent) => {
        e.preventDefault()
        dispatch(logoutUser())
    }

    return(
        <nav className='navbar'>
            <h1 className="nav-title">SpaceX</h1>
            <ul>
                <li>
                    <NavLink exact to="/">Home</NavLink>
                </li>
                <li>
                    <NavLink to="/pastLaunches">Past Launches</NavLink>
                </li>
                <li>
                    <NavLink to="/api/users">Users</NavLink>
                </li>  
                {!authState.isLoggedIn && (
                    <li>
                        <NavLink to="/auth">Authenticate</NavLink>
                    </li>
                )}  
                {authState.isLoggedIn && (
                    <li>
                        <NavLink to={url}>My Watchlist</NavLink>
                    </li>
                )}  
                {authState.isLoggedIn && (
                    <li>
                        <button onClick={handleLogout}>Logout</button>
                    </li>
                )}
                </ul>
        </nav>
    )
}

export default NavBar