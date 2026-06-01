import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MemoryRouter } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { ThemeProvider } from '../context/ThemeContext';
import { ToastProvider } from '../context/ToastContext';

export function withTestProviders(ui, { user = null, auth = {}, route = '/' } = {}) {
  const client = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false }
    }
  });

  const authValue = {
    user,
    setUser: vi.fn(),
    loading: false,
    refreshUser: vi.fn(),
    ...auth
  };

  return (
    <ThemeProvider>
      <ToastProvider>
        <QueryClientProvider client={client}>
          <AuthContext.Provider value={authValue}>
            <MemoryRouter initialEntries={[route]}>{ui}</MemoryRouter>
          </AuthContext.Provider>
        </QueryClientProvider>
      </ToastProvider>
    </ThemeProvider>
  );
}
