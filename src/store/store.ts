/* eslint-disable import/no-named-as-default */
import { configureStore } from '@reduxjs/toolkit';

import usersSlice from './features/usersSlice';
import userSlice from './features/userSlice';

const store = configureStore({
  reducer: {
    users: usersSlice,
    userProfile: userSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
