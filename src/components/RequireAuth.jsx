import { useLocation, Outlet, Navigate } from 'react-router-dom';

import useAuth from '../hooks/useAuth';

import { UserContextProvider } from '../context/UserContext';

function RequireAuth() {
  const { auth } = useAuth();
  const location = useLocation();

  return auth?.user ? (
    <UserContextProvider>
      <Outlet />
    </UserContextProvider>
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
}

export default RequireAuth;
