import { Link } from 'react-router-dom';

import formatDate from '../../helpers/dateFormatter';
import Tag from '../Tag';

import styles from './article.module.scss';

function Article({ title, description, date, likes, isLiked, author, avatar, tags, slug }) {
  return (
    <div className={styles.article}>
      <div className={styles.header}>
        <div className={styles.leftColumn}>
          <div className={styles.topRow}>
            <Link to={`/article/${slug}`}>
              <h2 className={styles.title}>{title || 'Title'}</h2>
            </Link>
            <button className={styles.likeBtn}>
              <img
                src={`/img/${isLiked ? 'liked.svg' : 'unliked.svg'}`}
                alt="like"
              />
              {likes}
            </button>
          </div>
          <div className={styles.tags}>{tags.map((tag) => (tag === '' ? null : <Tag text={tag} />))}</div>
        </div>
        <div className={styles.authorBlock}>
          <div className={styles.authorInfo}>
            <p className={styles.name}>{author}</p>
            <p className={styles.date}>{formatDate(date)}</p>
          </div>
          <img
            className={styles.avatar}
            src={avatar}
            alt="avatar"
          />
        </div>
      </div>
      <div className={styles.description}>{description || 'No description available'}</div>
    </div>
  );
}

export default Article;
