import styles from '../pages.module.css';
import { Button, PasswordInput, EmailInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { ChangeEvent, FormEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { performLogin } from '../../../store/actions/accountActions';

function Login(): React.ReactElement {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const loginError = useSelector((state: any) => state.accountDataStore.loginError);

  function handlePasswordChange(e: ChangeEvent<HTMLInputElement>) {
    setPassword(e.target.value);
  };

  function handleEmailChange(e: ChangeEvent<HTMLInputElement>) {
    setEmail(e.target.value);
  };

  function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // @ts-ignore
    dispatch(performLogin({ email, password }));
  };

  return (
    <div className={`${styles.entrance}`}>
      <form className={`${styles.form}`} onSubmit={handleLogin}>
        <p className="text text_type_main-medium mb-6">Вход</p>
        <EmailInput
          onChange={handleEmailChange}
          value={email}
          name="email"
          extraClass="mb-6"
        />
        <PasswordInput
          onChange={handlePasswordChange}
          value={password}
          name="password"
          icon="ShowIcon"
          extraClass="mb-6"
        />
        {loginError && <div className="text text_type_main-default text_color_error mb-6">Ошибка логина: {loginError}</div>}
        <Button
          htmlType="submit"
          type="primary"
          size="medium"
          extraClass={`mb-20 ${styles.button}`}>
          Войти
        </Button>
        <p className="text text_type_main-default text_color_inactive mb-4">
          Вы - новый пользователь? <Link to="/register" className={styles.link}>Зарегистрироваться</Link>
        </p>
        <p className="text text_type_main-default text_color_inactive">
          Забыли пароль? <Link to="/forgot-password" className={styles.link}>Восстановить пароль</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;

