import styles from '../pages.module.css';
import { useState } from 'react';
import { Button, PasswordInput, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { performResetPassword } from '../../../store/actions/accountActions';

function ResetPassword() {
  const [password, setPassword] = useState('');
  const [number, setNumber] = useState('');
  const dispatch = useDispatch();
  const passwordChanged = useSelector((state) => state.accountDataStore.resetPassword.passwordChanged);
  const resetPasswordError = useSelector((state) => state.accountDataStore.resetPassword.error);

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  };

  function handleNumber(e) {
    setNumber(e.target.value);
  };

  function handleResetPassword() {
    dispatch(performResetPassword({ number, password }));
  };

  return (
    <div className={`${styles.entrance}`}>
      {passwordChanged && (
        <Navigate to="/login" replace={true} />
      )}
      <div className={`${styles.form}`}>
        <p className="text text_type_main-medium mb-6" style={{ textAlign: 'center' }}>Восстановление пароля</p>
        <PasswordInput
          onChange={handlePasswordChange}
          value={password}
          name="password"
          placeholder="Введите новый пароль"
          extraClass="mb-6"
        />
        <Input
          onChange={handleNumber}
          value={number}
          name="number"
          icon="false"
          placeholder="Введите код из письма"
          extraClass="mb-6"
        />
        {resetPasswordError && <div className="text text_type_main-default text_color_error mb-6">Ошибка: {resetPasswordError}</div>}
        <Button
          onClick={handleResetPassword}
          htmlType="button"
          type="primary"
          size="medium"
          extraClass={`mb-20 ${styles.button}`}>
          Сохранить
        </Button>
        <p className="text text_type_main-default text_color_inactive mb-4" style={{ textAlign: 'center' }}>Вспомнили пароль? <a href="/register" className={styles.link}>Войти</a></p>
      </div>
    </div>
  );
};

export default ResetPassword;
