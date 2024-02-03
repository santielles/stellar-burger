import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import Preloader from '../Preloader/Preloader';

interface ProtectedRouteProps {
  children: JSX.Element;
  redirectAuthenticated?: boolean;
}

function ProtectedRoute({ children, redirectAuthenticated = false }: ProtectedRouteProps): React.ReactElement {
  const location = useLocation();
  const isInitializing = useSelector((state: any) => state.accountDataStore.isInitializing);
  const isAuthenticated = useSelector((state: any) => state.accountDataStore.isAuthenticated);

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

export default ProtectedRoute;
