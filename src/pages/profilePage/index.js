import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { update } from '../../store/slices/userSlice';
import styles from '../../styles/form.module.scss';

const emailSchema = {
  pattern: {
    value: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,
    message: 'Email must be valid',
  },
};

const passwordSchema = {
  minLength: {
    value: 6,
    message: 'Password must be 6 characters or more',
  },
  maxLength: {
    value: 40,
    message: 'Password must be 40 characters or less',
  },
};

const urlSchema = {
  pattern: {
    value:
      /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/,
    message: 'URL must be valid',
  },
};

function ProfilePage() {
  const isLogged = useSelector((state) => state.userReducer.isLoggedIn);
  const userName = useSelector((state) => state.userReducer.userName);
  const userEmail = useSelector((state) => state.userReducer.email);
  const userAvatar = useSelector((state) => state.userReducer.avatar);
  const token = useSelector((state) => state.userReducer.token);
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
    const request = await fetch('https://blog.kata.academy/api/user', {
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
      }
      if (response.errors.email) {
        setError('email', { type: 'custom', message: 'Email already taken' });
      }
    } else {
      dispatch(update(response));
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
        >
          Save
        </button>
      </form>
    </div>
  );
}

export default ProfilePage;
