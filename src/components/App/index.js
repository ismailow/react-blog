import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';

import store from '../../store/store';
import Header from '../Header';
import ArticlesPage from '../../pages/articlesPage';
import ArticlePage from '../../pages/articlePage';
import SignInPage from '../../pages/signInPage';
import SignUpPage from '../../pages/signUpPage';
import ProfilePage from '../../pages/profilePage';
import NewArticlePage from '../../pages/newArticlePage';
import EditingPage from '../../pages/editingPage';

import styles from './app.module.scss';
import 'normalize.css';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className={styles.wrapper}>
          <Header />
          <Routes>
            <Route
              path="/:page?"
              element={<ArticlesPage />}
            />
            <Route
              path="/articles/:page?"
              element={<ArticlesPage />}
            />
            <Route
              path="/article/:slug"
              element={<ArticlePage />}
            />
            <Route
              path="/sign-in"
              element={<SignInPage />}
            />
            <Route
              path="/sign-up"
              element={<SignUpPage />}
            />
            <Route
              path="/profile"
              element={<ProfilePage />}
            />
            <Route
              path="new-article"
              element={<NewArticlePage />}
            />
            <Route
              path="/articles/:slug/edit"
              element={<EditingPage />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
