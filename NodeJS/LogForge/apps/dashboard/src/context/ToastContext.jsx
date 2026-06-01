import { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react';
import { AlertCircle, CheckCircle2, X } from 'lucide-react';
import { IconButton } from '../components/ui/IconButton';

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const nextId = useRef(1);

  const dismissToast = useCallback((id) => {
    setToasts((current) => current.filter((toast) => toast.id !== id));
  }, []);

  const addToast = useCallback(
    (message, type = 'success') => {
      const id = nextId.current++;
      setToasts((current) => [...current, { id, message, type }]);
      window.setTimeout(() => dismissToast(id), 3200);
    },
    [dismissToast]
  );

  const value = useMemo(() => ({ addToast }), [addToast]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="toast-region" role="region" aria-label="Notifications">
        {toasts.map((toast) => (
          <div className="toast" key={toast.id} role="status">
            {toast.type === 'error' ? (
              <AlertCircle className="toast-error" size={18} />
            ) : (
              <CheckCircle2 className="toast-success" size={18} />
            )}
            <span className="flex-1 text-sm">{toast.message}</span>
            <IconButton label="Dismiss notification" onClick={() => dismissToast(toast.id)}>
              <X size={15} />
            </IconButton>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used inside ToastProvider');
  }
  return context;
}
