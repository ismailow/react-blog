import { Link } from 'react-router-dom';

import styles from './logBlock.module.scss';

function LogBlock() {
  return (
    <div className={styles.logBlock}>
      <Link
        className={styles.logIn}
        to="/sign-in"
      >
        Sign In
      </Link>
      <Link
        className={styles.signUp}
        to="/sign-up"
      >
        Sign Up
      </Link>
    </div>
  );
}

export default LogBlock;
