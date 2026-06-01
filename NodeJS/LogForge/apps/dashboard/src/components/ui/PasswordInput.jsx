import { useState } from 'react';
import { Eye, EyeOff, LockKeyhole } from 'lucide-react';
import { IconButton } from './IconButton';

export function PasswordInput({ value, onChange, autoComplete = 'current-password' }) {
  const [revealed, setRevealed] = useState(false);

  return (
    <div className="input-wrap">
      <LockKeyhole className="input-icon" size={17} />
      <input
        required
        aria-label="Password"
        type={revealed ? 'text' : 'password'}
        minLength={8}
        className="input input-with-icon input-with-action"
        autoComplete={autoComplete}
        value={value}
        onChange={onChange}
      />
      <IconButton
        className="input-action"
        label={revealed ? 'Hide password' : 'Show password'}
        onClick={() => setRevealed(!revealed)}
      >
        {revealed ? <EyeOff size={16} /> : <Eye size={16} />}
      </IconButton>
    </div>
  );
}
