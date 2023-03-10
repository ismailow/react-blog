import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Spin, Pagination } from 'antd';
import { useParams, useNavigate } from 'react-router-dom';

import { fetchArticles } from '../../store/slices/articlesSlice';
import Article from '../../components/article';
import ErrorIndicator from '../../components/ErrorIndicator';
import * as selectors from '../../store/selectors';

import styles from './articles.module.scss';

function ArticlesPage() {
  const params = useParams();

  const articles = useSelector(selectors.articles);
  const status = useSelector(selectors.status);
  const error = useSelector(selectors.error);
  const articlesCount = useSelector(selectors.articlesCount);
  const isLogged = useSelector(selectors.isLoggedIn);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchParameter = params.page === 1 ? 0 : params.page * 20 - 20;
    dispatch(fetchArticles(fetchParameter));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLogged, params]);

  return (
    <div className={styles.articlesList}>
      {error ? <ErrorIndicator /> : null}
      {status === 'loading' ? (
        <Spin
          size="large"
          wrapperClassName={styles.articlesList}
        />
      ) : null}
      {articles?.map((article) => (
        <Article
          key={article.slug}
          slug={article.slug}
          title={article.title}
          description={article.description}
          date={article.createdAt}
          likes={article.favoritesCount}
          isLiked={article.favorited}
          author={article.author.username}
          avatar={article.author.image}
          tags={article.tagList}
        />
      ))}
      {!error && status === 'resolved' ? (
        <Pagination
          current={Number(params.page) || 1}
          pageSize={20}
          total={articlesCount}
          showSizeChanger={false}
          onChange={(page) => {
            navigate(`/articles/${page}`);
          }}
        />
      ) : null}
    </div>
  );
}

export default ArticlesPage;
