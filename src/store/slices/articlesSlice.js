import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import baseURL from '../../vars';

const initialState = {
  articles: [],
  status: null,
  error: false,
  currentPage: 1,
  currentArticle: {},
  articleStatus: null,
  articleError: false,
};

export const fetchArticles = createAsyncThunk('articles/fetchArticles', async (page) => {
  const token = localStorage.getItem('token');
  const res = await fetch(`${baseURL}/articles?offset=${page || 0}`, {
    method: 'GET',
    headers: {
      Authorization: `Token ${token}`,
    },
  });
  const data = await res.json();
  return data;
});

export const fetchArticle = createAsyncThunk('articles/fetchArticle', async (slug) => {
  const token = localStorage.getItem('token');
  const res = await fetch(`${baseURL}/articles/${slug}`, {
    method: 'GET',
    headers: {
      Authorization: `Token ${token}`,
    },
  });
  const data = await res.json();
  return data;
});

export const articlesSlice = createSlice({
  name: 'articles',
  initialState,
  extraReducers: {
    [fetchArticles.pending]: (state) => {
      state.status = 'loading';
      state.error = null;
      state.articles = [];
    },
    [fetchArticles.fulfilled]: (state, action) => {
      state.status = 'resolved';
      state.articles = action.payload;
      if (action.payload.errors) {
        state.error = true;
      }
    },
    [fetchArticle.pending]: (state) => {
      state.articleStatus = 'loading';
      state.currentArticle = {};
    },
    [fetchArticle.fulfilled]: (state, action) => {
      state.articleStatus = 'resolved';
      state.currentArticle = action.payload;
      if (action.payload.errors) {
        state.articleError = true;
        state.articleStatus = null;
      }
    },
    [fetchArticle.rejected]: (state) => {
      state.articleError = true;
    },
  },
});

export default articlesSlice.reducer;
