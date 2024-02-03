import styles from '../pages.module.css';
import { ChangeEvent, FormEvent, useState } from 'react';
import { Button, PasswordInput, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { performResetPassword } from '../../../store/actions/accountActions';

function ResetPassword(): React.ReactElement {
  const [password, setPassword] = useState('');
  const [number, setNumber] = useState('');
  const dispatch = useDispatch();
  const passwordChanged = useSelector((state: any) => state.accountDataStore.resetPassword.passwordChanged);
  const resetPasswordError = useSelector((state: any) => state.accountDataStore.resetPassword.error);
  const location = useLocation();
  const cameFromForgotPassword = location.state?.cameFrom === '/forgot-password';

  function handlePasswordChange(e: ChangeEvent<HTMLInputElement>) {
    setPassword(e.target.value);
  };

  function handleNumber(e: ChangeEvent<HTMLInputElement>) {
    setNumber(e.target.value);
  };

  function handleResetPassword(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // @ts-ignore
    dispatch(performResetPassword({ number, password }));
  };

  if (!cameFromForgotPassword) {
    return <Navigate to="/forgot-password" replace={true} />;
  }

  return (
    <div className={`${styles.entrance}`}>
      {passwordChanged && (
        <Navigate to="/login" replace={true} />
      )}
      <form className={`${styles.form}`} onSubmit={handleResetPassword}>
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
          icon="EditIcon"
          placeholder="Введите код из письма"
          extraClass="mb-6"
        />
        {resetPasswordError && <div className="text text_type_main-default text_color_error mb-6">Ошибка: {resetPasswordError}</div>}
        <Button
          htmlType="submit"
          type="primary"
          size="medium"
          extraClass={`mb-20 ${styles.button}`}>
          Сохранить
        </Button>
        <p className="text text_type_main-default text_color_inactive mb-4" style={{ textAlign: 'center' }}>Вспомнили пароль? <a href="/register" className={styles.link}>Войти</a></p>
      </form>
    </div>
  );
};

export default ResetPassword;
