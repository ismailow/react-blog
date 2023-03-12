/* eslint-disable import/no-extraneous-dependencies */
import { Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Online, Offline } from 'react-detect-offline';
import { Alert } from 'antd';

import store from '../../store/store';
import Header from '../Header';
import ArticlesPage from '../../pages/articlesPage';
import ArticlePage from '../../pages/articlePage';
import SignInPage from '../../pages/signInPage';
import SignUpPage from '../../pages/signUpPage';
import ProfilePage from '../../pages/profilePage';
import NewArticlePage from '../../pages/newArticlePage';
import EditingPage from '../../pages/editingPage';
import NoMatch from '../../pages/notFoundPage';

import styles from './app.module.scss';
import './normalize.scss';
import './offlineAlert.scss';

function App() {
  return (
    <Provider store={store}>
      {/* <BrowserRouter> */}
      <div className={styles.wrapper}>
        <Header />

        <Online>
          <Routes>
            <Route
              path="/"
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
              path="/new-article"
              element={<NewArticlePage />}
            />
            <Route
              path="/articles/:slug/edit"
              element={<EditingPage />}
            />
            <Route
              path="*"
              element={<NoMatch />}
            />
          </Routes>
        </Online>
        <Offline>
          <Alert
            type="error"
            message="You're offline right now. Check your connection."
          />
        </Offline>
      </div>
      {/* </BrowserRouter> */}
    </Provider>
  );
}

export default App;
