import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';

import store from '../../store/store';
import Header from '../Header';
import ArticlesPage from '../../pages/articlesPage';
import ArticlePage from '../../pages/articlePage';

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
          </Routes>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
