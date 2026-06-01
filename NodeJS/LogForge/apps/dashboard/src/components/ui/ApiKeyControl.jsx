import { useState } from 'react';
import { Clipboard, Eye, EyeOff } from 'lucide-react';
import { useToast } from '../../context/ToastContext';
import { IconButton } from './IconButton';

function maskKey(apiKey) {
  if (!apiKey) return 'No API key available';
  return `${apiKey.slice(0, 6)}${'*'.repeat(Math.min(18, Math.max(8, apiKey.length - 6)))}`;
}

export function ApiKeyControl({ apiKey, compact = false }) {
  const [revealed, setRevealed] = useState(false);
  const { addToast } = useToast();

  async function copyKey() {
    await navigator.clipboard.writeText(apiKey || '');
    addToast('API key copied');
  }

  return (
    <div className="api-key-control">
      <div className="api-key-row">
        <code className="api-key-value" aria-label="API key value">
          {revealed ? apiKey : maskKey(apiKey)}
        </code>
        <div className="api-key-actions">
          <IconButton label={revealed ? 'Hide API key' : 'Reveal API key'} onClick={() => setRevealed(!revealed)}>
            {revealed ? <EyeOff size={16} /> : <Eye size={16} />}
          </IconButton>
          <IconButton label="Copy API key" onClick={copyKey}>
            <Clipboard size={16} />
          </IconButton>
        </div>
      </div>
      {compact ? null : (
        <p className="m-0 text-xs muted">
          Use this key with the logger SDK. Treat it like a password and avoid exposing it in client-side code.
        </p>
      )}
    </div>
  );
}
