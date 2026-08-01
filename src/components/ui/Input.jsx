export default function Input({ label, hideLabel = false, id, icon: Icon, className = '', ...rest }) {
  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={id}
          className={hideLabel ? 'sr-only' : 'mb-1.5 block text-sm font-medium text-ink'}
        >
          {label}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <Icon className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-light" />
        )}
        <input
          id={id}
          className={`w-full rounded-full border border-border bg-surface py-2.5 text-sm text-ink placeholder:text-slate-light outline-none transition-colors focus:border-primary ${Icon ? 'pl-10 pr-4' : 'px-4'} ${className}`}
          {...rest}
        />
      </div>
    </div>
  );
}
