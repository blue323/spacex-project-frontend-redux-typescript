import { createSlice, current } from "@reduxjs/toolkit";

type UserType = {
  launches: Array<{launchId: string}>,
  _id: string,
  name: string,
  email: string,
  __v: number,
  id: string
}

const initialState: Array<UserType> = []

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUsers(state, action) {
      return action.payload;
    },
    addLaunch(state: Array<UserType>, action) {
      const exitsUser = state.find((user) => user.id === action.payload.userId)
      
      if(exitsUser) {
        exitsUser.launches.push({ launchId: action.payload.launchId })
      }
    },
    removeLaunch(state: Array<UserType>, action) {
      let user = state.find(users => users.id === action.payload.userId)
      let removeLaunch = user!.launches.filter((launch: {launchId: string}) => launch.launchId !== action.payload.launchId)
      user!.launches = removeLaunch
    },
    deleteAccount(state, action) {
      return action.payload;
    }
  },
});

const { setUsers, addLaunch, removeLaunch, deleteAccount } = usersSlice.actions;

export const initializeUsers = () => {
  return async (dispatch: (payload: any) => {
    payload: any;
    type: "users/setUsers";
}) => {
    let response = await fetch('https://spacex-project-backend.vercel.app/api/users/', {
    method: 'GET',
    })

    let aresponse = await response.json()
  
    dispatch(setUsers(aresponse.users));
  };
};

export const addLaunchToUser = (url: string) => {
  return async (dispatch: (payload: any) => {
    payload: any;
    type: "users/addLaunch";
  }) => {
    let response = await fetch(url, {
    method: 'PATCH',
    })

    response = await response.json()
    
    dispatch(addLaunch(response));
  };
};

export const removeLaunchFromUser = (url: string) => {
  return async (dispatch: (payload: any) => {
    payload: any;
    type: "users/removeLaunch";
  }) => {
    let response = await fetch(url, {
    method: 'DELETE',
    })

    response = await response.json()

    dispatch(removeLaunch(response));
  };
};

export const removeUser = (url: string) => {
  return async (dispatch: (payload: any) => {
    payload: any;
    type: "users/deleteAccount";
}) => {
    let response = await fetch(url, {
    method: 'DELETE',
    })

    let aresponse = await response.json()
    
    dispatch(deleteAccount(aresponse.users));
  };
};



export default usersSlice.reducer;