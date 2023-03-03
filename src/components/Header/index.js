import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import LogBlock from '../logBlock';
import AccountBlock from '../accountBlock';

import styles from './header.module.scss';

function Header() {
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
