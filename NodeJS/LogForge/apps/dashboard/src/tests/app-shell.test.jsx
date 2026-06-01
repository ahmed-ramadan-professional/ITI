import { fireEvent, render, screen } from '@testing-library/react';
import { Route, Routes } from 'react-router-dom';
import { AppShell } from '../components/AppShell';
import { withTestProviders } from './testUtils';

vi.mock('../lib/api', () => ({
  api: {
    logout: vi.fn()
  }
}));

describe('AppShell', () => {
  it('persists theme selection and exposes account key controls', async () => {
    const user = { username: 'alice', email: 'alice@example.com', apiKey: 'abc123-secret' };

    render(
      withTestProviders(
        <Routes>
          <Route element={<AppShell />}>
            <Route path="/applications" element={<p>Applications content</p>} />
          </Route>
        </Routes>,
        { user, route: '/applications' }
      )
    );

    fireEvent.click(screen.getByRole('button', { name: 'Switch to dark mode' }));
    expect(localStorage.getItem('logforge-theme')).toBe('dark');
    expect(document.documentElement).toHaveClass('dark');

    fireEvent.click(screen.getByRole('button', { name: /alice/i }));
    expect(screen.getByText('alice@example.com')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Reveal API key' }));
    expect(screen.getByLabelText('API key value')).toHaveTextContent('abc123-secret');
  });
});
