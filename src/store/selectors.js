export const articles = (state) => state.articlesReducer.articles.articles;
export const status = (state) => state.articlesReducer.status;
export const error = (state) => state.articlesReducer.error;
export const articlesCount = (state) => state.articlesReducer.articles.articlesCount;
export const currentPage = (state) => state.articlesReducer.currentPage;
export const currentArticle = (state) => state.articlesReducer.currentArticle.article;
export const articleStatus = (state) => state.articlesReducer.articleStatus;
export const articleError = (state) => state.articlesReducer.articleError;
export const slug = (state) => state.articlesReducer.currentArticle.article.slug;

export const isLoggedIn = (state) => state.userReducer.isLoggedIn;
export const userName = (state) => state.userReducer.userName;
export const email = (state) => state.userReducer.email;
export const token = (state) => state.userReducer.token;
export const avatar = (state) => state.userReducer.avatar;
