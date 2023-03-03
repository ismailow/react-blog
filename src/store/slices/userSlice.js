import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoggedIn: false,
  userName: null,
  email: null,
  token: null,
  avatar: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logIn: (state, action) => {
      state.isLoggedIn = true;
      state.userName = action.payload.user.username;
      state.email = action.payload.user.email;
      state.token = action.payload.user.token;
      state.avatar = action.payload.user.image || 'https://static.productionready.io/images/smiley-cyrus.jpg';
    },
    update: (state, action) => {
      if (action.payload.user.username) {
        state.userName = action.payload.user.username;
      }
      if (action.payload.user.email) {
        state.email = action.payload.user.email;
      }
      if (action.payload.user.image) {
        state.avatar = action.payload.user.image;
      }
    },
    logOut: (state) => {
      state.isLoggedIn = null;
      state.userName = null;
      state.email = null;
      state.token = null;
      state.avatar = null;
    },
  },
});

export const { logIn, update, logOut } = userSlice.actions;
export default userSlice.reducer;
