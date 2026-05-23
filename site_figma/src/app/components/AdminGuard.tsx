import { useEffect } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchAdminMe } from '../store/authSlice';

export function AdminGuard() {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const token = useAppSelector((s) => s.auth.token);
  const isLoginPage = location.pathname === '/admin' || location.pathname === '/admin/login';

  useEffect(() => {
    if (token) {
      dispatch(fetchAdminMe());
    }
  }, [dispatch, token]);

  if (!token && !isLoginPage) {
    return <Navigate to="/admin/login" replace />;
  }

  if (token && isLoginPage) {
    return <Navigate to="/admin/products" replace />;
  }

  return <Outlet />;
}
