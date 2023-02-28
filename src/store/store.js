import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';

import articlesSlice from './slices/articlesSlice';

const store = configureStore({
  reducer: {
    articlesReducer: articlesSlice,
  },
  middleware: [thunk],
});

export default store;
