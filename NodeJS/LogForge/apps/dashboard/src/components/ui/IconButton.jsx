export function IconButton({ label, children, className = '', ...props }) {
  return (
    <button className={`icon-button ${className}`} title={label} aria-label={label} type="button" {...props}>
      {children}
    </button>
  );
}
