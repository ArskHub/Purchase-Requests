const VARIANT_CLASSES = {
  primary: 'bg-accent hover:bg-accent-dark text-white shadow-[0_2px_10px_-3px_rgba(217,119,87,0.55)] disabled:shadow-none disabled:bg-slate-light',
  secondary: 'bg-primary-light hover:bg-primary/15 text-primary-dark border border-primary/15 disabled:text-slate-light disabled:border-border disabled:bg-transparent',
  ghost: 'bg-transparent hover:bg-black/5 text-ink disabled:text-slate-light',
};

const SIZE_CLASSES = {
  sm: 'text-sm px-3 py-1.5 rounded-full',
  md: 'text-sm px-4 py-2.5 rounded-full',
  lg: 'text-[15px] px-5 py-3.5 rounded-full',
};

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  type = 'button',
  fullWidth = false,
  onClick,
  className = '',
  ...rest
}) {
  const isDisabled = disabled || loading;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isDisabled}
      aria-busy={loading}
      className={`
        inline-flex items-center justify-center gap-2 font-semibold
        transition-all duration-150 active:scale-[0.98] disabled:cursor-not-allowed disabled:active:scale-100
        ${VARIANT_CLASSES[variant]} ${SIZE_CLASSES[size]}
        ${fullWidth ? 'w-full' : ''} ${className}
      `}
      {...rest}
    >
      {loading && (
        <span
          className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white"
          aria-hidden="true"
        />
      )}
      {children}
    </button>
  );
}
