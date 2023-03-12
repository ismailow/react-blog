import styles from './notFoundPage.module.scss';

function NoMatch() {
  return (
    <div className={styles.block}>
      <h1>404</h1>
      <p>Page not found</p>
    </div>
  );
}

export default NoMatch;
