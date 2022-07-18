import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { AppDispatch, RootState } from '../store';

import { Profile } from '../../Interfaces/Profile';
import { getUserProfileAPI } from '../../services/service';
import { mappperUser } from '../../helpers/mapperUsers';

import defaultAvatar from '../../assets/default-avatar.svg';
import { addUsers } from './usersSlice';

// Define a type for the slice state
interface userState {
  user: Profile;
}

// Define the initial state using that type
const initialState: userState = {
  user: {
    id: null,
    name: 'No information available',
    login: 'No information available',
    followers: 0,
    following: 0,
    bio: 'No information available',
    userInfo: [
      {
        id: 0,
        info: 'No information available',
      },
    ],
    avatarUrl: defaultAvatar,
    publicRepos: 0,
  },
};

type AsyncThunkConfig = {
  rejectWithValue: any;
  dispatch: AppDispatch;
};

export const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<Profile>) => {
      state.user = action.payload;
    },
  },
});

export const { addUser } = userSlice.actions;

export const getUser = createAsyncThunk<void, string, AsyncThunkConfig>(
  'user/getUser',
  async (login, { rejectWithValue, dispatch }) => {
    const user = await getUserProfileAPI(login);
    dispatch(addUsers([mappperUser(user)]));
  },
);

// Other code such as selectors can use the imported `RootState` type
export const selectUser = (state: RootState) => state.userProfile.user;

export default userSlice.reducer;
