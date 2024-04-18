import { createSlice, PayloadAction } from '@reduxjs/toolkit';
export interface UserState {
    id: number;
  name: string;
  email: string;
  contact: number;
  address: string;
}

const initialState: UserState = {
  id: 0,
  name: '',
  email: '',
  contact: 0,
  address: '',
};

export const userSlice = createSlice({
  name: 'users',

  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    loginAction: (state, action: PayloadAction<UserState>) => {
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.contact = action.payload.contact;
      state.address = action.payload.address;
    },
    logoutAction: (state) => {
        state.id = 0;
      state.name = '';
      state.email = '';
      state.contact = 0;
        state.address = '';
      
    },
  },
});

export const { loginAction, logoutAction } = userSlice.actions;

export default userSlice.reducer;
