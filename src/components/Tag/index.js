import styles from './tag.module.scss';

function Tag({ text }) {
  return <div className={styles.tag}>{text}</div>;
}

export default Tag;
