import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { message } from 'antd';

import { update } from '../../store/slices/userSlice';
import styles from '../../styles/form.module.scss';
import baseURL from '../../vars';
import { emailSchema, passwordSchema, urlSchema } from '../../validationSchemas';
import * as selectors from '../../store/selectors';

function ProfilePage() {
  const isLogged = useSelector(selectors.isLoggedIn);
  const userName = useSelector(selectors.userName);
  const userEmail = useSelector(selectors.email);
  const userAvatar = useSelector(selectors.avatar);
  const token = useSelector(selectors.token);
  const submitRef = useRef();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors, dirtyFields, isDirty },
    setError,
  } = useForm({
    mode: 'onBlur',
    defaultValues: {
      username: userName,
      email: userEmail,
      image: userAvatar,
    },
  });

  useEffect(() => {
    if (!isLogged) {
      navigate('/sign-in');
    }
  }, [isLogged, navigate]);

  const onSubmit = async (data) => {
    submitRef.current.disabled = true;
    if (data.username === '') {
      setError('username', { type: 'custom', message: 'Username must not be empty' });
    }

    const requestBody = {
      user: {},
    };
    Object.keys(dirtyFields).forEach((key) => {
      // eslint-disable-next-line no-prototype-builtins
      if (data.hasOwnProperty(key)) {
        requestBody.user[key] = data[key];
      }
    });
    const request = await fetch(`${baseURL}/user`, {
      method: 'PUT',
      body: JSON.stringify(requestBody),
      headers: {
        Authorization: `Token ${token}`,
        'Content-Type': 'application/json',
      },
    });

    const response = await request.json();
    if (response.errors) {
      if (response.errors.username) {
        setError('username', { type: 'custom', message: 'Username already taken' });
      } else if (response.errors.email) {
        setError('email', { type: 'custom', message: 'Email already taken' });
      } else {
        message.error('Something went wrong. Try again');
      }
    } else {
      dispatch(update(response));
      submitRef.current.disabled = false;
      message.success('Succes');
    }
  };

  return (
    <div className={styles.formBlock}>
      <form
        className={styles.form}
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2>Edit profile</h2>
        <p>Username</p>
        <input
          {...register('username')}
          type="text"
          placeholder="Username"
          name="username"
          className={errors.username ? styles.error : null}
        />
        {errors?.username && <p className={styles.errorMessage}>{errors?.username?.message || 'Error!'}</p>}
        <p>Email address</p>
        <input
          placeholder="Email"
          {...register('email', emailSchema)}
          className={errors.email ? styles.error : null}
        />
        {errors?.email && <p className={styles.errorMessage}>{errors?.email?.message || 'Error!'}</p>}
        <p>New password</p>
        <input
          type="password"
          placeholder="New password"
          {...register('password', passwordSchema)}
        />
        {errors?.password && <p className={styles.errorMessage}>{errors?.password?.message || 'Error!'}</p>}
        <p>Avatar image (url)</p>
        <input
          type="url"
          placeholder="URL"
          {...register('image', urlSchema)}
          className={errors.image ? styles.error : null}
        />
        {errors?.image && <p className={styles.errorMessage}>{errors?.image?.message || 'Error!'}</p>}
        <button
          type="submit"
          disabled={!isDirty}
          ref={submitRef}
        >
          Save
        </button>
      </form>
    </div>
  );
}

export default ProfilePage;
