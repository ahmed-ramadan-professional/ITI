import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { ApplicationsPage } from '../pages/ApplicationsPage';
import { withTestProviders } from './testUtils';

vi.mock('../lib/api', () => ({
  api: {
    getApplications: vi.fn(),
    createApplication: vi.fn(),
    deleteApplication: vi.fn()
  }
}));

import { api } from '../lib/api';

describe('ApplicationsPage', () => {
  beforeEach(() => {
    api.getApplications.mockReset();
    api.createApplication.mockReset();
    api.deleteApplication.mockReset();
    navigator.clipboard.writeText.mockClear();
  });

  it('creates an application, copies the API key, and confirms deletion', async () => {
    api.getApplications.mockResolvedValue({
      applications: [{ _id: '1', name: 'shop-app', createdAt: new Date().toISOString() }]
    });
    api.createApplication.mockResolvedValue({ application: { _id: '2', name: 'new-app' } });
    api.deleteApplication.mockResolvedValue({ message: 'deleted' });

    const user = { username: 'alice', email: 'alice@example.com', apiKey: 'abc123-secret' };
    render(withTestProviders(<ApplicationsPage />, { user }));

    await screen.findByText('shop-app');

    fireEvent.click(screen.getByRole('button', { name: 'Copy API key' }));
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('abc123-secret');
    await screen.findByText('API key copied');

    fireEvent.click(screen.getByRole('button', { name: /new application/i }));
    fireEvent.change(screen.getByPlaceholderText('application-name'), { target: { value: 'new-app' } });
    fireEvent.click(screen.getByRole('button', { name: /create application/i }));

    await waitFor(() => expect(api.createApplication.mock.calls[0][0]).toEqual({ name: 'new-app' }));

    fireEvent.click(screen.getByRole('button', { name: 'More actions for shop-app' }));
    fireEvent.click(screen.getByRole('button', { name: 'Delete' }));
    expect(screen.getByText(/permanently removes/i)).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Delete shop-app' }));

    await waitFor(() => expect(api.deleteApplication.mock.calls[0][0]).toBe('shop-app'));
  });

  it('validates application names before sending a request', async () => {
    api.getApplications.mockResolvedValue({ applications: [] });
    const user = { username: 'alice', email: 'alice@example.com', apiKey: 'abc123-secret' };
    render(withTestProviders(<ApplicationsPage />, { user }));

    await screen.findByText('No applications yet');
    fireEvent.click(screen.getByRole('button', { name: /new application/i }));
    fireEvent.change(screen.getByPlaceholderText('application-name'), { target: { value: 'two words' } });
    fireEvent.click(screen.getByRole('button', { name: /create application/i }));

    expect(await screen.findByText(/must not contain whitespace/i)).toBeInTheDocument();
    expect(api.createApplication).not.toHaveBeenCalled();
  });
});
