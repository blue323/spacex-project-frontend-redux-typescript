import { createSlice } from "@reduxjs/toolkit";
import { past } from '../bodyToQueryLaunches';

const initialState: Array<any> = []

const launchesSlice = createSlice({
  name: "launches",
  initialState,
  reducers: {
    setLaunches(state: Array<any>, action) {
      return action.payload;
    },
  },
});

const { setLaunches } = launchesSlice.actions;

type setLaunchesType = {
  payload: any;
  type: "launches/setLaunches";
}

export const initializeLaunches = () => {
  return async (dispatch: (setLaunches: setLaunchesType) => void) => {
    let response = await fetch('https://api.spacexdata.com/v5/launches/query', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(past),
    })

    let aresponse = await response.json()
  
    dispatch(setLaunches(aresponse.docs));
  };
};

export default launchesSlice.reducer;