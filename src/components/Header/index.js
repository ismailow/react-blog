import { Link } from 'react-router-dom';

import styles from './header.module.scss';

function Header() {
  return (
    <header className={styles.header}>
      <Link
        to="/"
        className={styles.title}
      >
        Realworld Blog
      </Link>
      <div className={styles.logBlock}>
        <a
          className={styles.logIn}
          href="#"
        >
          Sign In
        </a>
        <a
          className={styles.signUp}
          href="#"
        >
          Sign Up
        </a>
      </div>
    </header>
  );
}

export default Header;
