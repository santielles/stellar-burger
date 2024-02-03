import styles from '../pages.module.css';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { PasswordInput, EmailInput, Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { performGetUserDetails, performLogout, performSetUserDetails } from '../../../store/actions/accountActions';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

function Profile(): React.ReactElement {
  const [email, setEmail] = useState('');
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [userDataChanged, setUserDataChanged] = useState<boolean>(false);
  const dispatch = useDispatch();
  const userProfile = useSelector((state: any) => state.accountDataStore.login);

  useEffect(() => {
    if (Object.keys(userProfile).length !== 0) {
      setEmail(userProfile.email);
      setLogin(userProfile.name);
    }
  }, [userProfile]);

  useEffect(() => {
    // @ts-ignore
    dispatch(performGetUserDetails());
  }, []);

  function handleEmailChange(e: ChangeEvent<HTMLInputElement>) {
    setEmail(e.target.value);
    setUserDataChanged(true);
  };

  function handleLoginChange(e: ChangeEvent<HTMLInputElement>) {
    setLogin(e.target.value);
    setUserDataChanged(true);
  };

  function handlePasswordChange(e: ChangeEvent<HTMLInputElement>) {
    setPassword(e.target.value);
    setUserDataChanged(true);
  };

  function handleLogout() {
    // @ts-ignore
    dispatch(performLogout());
  };

  function handleCancel() {
    if (userProfile) {
      setEmail(userProfile.email);
      setLogin(userProfile.name);
      setPassword('');
    }
    setUserDataChanged(false);
  }

  function handleSave(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // @ts-ignore
    dispatch(performSetUserDetails({ email, login }));
    setUserDataChanged(false);
  }

  return (
    <div className={`${styles.entrance}`}>
      <div className={`${styles.container}`}>
        <div className={`${styles.menu}`}>
          <NavLink
            to='/profile'
            className={({ isActive }) =>
              isActive ?
                `text text_type_main-medium text_color_primary ${styles.menuLink}` :
                `text text_type_main-medium text_color_inactive ${styles.menuLink}`
            }
          >
            Профиль
          </NavLink>
          <p className={`text text_type_main-medium text_color_inactive ${styles.menuLink}`}>
            История заказов
          </p>
          <div
            className={`text text_type_main-medium text_color_inactive ${styles.menuLink}`}
            onClick={handleLogout}
          >
            Выход
          </div>
          <p className={`text text_type_main-default text_color_inactive ${styles.menuDescription}`}>В этом разделе вы можете изменить свои персональные данные</p>
        </div>
        <form className={`${styles.form}`} onSubmit={handleSave}>
          <EmailInput
            onChange={handleEmailChange}
            value={email}
            name='email'
            placeholder="Email"
            isIcon={true}
            extraClass="mb-6"
          />
          <Input
            type={'text'}
            onChange={handleLoginChange}
            value={login}
            name='login'
            placeholder="Логин"
            icon="EditIcon"
            extraClass="mb-6"
          />
          <PasswordInput
            onChange={handlePasswordChange}
            value={password}
            name="password"
            extraClass="mb-6"
          />
          {userDataChanged && (
            <div>
              <Button
                onClick={handleCancel}
                type="secondary"
                htmlType="reset">
                Отмена
              </Button>
              <Button
                type="primary"
                htmlType="submit">
                Сохранить
              </Button>
            </div>
          )}
        </form>
      </div>
    </div >
  );
};

export default Profile;
