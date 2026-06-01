import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { RegisterPage } from '../pages/RegisterPage';
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
    register: vi.fn()
  }
}));

import { api } from '../lib/api';

describe('RegisterPage', () => {
  beforeEach(() => {
    navigateSpy.mockReset();
    api.register.mockReset();
  });

  it('reveals the password and submits account details', async () => {
    const setUser = vi.fn();
    api.register.mockResolvedValue({
      developer: { id: '1', username: 'alice', email: 'alice@example.com', apiKey: 'key' }
    });

    render(withTestProviders(<RegisterPage />, { auth: { setUser } }));

    fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'alice' } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'alice@example.com' } });
    fireEvent.change(screen.getByLabelText(/^password$/i), { target: { value: 'Password123' } });
    expect(screen.getByLabelText(/^password$/i)).toHaveAttribute('autocomplete', 'new-password');
    fireEvent.click(screen.getByRole('button', { name: 'Show password' }));
    expect(screen.getByLabelText(/^password$/i)).toHaveAttribute('type', 'text');
    fireEvent.click(screen.getByRole('button', { name: /register/i }));

    await waitFor(() => {
      expect(api.register.mock.calls[0][0]).toEqual({
        username: 'alice',
        email: 'alice@example.com',
        password: 'Password123'
      });
      expect(setUser).toHaveBeenCalled();
      expect(navigateSpy).toHaveBeenCalledWith('/applications');
    });
  });
});
