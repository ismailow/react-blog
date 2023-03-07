import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';

import LogBlock from '../logBlock';
import AccountBlock from '../accountBlock';
import { logIn } from '../../store/slices/userSlice';
import baseURL from '../../vars';

import styles from './header.module.scss';

function Header() {
  const dispatch = useDispatch();
  const token = localStorage.getItem('token');
  useEffect(() => {
    const log = async () => {
      if (localStorage.token) {
        const request = await fetch(`${baseURL}/user`, {
          method: 'GET',
          headers: {
            Authorization: `Token ${token}`,
            'Content-Type': 'application/json',
          },
        });
        const response = await request.json();
        dispatch(logIn(response));
      }
    };
    log();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const isLogged = useSelector((state) => state.userReducer.isLoggedIn);
  return (
    <header className={styles.header}>
      <Link
        to="/"
        className={styles.title}
      >
        Realworld Blog
      </Link>
      {isLogged ? <AccountBlock /> : <LogBlock />}
    </header>
  );
}

export default Header;
