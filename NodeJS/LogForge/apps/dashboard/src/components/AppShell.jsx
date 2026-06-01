import { useState } from 'react';
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { ChevronDown, LogOut, Moon, Sun } from 'lucide-react';
import { api } from '../lib/api';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { useToast } from '../context/ToastContext';
import { Logo } from './ui/Logo';
import { IconButton } from './ui/IconButton';
import { ApiKeyControl } from './ui/ApiKeyControl';

export function AppShell() {
  const navigate = useNavigate();
  const { user, setUser } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { addToast } = useToast();
  const [accountOpen, setAccountOpen] = useState(false);

  const logoutMutation = useMutation({
    mutationFn: api.logout,
    onSettled: () => {
      setUser(null);
      navigate('/login');
    }
  });

  const initial = user?.username?.charAt(0)?.toUpperCase() || 'D';

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="topbar-inner">
          <div className="flex items-center gap-5">
            <Logo />
            <nav aria-label="Main navigation">
              <NavLink
                to="/applications"
                className={({ isActive }) => `nav-link ${isActive ? 'nav-link-active' : ''}`}
              >
                Applications
              </NavLink>
            </nav>
          </div>

          <div className="toolbar">
            <IconButton label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`} onClick={toggleTheme}>
              {theme === 'light' ? <Moon size={17} /> : <Sun size={17} />}
            </IconButton>

            <div className="account-wrap">
              <button
                className="account-button"
                type="button"
                aria-expanded={accountOpen}
                aria-haspopup="menu"
                onClick={() => setAccountOpen((current) => !current)}
              >
                <span className="avatar">{initial}</span>
                <span className="account-name text-sm font-semibold">{user?.username}</span>
                <ChevronDown size={15} />
              </button>

              {accountOpen ? (
                <div className="account-popover" role="menu">
                  <p className="m-0 text-sm font-bold text-[var(--text)]">{user?.username}</p>
                  <p className="mt-0.5 mb-3 text-xs muted">{user?.email}</p>
                  <p className="mb-2 mt-0 text-xs font-bold text-[var(--text)]">Developer API key</p>
                  <ApiKeyControl apiKey={user?.apiKey} compact />
                  <div className="divider" />
                  <button
                    className="button button-quiet w-full justify-start"
                    type="button"
                    disabled={logoutMutation.isPending}
                    onClick={() => {
                      addToast('Signing out');
                      logoutMutation.mutate();
                    }}
                  >
                    <LogOut size={16} />
                    {logoutMutation.isPending ? 'Signing out...' : 'Logout'}
                  </button>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </header>

      <main className="page-container">
        <Outlet />
      </main>
    </div>
  );
}
