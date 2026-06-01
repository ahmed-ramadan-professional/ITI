import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { LoginPage } from '../pages/LoginPage';
import { withTestProviders } from './testUtils';

const navigateSpy = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => navigateSpy
  };
});

vi.mock('../lib/api', () => ({
  api: {
    login: vi.fn()
  }
}));

import { api } from '../lib/api';

describe('LoginPage', () => {
  beforeEach(() => {
    navigateSpy.mockReset();
    api.login.mockReset();
  });

  it('submits credentials and redirects on success', async () => {
    const setUser = vi.fn();
    api.login.mockResolvedValue({
      developer: { id: '1', username: 'alice', email: 'alice@example.com', apiKey: 'key' }
    });

    render(withTestProviders(<LoginPage />, { auth: { setUser } }));

    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'alice@example.com' } });
    fireEvent.change(screen.getByLabelText(/^password$/i), { target: { value: 'Password123' } });
    fireEvent.click(screen.getByRole('button', { name: 'Show password' }));
    expect(screen.getByLabelText(/^password$/i)).toHaveAttribute('type', 'text');
    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() => {
      expect(api.login).toHaveBeenCalled();
      expect(api.login.mock.calls[0][0]).toEqual({
        email: 'alice@example.com',
        password: 'Password123'
      });
      expect(setUser).toHaveBeenCalled();
      expect(navigateSpy).toHaveBeenCalledWith('/applications');
    });
  });

  it('shows pending and API error states', async () => {
    let rejectLogin;
    api.login.mockImplementation(
      () =>
        new Promise((resolve, reject) => {
          rejectLogin = reject;
        })
    );

    render(withTestProviders(<LoginPage />));

    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'alice@example.com' } });
    fireEvent.change(screen.getByLabelText(/^password$/i), { target: { value: 'Password123' } });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));
    expect(await screen.findByRole('button', { name: 'Signing in...' })).toBeDisabled();

    rejectLogin(new Error('Invalid credentials'));
    expect(await screen.findByText('Invalid credentials')).toBeInTheDocument();
  });
});
