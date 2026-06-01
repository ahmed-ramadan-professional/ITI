export function Skeleton({ className = '' }) {
  return <div className={`skeleton ${className}`} aria-hidden="true" />;
}

export function TableSkeleton({ rows = 4 }) {
  return (
    <div className="grid gap-3 p-4" aria-label="Loading content">
      {Array.from({ length: rows }, (_, index) => (
        <Skeleton className="h-12 w-full" key={index} />
      ))}
    </div>
  );
}
