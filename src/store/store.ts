import { configureStore } from '@reduxjs/toolkit';

// eslint-disable-next-line import/no-named-as-default
import requiredNameSlice from './features/requiredNameSlice';
import usersSlice from './features/usersSlice';

const store = configureStore({
  reducer: {
    users: usersSlice,
    requiredName: requiredNameSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
