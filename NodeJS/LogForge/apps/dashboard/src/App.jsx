import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { ToastProvider } from './context/ToastContext';
import { queryClient } from './lib/queryClient';
import { AppShell } from './components/AppShell';
import { ProtectedRoute, PublicOnlyRoute } from './components/RouteGuards';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { ApplicationsPage } from './pages/ApplicationsPage';
import { ApplicationDetailsPage } from './pages/ApplicationDetailsPage';

const router = createBrowserRouter([
  {
    element: <PublicOnlyRoute />,
    children: [
      { path: '/login', element: <LoginPage /> },
      { path: '/register', element: <RegisterPage /> }
    ]
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <AppShell />,
        children: [
          { path: '/applications', element: <ApplicationsPage /> },
          { path: '/applications/:name', element: <ApplicationDetailsPage /> }
        ]
      }
    ]
  },
  {
    path: '*',
    element: <Navigate to="/applications" replace />
  }
]);

export default function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <RouterProvider router={router} />
          </AuthProvider>
        </QueryClientProvider>
      </ToastProvider>
    </ThemeProvider>
  );
}
