import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import baseURL from '../../vars';

import styles from './deleteModal.module.scss';

function DeleteModal({ onCloseModal }) {
  const navigate = useNavigate();
  const params = useParams();
  const token = useSelector((state) => state.userReducer.token);

  const onDelete = async () => {
    const request = await fetch(`${baseURL}/${params.slug}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Token ${token}`,
        'Content-Type': 'application/json',
      },
    });
    if (request.ok) {
      navigate('/');
    }
  };

  return (
    <div className={styles.modal}>
      <div className={styles.triangle} />
      <div className={styles.body}>
        <img
          src="/img/alert.svg"
          alt="icon"
        />
        <p>Are you sure to delete this article?</p>
      </div>
      <div className={styles.footer}>
        <button
          className={styles.no}
          onClick={onCloseModal}
        >
          No
        </button>
        <button
          className={styles.yes}
          onClick={onDelete}
        >
          Yes
        </button>
      </div>
    </div>
  );
}

export default DeleteModal;
