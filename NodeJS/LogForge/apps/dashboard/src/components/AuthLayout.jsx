import { KeyRound, Layers3 } from 'lucide-react';
import { Logo } from './ui/Logo';
import { ThemeToggle } from './ui/ThemeToggle';

const FEATURES = [
  { icon: KeyRound, title: 'API-key ingestion', copy: 'Connect a server with a scoped developer key.' },
  { icon: Layers3, title: 'Grouped logs', copy: 'Repeated messages stay readable and countable.' }
];

export function AuthLayout({ children }) {
  return (
    <main className="auth-shell">
      <div className="auth-blob auth-blob-primary" />
      <div className="auth-blob auth-blob-secondary" />
      <div className="auth-blob auth-blob-accent" />
      <aside className="auth-aside">
        <Logo large link={false} />
        <div className="auth-intro">
          <h1 className="auth-title">
            Observability at the <span>speed of thought.</span>
          </h1>
          <p className="auth-copy">
            Group repeated production signals, inspect patterns, and review event volume from one focused workspace.
          </p>
          <div className="auth-features">
            {FEATURES.map(({ icon: Icon, title, copy }) => (
              <section className="auth-feature" key={title}>
                <Icon color="var(--primary)" size={19} />
                <h2 className="mt-3 text-sm font-bold">{title}</h2>
                <p>{copy}</p>
              </section>
            ))}
          </div>
        </div>
        <p className="auth-footer">LogForge observability dashboard</p>
      </aside>
      <section className="auth-main">
        <ThemeToggle className="auth-theme" />
        <div className="auth-card">
          <div className="mb-8 lg:hidden">
            <Logo large link={false} />
          </div>
          {children}
        </div>
      </section>
    </main>
  );
}
