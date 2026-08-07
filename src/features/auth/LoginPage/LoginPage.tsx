import { useState, type FormEvent } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { useLoginMutation } from '../authApi';
import { selectIsAuthenticated, setCredentials } from '../authSlice';
import styles from './LoginPage.module.css';

export const LoginPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const [login, { isLoading, error }] = useLoginMutation();

  const [username, setUsername] = useState('emilys');
  const [password, setPassword] = useState('emilyspass');

  const from =
    (location.state as { from?: { pathname: string } } | null)?.from?.pathname ??
    '/';

  if (isAuthenticated) {
    return <Navigate to={from} replace />;
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const result = await login({ username, password }).unwrap();
      const { accessToken, ...user } = result;

      dispatch(
        setCredentials({
          token: accessToken,
          user: {
            id: user.id,
            username: user.username,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            image: user.image,
          },
        }),
      );

      navigate(from, { replace: true });
    } catch {
      // ошибка уже в error от RTK Query
    }
  };

  const errorMessage =
    error && 'data' in error
      ? String((error.data as { message?: string })?.message ?? 'Ошибка входа')
      : error
        ? 'Ошибка входа'
        : null;

  return (
    <section className={styles.page}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h1 className={styles.title}>Вход</h1>
      

        <label className={styles.field}>
          <span>Username</span>
          <input
            type="text"
            name="username"
            autoComplete="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>

        <label className={styles.field}>
          <span>Password</span>
          <input
            type="password"
            name="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>

        {errorMessage ? <p className={styles.error}>{errorMessage}</p> : null}

        <button className={styles.submit} type="submit" disabled={isLoading}>
          {isLoading ? 'Вход…' : 'Войти'}
        </button>
      </form>
    </section>
  );
};
