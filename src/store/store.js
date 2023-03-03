import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';

import articlesSlice from './slices/articlesSlice';
import userSlice from './slices/userSlice';

const store = configureStore({
  reducer: {
    articlesReducer: articlesSlice,
    userReducer: userSlice,
  },
  middleware: [thunk],
});

export default store;
