import './UsersList.css';
import React from 'react';
import UserCard from './UserCard';

type UsersCardType = {
    users: Array<UserCardType>
}

type UserCardType = {
    name: string,
    launches: Array<{launchId: string}>,
    id: string,
    email: string,
    _id: string,
    __v: number
}

const UsersList: React.FC<UsersCardType> = ({ users }) => {
    if(!users) {
        return (
            <React.Fragment>
            <h2 className='users'>There isn't any user</h2>
            <h3 className='users'>Be the first to create one</h3>
            </React.Fragment>
        )
    }

    const userData = users.map(user => <UserCard key={user._id} user={user} />)

    return (
        <div className='usersList'>
            <div className='usersListCards'>
                {userData}
            </div>
        </div>
    )
}

export default UsersList;