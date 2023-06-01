import { createSlice } from '@reduxjs/toolkit';

export interface UserState {
  email: string | null;
  firstName: string | null;
  lastName: string | null;
}

const initialState: UserState = {
  email: null,
  firstName: null,
  lastName: null,
};

const userSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.email = action.payload.email;
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
    },
  },
});
