import styles from '../pages.module.css';
import { useState } from 'react';
import { Button, PasswordInput, EmailInput, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import { performRegistration } from '../../../store/actions/accountActions';
import { useDispatch, useSelector } from 'react-redux';

function Register() {
  const [email, setEmail] = useState('');
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const registerError = useSelector((state) => state.accountDataStore.registerError);

  function handleEmailChange(e) {
    setEmail(e.target.value);
  };

  function handleLoginChange(e) {
    setLogin(e.target.value);
  };

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  };

  function handleRegister() {
    dispatch(performRegistration({ email, login, password }));
  };

  return (
    <div className={`${styles.entrance}`}>
      <div className={`${styles.form}`}>
        <p className="text text_type_main-medium mb-6" style={{ textAlign: 'center' }}>Регистрация</p>
        <EmailInput
          onChange={handleEmailChange}
          value={email}
          name="email"
          placeholder="Email"
          extraClass="mb-6"
        />
        <Input
          onChange={handleLoginChange}
          value={login}
          name="login"
          placeholder="Логин"
          extraClass="mb-6"
        />
        <PasswordInput
          onChange={handlePasswordChange}
          value={password}
          name="password"
          extraClass="mb-6"
        />
        {registerError && <div className="text text_type_main-default text_color_error mb-6">Ошибка регистрации: {registerError}</div>}
        <Button
          onClick={handleRegister}
          htmlType="button"
          type="primary"
          size="medium"
          extraClass={`mb-20 ${styles.button}`}>
          Зарегистрироваться
        </Button>
        <p className="text text_type_main-default text_color_inactive mb-4" style={{ textAlign: 'center' }}>
          Уже зарегистрированы? <Link to="/login" className={styles.link}>Войти</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;

