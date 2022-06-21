import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';

import { Profile } from '../../Interfaces/Profile';

// Define a type for the slice state
interface usersState {
  items: Profile[];
}

// Define the initial state using that type
const initialState: usersState = {
  items: [],
};

export const requiredNameSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addUsers: (state, action: PayloadAction<Profile[]>) => {
      state.items = [...action.payload];
    },
  },
});

export const { addUsers } = requiredNameSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectUsers = (state: RootState) => state.users.items;

export default requiredNameSlice.reducer;
