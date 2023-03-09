import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import { logOut } from '../../store/slices/userSlice';
import * as selectors from '../../store/selectors';

import styles from './accountBlock.module.scss';

function AccountBlock() {
  const userName = useSelector(selectors.userName);
  const userAvatar = useSelector(selectors.avatar);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <div className={styles.accountBlock}>
      <Link
        to="/new-article"
        className={styles.articleBtn}
      >
        Create article
      </Link>
      <div className={styles.userBlock}>
        <Link to="/profile">
          <span className={styles.userName}>{userName}</span>
        </Link>
        <Link to="/profile">
          <img
            src={userAvatar || 'https://static.productionready.io/images/smiley-cyrus.jpg'}
            alt="avatar"
            className={styles.avatar}
          />
        </Link>
      </div>
      <button
        className={styles.logOutBtn}
        onClick={() => {
          dispatch(logOut());
          localStorage.removeItem('token');
          navigate('/');
        }}
      >
        Log Out
      </button>
    </div>
  );
}

export default AccountBlock;
