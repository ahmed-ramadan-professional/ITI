import { useEffect } from 'react';
import { X } from 'lucide-react';
import { IconButton } from './IconButton';

export function Dialog({ open, title, children, actions, onClose }) {
  useEffect(() => {
    if (!open) return undefined;

    function closeOnEscape(event) {
      if (event.key === 'Escape') onClose();
    }

    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [onClose, open]);

  if (!open) return null;

  return (
    <div
      className="dialog-backdrop"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section className="dialog" role="dialog" aria-modal="true" aria-label={title}>
        <div className="dialog-header">
          <h2 className="section-title">{title}</h2>
          <IconButton label="Close dialog" onClick={onClose}>
            <X size={17} />
          </IconButton>
        </div>
        <div className="dialog-body">{children}</div>
        {actions ? <div className="dialog-actions">{actions}</div> : null}
      </section>
    </div>
  );
}
