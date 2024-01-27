import styles from '../pages.module.css';
import { useEffect, useState } from 'react';
import { PasswordInput, EmailInput, Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { performGetUserDetails, performLogout, performSetUserDetails } from '../../../store/actions/accountActions';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

function Profile() {
  const [email, setEmail] = useState('');
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [userDataChanged, setUserDataChanged] = useState('');
  const dispatch = useDispatch();
  const userProfile = useSelector((state) => state.accountDataStore.login);
  console.log('Profile');
  useEffect(() => {
    if (Object.keys(userProfile).length !== 0) {
      setEmail(userProfile.email);
      setLogin(userProfile.name);
    }
  }, [userProfile]);

  useEffect(() => {
    dispatch(performGetUserDetails());
  }, []);

  function handleEmailChange(e) {
    setEmail(e.target.value);
    setUserDataChanged(true);
  };

  function handleLoginChange(e) {
    setLogin(e.target.value);
    setUserDataChanged(true);
  };

  function handlePasswordChange(e) {
    setPassword(e.target.value);
    setUserDataChanged(true);
  };

  function handleLogout() {
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

  function handleSave() {
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
          <NavLink
            className={`text text_type_main-medium text_color_inactive ${styles.menuLink}`}
            onClick={handleLogout}
          >
            Выход
          </NavLink>
          <p className={`text text_type_main-default text_color_inactive ${styles.menuDescription}`}>В этом разделе вы можете изменить свои персональные данные</p>
        </div>
        <div>
          <div className={`${styles.form}`}>
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
          </div>
          {userDataChanged && (
            <>
              <Button
                onClick={handleCancel}
                type="secondary"
                htmlType="reset">
                Отмена
              </Button>
              <Button
                onClick={handleSave}
                type="primary"
                htmlType="submit">
                Сохранить
              </Button>
            </>
          )}
        </div>
      </div>
    </div >
  );
};

export default Profile;
