import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

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
  const res = await fetch(`https://blog.kata.academy/api/articles?offset=${page || 0}`);
  const data = await res.json();
  return data;
});

export const fetchArticle = createAsyncThunk('articles/fetchArticle', async (slug) => {
  const res = await fetch(`https://blog.kata.academy/api/articles/${slug}`);
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
      }
    },
    [fetchArticle.rejected]: (state) => {
      state.articleError = true;
    },
  },
});

export default articlesSlice.reducer;
