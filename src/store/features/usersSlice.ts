import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import type { AppDispatch, RootState } from '../store';

import { Profile } from '../../Interfaces/Profile';
import { getUserProfileAPI } from '../../services/service';
import { mappperUser } from '../../helpers/mapperUsers';

// Define a type for the slice state
interface usersState {
  requiredUserName: string;
  items: Profile[];
}

// Define the initial state using that type
const initialState: usersState = {
  requiredUserName: '',
  items: [],
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addRequiredUserName: (state, action: PayloadAction<string>) => {
      state.requiredUserName = action.payload;
    },
    addUsers: (state, action: PayloadAction<Profile[]>) => {
      state.items = [...action.payload];
    },
  },
});

export const { addUsers } = usersSlice.actions;
export const { addRequiredUserName } = usersSlice.actions;

type AsyncThunkConfig = {
  rejectWithValue: any;
  dispatch: AppDispatch;
};

export const getUser = createAsyncThunk<void, string, AsyncThunkConfig>(
  'user/getUser',
  async (login, { rejectWithValue, dispatch }) => {
    const user = await getUserProfileAPI(login);
    dispatch(addUsers([mappperUser(user)]));
  },
);

// Other code such as selectors can use the imported `RootState` type
export const selectUsers = (state: RootState) => state.users.items;
export const selectRequiredUserName = (state: RootState) =>
  state.users.requiredUserName;

export default usersSlice.reducer;
