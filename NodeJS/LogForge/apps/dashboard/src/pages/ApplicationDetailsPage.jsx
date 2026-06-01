import { useMemo, useState } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { format, formatDistanceToNow } from 'date-fns';
import { AlertCircle, ChevronLeft, ChevronRight, Database, Layers3, RefreshCw, Search } from 'lucide-react';
import { api } from '../lib/api';
import { Loader } from '../components/Loader';
import { useDebouncedValue } from '../hooks/useDebouncedValue';
import { LogCharts } from '../components/LogCharts';

function toQueryString(params) {
  const query = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== null && value !== '') query.set(key, value);
  }
  return query.toString();
}

function getLevelClass(level) {
  if (level === 'ERROR') return 'badge-danger';
  if (level === 'WARN') return 'badge-warning';
  return 'badge-info';
}

export function ApplicationDetailsPage() {
  const { name } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchInput, setSearchInput] = useState(searchParams.get('search') || '');
  const [refreshing, setRefreshing] = useState(false);
  const debouncedSearch = useDebouncedValue(searchInput, 350);

  const page = Number.parseInt(searchParams.get('page') || '1', 10);
  const sortBy = searchParams.get('sortBy') || 'recent';
  const level = searchParams.get('level') || '';
  const from = searchParams.get('from') || '';
  const to = searchParams.get('to') || '';
  const dateError = from && to && from > to ? 'The end date must be on or after the start date.' : '';

  const listQueryString = useMemo(
    () => toQueryString({ page, limit: 10, sortBy, level, search: debouncedSearch }),
    [page, sortBy, level, debouncedSearch]
  );

  const analyticsQueryString = useMemo(
    () =>
      toQueryString({
        level,
        search: debouncedSearch,
        from: from ? `${from}T00:00:00.000Z` : '',
        to: to ? `${to}T23:59:59.999Z` : ''
      }),
    [level, debouncedSearch, from, to]
  );

  const applicationQuery = useQuery({
    queryKey: ['application', name],
    queryFn: () => api.getApplication(name)
  });

  const logsQuery = useQuery({
    queryKey: ['logs', name, listQueryString],
    queryFn: () => api.getLogs(name, listQueryString),
    placeholderData: (previousData) => previousData
  });

  const analyticsQuery = useQuery({
    queryKey: ['analytics', name, analyticsQueryString],
    queryFn: () => api.getLogAnalytics(name, analyticsQueryString),
    enabled: !dateError,
    placeholderData: (previousData) => previousData
  });

  function patchParams(next) {
    const merged = new URLSearchParams(searchParams);
    Object.entries(next).forEach(([key, value]) => {
      if (value === '' || value === null || value === undefined) merged.delete(key);
      else merged.set(key, String(value));
    });
    setSearchParams(merged);
  }

  async function refreshData() {
    setRefreshing(true);
    await Promise.all([applicationQuery.refetch(), logsQuery.refetch(), analyticsQuery.refetch()]);
    setRefreshing(false);
  }

  if (applicationQuery.isLoading || logsQuery.isLoading || (analyticsQuery.isLoading && !dateError)) {
    return <Loader text="Loading application details..." />;
  }

  if (applicationQuery.error || logsQuery.error || analyticsQuery.error) {
    return (
      <p className="error-state">
        {applicationQuery.error?.message || logsQuery.error?.message || analyticsQuery.error?.message}
      </p>
    );
  }

  const application = applicationQuery.data.application;
  const logs = logsQuery.data.logs;
  const pagination = logsQuery.data.pagination;
  const analytics = analyticsQuery.data || { totalsByLevel: {}, dailySeries: [] };
  const eventVolume = Object.values(analytics.totalsByLevel).reduce((sum, value) => sum + value, 0);
  const resultStart = pagination.total ? (pagination.page - 1) * pagination.limit + 1 : 0;
  const resultEnd = Math.min(pagination.page * pagination.limit, pagination.total);

  return (
    <>
      <div className="breadcrumb">
        <Link to="/applications">Applications</Link>
        <ChevronRight size={14} />
        <span>{application.name}</span>
      </div>
      <header className="page-header">
        <div>
          <h1 className="page-title">{application.name}</h1>
          <p className="page-description">Created {new Date(application.createdAt).toLocaleString()}</p>
        </div>
        <button className="button button-primary" type="button" disabled={refreshing} onClick={refreshData}>
          <RefreshCw className={refreshing ? 'animate-spin' : ''} size={16} />
          {refreshing ? 'Refreshing...' : 'Refresh'}
        </button>
      </header>

      <section className="summary-strip" aria-label="Log summary">
        <div className="summary-item panel">
          <div className="summary-item-header">
            <p className="summary-label">Grouped patterns</p>
            <span className="summary-icon"><Layers3 size={19} /></span>
          </div>
          <p className="summary-value">{pagination.total.toLocaleString()}</p>
          <p className="summary-caption">Distinct messages in this view</p>
        </div>
        <div className="summary-item panel">
          <div className="summary-item-header">
            <p className="summary-label">Filtered event volume</p>
            <span className="summary-icon"><Database size={19} /></span>
          </div>
          <p className="summary-value">{eventVolume.toLocaleString()}</p>
          <p className="summary-caption">Events matching analytics filters</p>
        </div>
        <div className="summary-item panel">
          <div className="summary-item-header">
            <p className="summary-label">Error events</p>
            <span className="summary-icon summary-icon-danger"><AlertCircle size={19} /></span>
          </div>
          <p className="summary-value">{(analytics.totalsByLevel.ERROR || 0).toLocaleString()}</p>
          <p className="summary-caption">Errors matching analytics filters</p>
        </div>
      </section>

      <section className="panel filters-panel" aria-label="Log filters">
        <div className="input-wrap">
          <Search className="input-icon" size={17} />
          <input
            aria-label="Search message"
            placeholder="Search log messages"
            value={searchInput}
            onChange={(event) => {
              const value = event.target.value;
              setSearchInput(value);
              patchParams({ page: 1, search: value || null });
            }}
            className="input input-with-icon"
          />
        </div>
        <select
          aria-label="Log level"
          value={level}
          onChange={(event) => patchParams({ level: event.target.value || null, page: 1 })}
          className="select"
        >
          <option value="">All levels</option>
          <option value="INFO">INFO</option>
          <option value="WARN">WARN</option>
          <option value="ERROR">ERROR</option>
        </select>
        <select
          aria-label="Sort logs"
          value={sortBy}
          onChange={(event) => patchParams({ sortBy: event.target.value, page: 1 })}
          className="select"
        >
          <option value="recent">Most recent</option>
          <option value="count">Most occurred</option>
        </select>
      </section>

      <LogCharts
        totalsByLevel={analytics.totalsByLevel}
        dailySeries={analytics.dailySeries}
        from={from}
        to={to}
        dateError={dateError}
        onDateChange={(key, value) => patchParams({ [key]: value || null })}
      />

      <section className="panel">
        <div className="panel-header">
          <div>
            <h2 className="section-title">Grouped logs</h2>
            <p className="section-description">Repeated messages are grouped by message and log level.</p>
          </div>
        </div>

        {logs.length === 0 ? (
          <div className="empty-state">
            <div>
              <Search color="var(--text-faint)" size={24} />
              <h3>No logs found</h3>
              <p>Adjust the filters or send a log event to this application.</p>
            </div>
          </div>
        ) : (
          <>
            <div className="logs-desktop overflow-x-auto">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Message</th>
                    <th>Level</th>
                    <th>Count</th>
                    <th>Last occurrence</th>
                  </tr>
                </thead>
                <tbody>
                  {logs.map((log) => (
                    <tr key={log._id}>
                      <td>
                        <div className="log-message-cell">
                          <span className="mono log-message">{log.message}</span>
                          <span>First seen {format(new Date(log.firstOccurrenceAt), 'PPp')}</span>
                        </div>
                      </td>
                      <td><span className={`badge ${getLevelClass(log.level)}`}>{log.level}</span></td>
                      <td className="mono font-bold text-[var(--text)]">{log.count.toLocaleString()}</td>
                      <td>
                        <div className="log-time-cell">
                          <strong>{formatDistanceToNow(new Date(log.lastOccurrenceAt), { addSuffix: true })}</strong>
                          <span>{format(new Date(log.lastOccurrenceAt), 'PPp')}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="logs-mobile">
              {logs.map((log) => (
                <article className="mobile-log-card" key={log._id}>
                  <div className="mb-3 flex items-start justify-between gap-3">
                    <p className="mono m-0 text-xs text-[var(--text)]">{log.message}</p>
                    <span className={`badge ${getLevelClass(log.level)}`}>{log.level}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs muted">
                    <span>Count <strong className="text-[var(--text)]">{log.count.toLocaleString()}</strong></span>
                    <span>Last {format(new Date(log.lastOccurrenceAt), 'PPp')}</span>
                    <span className="col-span-2">First {format(new Date(log.firstOccurrenceAt), 'PPp')}</span>
                  </div>
                </article>
              ))}
            </div>
          </>
        )}

        <div className="pagination">
          <p className="m-0 text-xs muted">
            Showing {resultStart}-{resultEnd} of {pagination.total.toLocaleString()} grouped logs
          </p>
          <div className="flex gap-2">
            <button
              type="button"
              className="button"
              disabled={pagination.page <= 1}
              onClick={() => patchParams({ page: Math.max(1, pagination.page - 1) })}
            >
              <ChevronLeft size={15} />
              Previous
            </button>
            <button
              type="button"
              className="button"
              disabled={pagination.page >= pagination.totalPages}
              onClick={() => patchParams({ page: pagination.page + 1 })}
            >
              Next
              <ChevronRight size={15} />
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
