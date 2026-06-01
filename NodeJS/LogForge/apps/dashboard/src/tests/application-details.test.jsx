import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { ApplicationDetailsPage } from '../pages/ApplicationDetailsPage';

vi.mock('../lib/api', () => ({
  api: {
    getApplication: vi.fn(),
    getLogs: vi.fn(),
    getLogAnalytics: vi.fn()
  }
}));

import { api } from '../lib/api';

function renderPage(route = '/applications/shop-app') {
  const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } });

  return render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter initialEntries={[route]}>
        <Routes>
          <Route path="/applications/:name" element={<ApplicationDetailsPage />} />
        </Routes>
      </MemoryRouter>
    </QueryClientProvider>
  );
}

function mockApplicationData({ dailySeries = [{ date: '2026-05-31', INFO: 2, WARN: 1, ERROR: 4 }] } = {}) {
  api.getApplication.mockResolvedValue({
    application: { name: 'shop-app', createdAt: new Date().toISOString() }
  });
  api.getLogs.mockResolvedValue({
    logs: [{
      _id: 'l1',
      message: 'Payment failed',
      level: 'ERROR',
      count: 4,
      firstOccurrenceAt: new Date().toISOString(),
      lastOccurrenceAt: new Date().toISOString()
    }],
    pagination: { page: 1, totalPages: 1, total: 1, limit: 10 }
  });
  api.getLogAnalytics.mockResolvedValue({
    totalsByLevel: { INFO: 2, WARN: 1, ERROR: 4 },
    dailySeries
  });
}

describe('ApplicationDetailsPage', () => {
  beforeEach(() => {
    api.getApplication.mockReset();
    api.getLogs.mockReset();
    api.getLogAnalytics.mockReset();
  });

  it('renders responsive logs, updates sorting, refreshes data, and sends inclusive date bounds', async () => {
    mockApplicationData();
    renderPage();

    expect((await screen.findAllByText('Payment failed')).length).toBe(2);
    expect(screen.getByText('Level distribution')).toBeInTheDocument();
    expect(screen.getByText('System performance')).toBeInTheDocument();

    fireEvent.change(screen.getByLabelText('Sort logs'), { target: { value: 'count' } });
    await waitFor(() => expect(api.getLogs.mock.calls.at(-1)[1]).toContain('sortBy=count'));

    fireEvent.change(await screen.findByLabelText('from date'), { target: { value: '2026-05-01' } });
    fireEvent.change(await screen.findByLabelText('to date'), { target: { value: '2026-05-31' } });

    await waitFor(() => {
      const queryString = decodeURIComponent(api.getLogAnalytics.mock.calls.at(-1)[1]);
      expect(queryString).toContain('from=2026-05-01T00:00:00.000Z');
      expect(queryString).toContain('to=2026-05-31T23:59:59.999Z');
    });

    const requestCount = api.getApplication.mock.calls.length;
    fireEvent.click(screen.getByRole('button', { name: 'Refresh' }));
    await waitFor(() => expect(api.getApplication.mock.calls.length).toBeGreaterThan(requestCount));
  });

  it('shows an empty analytics state and blocks an invalid date range', async () => {
    mockApplicationData({ dailySeries: [] });
    renderPage('/applications/shop-app?from=2026-06-02&to=2026-06-01');

    await screen.findByText('No analytics to chart');
    expect(screen.getByText(/end date must be on or after/i)).toBeInTheDocument();
  });
});
