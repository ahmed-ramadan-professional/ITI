import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { Mail, UserRound } from 'lucide-react';
import { api } from '../lib/api';
import { useAuth } from '../context/AuthContext';
import { AuthLayout } from '../components/AuthLayout';
import { PasswordInput } from '../components/ui/PasswordInput';

export function RegisterPage() {
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const [form, setForm] = useState({ username: '', email: '', password: '' });

  const mutation = useMutation({
    mutationFn: api.register,
    onSuccess: (data) => {
      setUser(data.developer);
      navigate('/applications');
    }
  });

  return (
    <AuthLayout>
      <h1>Create your account</h1>
      <p>Start collecting grouped application logs.</p>

      <form
        className="auth-form"
        onSubmit={(event) => {
          event.preventDefault();
          mutation.mutate(form);
        }}
      >
        <label className="field">
          <span className="field-label">Username</span>
          <div className="input-wrap">
            <UserRound className="input-icon" size={17} />
            <input
              required
              className="input input-with-icon"
              autoComplete="username"
              placeholder="your-username"
              value={form.username}
              onChange={(event) => setForm((current) => ({ ...current, username: event.target.value }))}
            />
          </div>
        </label>

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
            autoComplete="new-password"
            value={form.password}
            onChange={(event) => setForm((current) => ({ ...current, password: event.target.value }))}
          />
          <span className="field-help">Use at least 8 characters.</span>
        </label>

        {mutation.error ? <p className="form-error m-0">{mutation.error.message}</p> : null}

        <button className="button button-primary mt-1 w-full" type="submit" disabled={mutation.isPending}>
          {mutation.isPending ? 'Creating account...' : 'Register'}
        </button>
      </form>

      <p className="auth-switch">
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </AuthLayout>
  );
}
