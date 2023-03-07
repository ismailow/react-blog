import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import { logIn } from '../../store/slices/userSlice';
import styles from '../../styles/form.module.scss';
import baseURL from '../../vars';
import { signInEmailSchema, signInPasswordSchema } from '../../validationSchemas';

function SignInPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setError,
  } = useForm({
    mode: 'onBlur',
  });

  const onSubmit = async (data) => {
    const requestBody = {
      user: {
        email: data.email,
        password: data.password,
      },
    };
    const request = await fetch(`${baseURL}/users/login`, {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const response = await request.json();
    if (response.errors) {
      setError('email', { type: 'custom', message: 'Email or passowrd is invalid' });
      setError('password', { type: 'custom', message: 'Email or passowrd is invalid' });
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
        <h2>Sign In</h2>
        <p>Email address</p>
        <input
          type="email"
          placeholder="Email address"
          {...register('email', signInEmailSchema)}
          className={errors.email ? styles.error : null}
        />
        {errors?.email && <p className={styles.errorMessage}>{errors?.email?.message || 'Error!'}</p>}
        <p>Password</p>
        <input
          type="password"
          placeholder="Password"
          {...register('password', signInPasswordSchema)}
          className={errors.password ? styles.error : null}
        />
        {errors?.password && <p className={styles.errorMessage}>{errors?.password?.message || 'Error!'}</p>}
        <button disabled={!isValid}>Login</button>
        <p className={styles.redirectBlock}>
          Don’t have an account? <Link to="/sign-up">Sign Up</Link>.
        </p>
      </form>
    </div>
  );
}

export default SignInPage;
