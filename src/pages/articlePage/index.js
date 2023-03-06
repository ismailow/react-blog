import { Spin } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

import Tag from '../../components/Tag';
import DeleteModal from '../../components/deleteModal';
import ErrorIndicator from '../../components/ErrorIndicator';
import { fetchArticle } from '../../store/slices/articlesSlice';
import formatDate from '../../helpers/dateFormatter';
import Like from '../../components/like';

import styles from './articlePage.module.scss';

function ArticlePage() {
  const params = useParams();
  const article = useSelector((state) => state.articlesReducer.currentArticle.article);
  const status = useSelector((state) => state.articlesReducer.articleStatus);
  const error = useSelector((state) => state.articlesReducer.articleError);
  const isLogged = useSelector((state) => state.userReducer.isLoggedIn);
  const [modalVisible, setModalVisible] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchArticle(params.slug));
  }, [dispatch, params.slug]);

  const onCloseModal = () => {
    setModalVisible(false);
  };

  return (
    <div className={styles.wrapper}>
      {error ? <ErrorIndicator /> : null}
      {status === 'loading' ? (
        <div className={styles.loader}>
          <Spin
            size="large"
            wrapperClassName={styles.wrapper}
          />
        </div>
      ) : null}
      {status === 'resolved' && !error ? (
        <div className={styles.article}>
          <div className={styles.header}>
            <div className={styles.leftColumn}>
              <div className={styles.topRow}>
                <h2 className={styles.title}>{article.title}</h2>
                <Like
                  isLiked={article.favorited}
                  likes={article.favoritesCount}
                  slug={article.slug}
                />
              </div>
              <div className={styles.tags}>
                {article.tagList.map((tag) => (
                  <Tag text={tag} />
                ))}
              </div>
            </div>
            <div className={styles.authorBlock}>
              <div className={styles.authorInfo}>
                <p className={styles.name}>{article.author.username}</p>
                <p className={styles.date}>{formatDate(article.createdAt)}</p>
              </div>
              <img
                className={styles.avatar}
                src={article.author.image}
                alt="avatar"
              />
            </div>
          </div>
          <div className={styles.subheader}>
            <div className={styles.description}>{article.description || 'No descriotion available'}</div>
            {isLogged ? (
              <div className={styles.controlBlock}>
                <button
                  className={styles.deleteBtn}
                  onClick={() => setModalVisible(true)}
                >
                  Delete
                </button>
                {modalVisible ? <DeleteModal onCloseModal={onCloseModal} /> : null}
                <Link to={`/articles/${article.slug}/edit`}>
                  <button className={styles.editBtn}>Edit</button>
                </Link>
              </div>
            ) : null}
          </div>
          <div className={styles.body}>
            <ReactMarkdown>{article.body}</ReactMarkdown>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default ArticlePage;
