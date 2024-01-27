import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

function ProtectedRoute({ children }) {
  const location = useLocation();

  const isAuthenticated = useSelector((state) => state.accountDataStore.isAuthenticated);

  if (!isAuthenticated) {
    // Сохраняем путь для возможного возвращения после авторизации
    localStorage.setItem('preAuthPath', location.pathname);

    // Перенаправляем на страницу входа
    return <Navigate to="/login" replace />;
  }

  // Если пользователь авторизован, отображаем запрашиваемый компонент
  return children;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired
};

export default ProtectedRoute;
