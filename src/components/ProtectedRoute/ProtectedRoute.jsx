import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import Preloader from '../Preloader/Preloader';

function ProtectedRoute({ children, redirectAuthenticated = false }) {
  const location = useLocation();
  const isInitializing = useSelector((state) => state.accountDataStore.isInitializing);
  const isAuthenticated = useSelector((state) => state.accountDataStore.isAuthenticated);

  // Показываем прелоадер, если приложение все еще инициализируется
  if (isInitializing) {
    return <Preloader />;
  }

  // Если пользователь аутентифицирован и флаг redirectAuthenticated=true
  // то он не будет иметь доступа к определенным страницам
  // (логин, регистрация, восстановление пароля)
  if (isAuthenticated && redirectAuthenticated) {
    return <Navigate to="/" replace />;
  }

  // Если пользователь не аутентифицирован и флаг redirectAuthenticated=false, перенаправляем его на страницу входа
  //
  // redirectAuthenticated используем чтобы избежать бесконечного цикла перенаправлений
  // то есть '<Navigate to="/login" replace />' нас бы бесконечно перенаправлял на
  //    <ProtectedRoute redirectAuthenticated>
  //      <Login />
  //    </ProtectedRoute>
  // вместо того чтобы отрендерить '<Login />' в 'return children;'
  if (!isAuthenticated && !redirectAuthenticated) {
    // Сохраняем путь для возможного возвращения после авторизации
    localStorage.setItem('preAuthPath', location.pathname);
    // Перенаправляем на страницу входа

    return <Navigate to="/login" replace />;
  }
  // Если пользователь аутентифицирован, отображаем запрашиваемый компонент
  return children;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
  redirectAuthenticated: PropTypes.bool
};

export default ProtectedRoute;
