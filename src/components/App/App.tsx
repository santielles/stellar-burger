import styles from './App.module.css';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { AppHeader } from '../AppHeader/AppHeader';
import { MainSection } from '../MainSection/MainSection';
import Login from '../../pages/Login/Login';
import Register from '../../pages/Register/Register';
import ForgotPassword from '../../pages/ForgotPassword/ForgotPassword';
import ResetPassword from '../../pages/ResetPassword/ResetPassword';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import Profile from '../../pages/Profile/Profile';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchIngredients } from '../../store/actions/ingredientsListActions';
import IngredientPage from '../../pages/IngredientPage/IngredientPage';
import { performRefreshTokens } from '../../store/actions/accountActions';

function App(): React.ReactElement {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // location state сохраняется когда мы обновляем страницу по F5
    // у нас там хранится state: { modalOpened: true }
    // очищаем state при обновлении страницы чтобы избежать ошибок
    if (location.state) {
      navigate(location.pathname, { replace: true });
    }
    // @ts-ignore
    dispatch(fetchIngredients(true));
    // @ts-ignore
    dispatch(performRefreshTokens());
  }, [dispatch]);

  return (
    <div className={`${styles.app} m-10`}>
      <AppHeader />
      <Routes>
        <Route
          index
          element={
            <MainSection />
          }
        />
        <Route path="/login" element=
          {
            <ProtectedRoute redirectAuthenticated>
              <Login />
            </ProtectedRoute>
          }
        />
        <Route path="/register" element=
          {
            <ProtectedRoute redirectAuthenticated>
              <Register />
            </ProtectedRoute>
          }
        />
        <Route path="/forgot-password" element=
          {
            <ProtectedRoute redirectAuthenticated>
              <ForgotPassword />
            </ProtectedRoute>
          }
        />
        <Route path="/reset-password" element=
          {
            <ProtectedRoute redirectAuthenticated>
              <ResetPassword />
            </ProtectedRoute>
          }
        />
        {/* Если у нас в location в state есть переменная modalOpened, то открываем модальное окно с ингредиентом */}
        {/* иначе открываем отдельную страницу с ингредиентом */}
        <Route path="/ingredients/:id" element={location.state?.modalOpened ? <MainSection /> : <IngredientPage />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
      </Routes >
    </div>
  );
}

export default App;
