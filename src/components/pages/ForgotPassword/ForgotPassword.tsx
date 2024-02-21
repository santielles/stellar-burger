import styles from '../pages.module.css';
import { ChangeEvent, FormEvent, useState } from 'react';
import { Button, EmailInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { performForgotPassword } from '../../../store/actions/accountActions';

function ForgotPassword(): React.ReactElement {
  const [email, setEmail] = useState('');
  const dispatch = useDispatch();
  const emailSent = useSelector((state: any) => state.accountDataStore.resetPassword.emailSent);

  function handleEmailChange(e: ChangeEvent<HTMLInputElement>) {
    setEmail(e.target.value);
  };

  function handleForgotPassword(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // @ts-ignore
    dispatch(performForgotPassword(email));
  };

  return (
    <div className={`${styles.entrance}`}>
      {emailSent && (
        <Navigate
          to="/reset-password"
          replace={true}
          state={{ cameFrom: '/forgot-password' }}
        />
      )}
      <form className={`${styles.form}`} onSubmit={handleForgotPassword}>
        <p className="text text_type_main-medium mb-6">Восстановление пароля</p>
        <EmailInput
          onChange={handleEmailChange}
          value={email}
          placeholder="Укажите e-mail"
          name="email"
          extraClass="mb-6"
        />
        <Button
          htmlType="submit"
          type="primary"
          size="medium"
          extraClass={`mb-20 ${styles.button}`}>
          Восстановить
        </Button>
        <p className="text text_type_main-default text_color_inactive mb-4">
          Вспомнили пароль? <Link to="/login" className={styles.link}>Войти</Link>
        </p>
      </form>
    </div>
  );
};

export default ForgotPassword;
