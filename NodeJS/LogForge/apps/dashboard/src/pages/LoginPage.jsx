import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { Mail } from 'lucide-react';
import { api } from '../lib/api';
import { useAuth } from '../context/AuthContext';
import { AuthLayout } from '../components/AuthLayout';
import { PasswordInput } from '../components/ui/PasswordInput';

export function LoginPage() {
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const [form, setForm] = useState({ email: '', password: '' });

  const mutation = useMutation({
    mutationFn: api.login,
    onSuccess: (data) => {
      setUser(data.developer);
      navigate('/applications');
    }
  });

  return (
    <AuthLayout>
      <h1>Welcome back</h1>
      <p>Sign in to review your application logs.</p>

      <form
        className="auth-form"
        onSubmit={(event) => {
          event.preventDefault();
          mutation.mutate(form);
        }}
      >
        <label className="field">
          <span className="field-label">Email address</span>
          <div className="input-wrap">
            <Mail className="input-icon" size={17} />
            <input
              required
              type="email"
              className="input input-with-icon"
              autoComplete="email"
              placeholder="name@company.com"
              value={form.email}
              onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
            />
          </div>
        </label>

        <label className="field">
          <span className="field-label">Password</span>
          <PasswordInput
            value={form.password}
            onChange={(event) => setForm((current) => ({ ...current, password: event.target.value }))}
          />
        </label>

        {mutation.error ? <p className="form-error m-0">{mutation.error.message}</p> : null}

        <button className="button button-primary mt-1 w-full" type="submit" disabled={mutation.isPending}>
          {mutation.isPending ? 'Signing in...' : 'Login'}
        </button>
      </form>

      <p className="auth-switch">
        No account yet? <Link to="/register">Create one</Link>
      </p>
    </AuthLayout>
  );
}
