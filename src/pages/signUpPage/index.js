/* eslint-disable import/no-extraneous-dependencies */
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';

import { logIn } from '../../store/slices/userSlice';
import styles from '../../styles/form.module.scss';
import baseURL from '../../vars';
import {
  signInEmailSchema,
  userNameSchema,
  signUpPasswordSchema,
  confirmPasswordSchema,
} from '../../validationSchemas';

function SignUpPage() {
  const submitRef = useRef();
  const [agreement, setAgreement] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setError,
  } = useForm({
    mode: 'onBlur',
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    submitRef.current.disabled = true;
    const requestBody = {
      user: {
        username: data.userName,
        email: data.email.toLowerCase(),
        password: data.password.toLowerCase(),
      },
    };

    const request = await fetch(`${baseURL}/users`, {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const response = await request.json();

    if (response.errors) {
      if (response.errors.username) {
        setError('userName', { type: 'custom', message: 'Username is taken' });
      }
      if (response.errors.email) {
        setError('email', { type: 'custom', message: 'Email is taken' });
      }
    } else {
      dispatch(logIn(response));
      localStorage.setItem('token', response.user.token);
      navigate('/');
    }
  };

  return (
    <div className={styles.formBlock}>
      <form
        className={styles.form}
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2>Create new account</h2>
        <p>Username</p>
        <input
          {...register('userName', userNameSchema)}
          type="text"
          placeholder="Username"
          name="userName"
          className={errors.userName ? styles.error : null}
        />
        {errors?.userName && <p className={styles.errorMessage}>{errors?.userName?.message || 'Error!'}</p>}
        <p>Email address</p>
        <input
          type="email"
          placeholder="Email address"
          {...register('email', signInEmailSchema)}
          name="email"
          className={errors.email ? styles.error : null}
        />
        {errors?.email && <p className={styles.errorMessage}>{errors?.email?.message || 'Error!'}</p>}
        <p>Password</p>
        <input
          type="password"
          placeholder="Password"
          name="password"
          {...register('password', signUpPasswordSchema)}
          className={errors.password ? styles.error : null}
        />
        {errors?.password && <p className={styles.errorMessage}>{errors?.password?.message || 'Error!'}</p>}
        <p>Repeat Password</p>
        <input
          type="password"
          placeholder="Password"
          name="repeatPassword"
          {...register('repeatPassword', confirmPasswordSchema)}
          className={errors.repeatPassword ? styles.error : null}
        />
        {errors?.repeatPassword && <p className={styles.errorMessage}>{errors?.repeatPassword?.message || 'Error!'}</p>}
        <div className={styles.agreement}>
          <input
            type="checkbox"
            id="agree"
            checked={agreement}
            onChange={() => setAgreement((prevState) => !prevState)}
          />
          <label htmlFor="agree">I agree to the processing of my personal information</label>
        </div>
        <button
          type="submit"
          disabled={!isValid || !agreement}
          ref={submitRef}
        >
          Create
        </button>
        <p className={styles.redirectBlock}>
          Already have an account? <Link to="/sign-in">Sign in</Link>.
        </p>
      </form>
    </div>
  );
}

export default SignUpPage;
