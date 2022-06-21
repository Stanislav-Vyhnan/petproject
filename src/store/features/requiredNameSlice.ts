import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';

// Define a type for the slice state
interface RequierdNameState {
  value: string | null;
}

// Define the initial state using that type
const initialState: RequierdNameState = {
  value: '',
};

export const requiredNameSlice = createSlice({
  name: 'userName',
  initialState,
  reducers: {
    addUserName: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
  },
});

export const { addUserName } = requiredNameSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectRequiredName = (state: RootState) =>
  state.requiredName.value;

export default requiredNameSlice.reducer;
