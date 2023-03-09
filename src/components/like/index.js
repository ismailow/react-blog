import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import baseURL from '../../vars';
import * as selectors from '../../store/selectors';

import styles from './like.module.scss';

function Like({ isLiked, likes, slug }) {
  const [like, setLike] = useState(isLiked);
  const [likesCounter, setLikesCounter] = useState(likes);
  const token = localStorage.getItem('token');
  const isLogged = useSelector(selectors.isLoggedIn);
  const navigate = useNavigate();

  const onLike = async () => {
    if (!isLogged) {
      navigate('/sign-in');
    }
    if (!like) {
      const request = await fetch(`${baseURL}/articles/${slug}/favorite`, {
        method: 'POST',
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      const response = await request.json();
      if (!response.errors) {
        setLike(true);
        setLikesCounter(Number(likesCounter) + 1);
      }
    } else {
      const request = await fetch(`${baseURL}/articles/${slug}/favorite`, {
        method: 'DELETE',
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      const response = request.json();
      if (!response.errors) {
        setLike(false);
        setLikesCounter(Number(likesCounter) - 1);
      }
    }
  };

  return (
    <button
      className={styles.likeBtn}
      onClick={onLike}
    >
      <img
        src={`/img/${like ? 'liked.svg' : 'unliked.svg'}`}
        alt="like"
      />
      {likesCounter}
    </button>
  );
}

export default Like;
