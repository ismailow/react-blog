import { Alert } from 'antd';

import styles from './errorIndicator.module.scss';

function ErrorIndicator() {
  return (
    <div className={styles.error}>
      <Alert
        type="error"
        message="Something went wrong"
      />
    </div>
  );
}

export default ErrorIndicator;
