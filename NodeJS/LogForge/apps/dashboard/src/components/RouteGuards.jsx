import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Loader } from './Loader';

export function ProtectedRoute() {
  const { user, loading } = useAuth();

  if (loading) {
    return <Loader text="Checking session..." />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

export function PublicOnlyRoute() {
  const { user, loading } = useAuth();

  if (loading) {
    return <Loader text="Checking session..." />;
  }

  if (user) {
    return <Navigate to="/applications" replace />;
  }

  return <Outlet />;
}