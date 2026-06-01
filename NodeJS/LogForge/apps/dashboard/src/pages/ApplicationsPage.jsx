import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { formatDistanceToNow } from 'date-fns';
import { Box, ChevronRight, KeyRound, MoreHorizontal, Plus, Server, Trash2 } from 'lucide-react';
import { api } from '../lib/api';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { ApiKeyControl } from '../components/ui/ApiKeyControl';
import { Dialog } from '../components/ui/Dialog';
import { IconButton } from '../components/ui/IconButton';
import { TableSkeleton } from '../components/ui/Skeleton';

function validateName(name) {
  if (!name.trim()) return 'Application name is required.';
  if (name.length > 80) return 'Application name must be 80 characters or fewer.';
  if (/\s/.test(name)) return 'Application name must not contain whitespace.';
  return '';
}

export function ApplicationsPage() {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const { addToast } = useToast();
  const [name, setName] = useState('');
  const [nameError, setNameError] = useState('');
  const [createOpen, setCreateOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [openMenu, setOpenMenu] = useState(null);

  const appsQuery = useQuery({
    queryKey: ['applications'],
    queryFn: api.getApplications
  });

  const createMutation = useMutation({
    mutationFn: api.createApplication,
    onSuccess: () => {
      setName('');
      setCreateOpen(false);
      addToast('Application created');
      queryClient.invalidateQueries({ queryKey: ['applications'] });
    }
  });

  const deleteMutation = useMutation({
    mutationFn: api.deleteApplication,
    onSuccess: () => {
      addToast(`${deleteTarget} deleted`);
      setDeleteTarget(null);
      setOpenMenu(null);
      queryClient.invalidateQueries({ queryKey: ['applications'] });
    }
  });

  const applications = appsQuery.data?.applications || [];

  function closeCreateDialog() {
    if (createMutation.isPending) return;
    setCreateOpen(false);
    setName('');
    setNameError('');
  }

  function submitApplication(event) {
    event.preventDefault();
    const validationError = validateName(name);
    setNameError(validationError);
    if (!validationError) createMutation.mutate({ name });
  }

  return (
    <>
      <header className="page-header">
        <div>
          <h1 className="page-title">Applications</h1>
          <p className="page-description">
            {applications.length} {applications.length === 1 ? 'application' : 'applications'} connected to your account
          </p>
        </div>
        <button className="button button-primary" type="button" onClick={() => setCreateOpen(true)}>
          <Plus size={16} />
          New application
        </button>
      </header>

      <section className="panel setup-panel">
        <div className="setup-intro">
          <span className="setup-icon"><KeyRound size={19} /></span>
          <div>
            <h2 className="section-title">Logger setup</h2>
            <p className="section-description">
              Use your developer key when initializing the LogForge logger SDK on a trusted server.
            </p>
          </div>
        </div>
        <div className="setup-key-area">
          <p className="setup-key-label">Developer API key</p>
          <ApiKeyControl apiKey={user?.apiKey} />
        </div>
      </section>

      <section className="panel applications-panel">
        <div className="panel-header">
          <div>
            <h2 className="section-title">Your applications</h2>
            <p className="section-description">Open an application to inspect grouped logs and event analytics.</p>
          </div>
          <p className="applications-count">
            {applications.length} {applications.length === 1 ? 'application' : 'applications'}
          </p>
        </div>

        {appsQuery.isLoading ? <TableSkeleton /> : null}
        {appsQuery.error ? <p className="error-state">{appsQuery.error.message}</p> : null}

        {!appsQuery.isLoading && !appsQuery.error && applications.length === 0 ? (
          <div className="empty-state">
            <div>
              <Box color="var(--text-faint)" size={24} />
              <h3>No applications yet</h3>
              <p>Create an application, then initialize the logger SDK with its name and your developer key.</p>
            </div>
          </div>
        ) : null}

        {!appsQuery.isLoading && !appsQuery.error && applications.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Application</th>
                  <th>Created</th>
                  <th className="w-28 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {applications.map((application) => (
                  <tr key={application._id}>
                    <td className="application-main-cell">
                      <div className="application-cell">
                        <span className="application-icon"><Server size={17} /></span>
                        <div className="application-name-wrap">
                          <Link className="text-link cell-title" to={`/applications/${application.name}`}>
                            {application.name}
                          </Link>
                          <span>Grouped log explorer</span>
                        </div>
                      </div>
                    </td>
                    <td className="application-created-cell">
                      <div className="application-created">
                        <span>{formatDistanceToNow(new Date(application.createdAt), { addSuffix: true })}</span>
                        <time dateTime={application.createdAt}>{new Date(application.createdAt).toLocaleString()}</time>
                      </div>
                    </td>
                    <td className="application-actions-cell">
                      <div className="application-actions">
                        <Link className="icon-button" title={`Open ${application.name}`} to={`/applications/${application.name}`}>
                          <ChevronRight size={17} />
                        </Link>
                        <IconButton
                          label={`More actions for ${application.name}`}
                          onClick={() => setOpenMenu((current) => (current === application._id ? null : application._id))}
                        >
                          <MoreHorizontal size={16} />
                        </IconButton>
                        {openMenu === application._id ? (
                          <div className="row-menu">
                            <button
                              className="button button-quiet w-full justify-start text-[var(--danger)]"
                              type="button"
                              onClick={() => setDeleteTarget(application.name)}
                            >
                              <Trash2 size={15} />
                              Delete
                            </button>
                          </div>
                        ) : null}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : null}
      </section>

      <Dialog
        open={createOpen}
        title="New application"
        onClose={closeCreateDialog}
        actions={
          <>
            <button className="button" type="button" onClick={closeCreateDialog}>
              Cancel
            </button>
            <button className="button button-primary" type="submit" form="create-application-form" disabled={createMutation.isPending}>
              {createMutation.isPending ? 'Creating...' : 'Create application'}
            </button>
          </>
        }
      >
        <form id="create-application-form" className="field" onSubmit={submitApplication}>
          <label className="field-label" htmlFor="application-name">Application name</label>
          <input
            required
            id="application-name"
            placeholder="application-name"
            className="input"
            maxLength={80}
            value={name}
            onChange={(event) => {
              setName(event.target.value);
              setNameError('');
            }}
          />
          <p className="m-0 text-xs muted">Use up to 80 characters without spaces.</p>
          {nameError ? <p className="form-error m-0">{nameError}</p> : null}
          {createMutation.error ? <p className="form-error m-0">{createMutation.error.message}</p> : null}
        </form>
      </Dialog>

      <Dialog
        open={Boolean(deleteTarget)}
        title="Delete application"
        onClose={() => {
          if (!deleteMutation.isPending) setDeleteTarget(null);
        }}
        actions={
          <>
            <button className="button" type="button" onClick={() => setDeleteTarget(null)}>
              Cancel
            </button>
            <button
              className="button button-danger"
              type="button"
              disabled={deleteMutation.isPending}
              onClick={() => deleteMutation.mutate(deleteTarget)}
            >
              <Trash2 size={15} />
              {deleteMutation.isPending ? 'Deleting...' : `Delete ${deleteTarget}`}
            </button>
          </>
        }
      >
        <p className="m-0 text-sm muted">
          This permanently removes <strong className="text-[var(--text)]">{deleteTarget}</strong> and all of its stored logs.
        </p>
      </Dialog>
    </>
  );
}
