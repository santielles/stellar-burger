import styles from '../pages.module.css';
import { Button, PasswordInput, EmailInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { performLogin } from '../../../store/actions/accountActions';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const loginError = useSelector((state) => state.accountDataStore.loginError);

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  };

  function handleEmailChange(e) {
    setEmail(e.target.value);
  };

  function handleLogin() {
    dispatch(performLogin({ email, password }));
  };

  return (
    <div className={`${styles.entrance}`}>
      <div className={`${styles.form}`}>
        <p className="text text_type_main-medium mb-6" style={{ textAlign: 'center' }}>Вход</p>
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
          onClick={handleLogin}
          htmlType="button"
          type="primary"
          size="medium"
          extraClass={`mb-20 ${styles.button}`}>
          Войти
        </Button>
        <p className="text text_type_main-default text_color_inactive mb-4" style={{ textAlign: 'center' }}>
          Вы - новый пользователь? <Link to="/register" className={styles.link}>Зарегистрироваться</Link>
        </p>
        <p className="text text_type_main-default text_color_inactive" style={{ textAlign: 'center' }}>
          Забыли пароль? <Link to="/forgot-password" className={styles.link}>Восстановить пароль</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;

