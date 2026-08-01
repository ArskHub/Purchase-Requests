export default function QuantityInput({
  value,
  max,
  onChange,
  disabled = false,
  size = 'md',
  label,
}) {
  const clamp = (next) => Math.min(Math.max(next, 0), max);

  const decrease = () => onChange(clamp(value - 1));
  const increase = () => onChange(clamp(value + 1));

  const handleInputChange = (e) => {
    const raw = e.target.value.replace(/[^0-9]/g, '');
    if (raw === '') {
      onChange(0);
      return;
    }
    onChange(clamp(Number(raw)));
  };

  const dims = size === 'sm' ? 'h-8 w-8 text-sm' : 'h-9 w-9 text-base';
  const isAtMax = value >= max;
  const isDisabled = disabled || max <= 0;

  return (
    <div
      className="inline-flex items-center overflow-hidden rounded-full border border-border bg-paper/60"
      role="group"
      aria-label={label ?? 'Jumlah produk'}
    >
      <button
        type="button"
        onClick={decrease}
        disabled={isDisabled || value <= 0}
        aria-label="Kurangi jumlah"
        className={`${dims} flex items-center justify-center font-medium text-ink transition-colors hover:bg-surface disabled:cursor-not-allowed disabled:text-slate-light disabled:hover:bg-transparent`}
      >
        −
      </button>
      <input
        type="text"
        inputMode="numeric"
        value={value}
        onChange={handleInputChange}
        disabled={isDisabled}
        aria-label={label ?? 'Jumlah'}
        className={`${dims} bg-transparent text-center font-semibold text-ink outline-none disabled:cursor-not-allowed disabled:text-slate-light`}
      />
      <button
        type="button"
        onClick={increase}
        disabled={isDisabled || isAtMax}
        aria-label="Tambah jumlah"
        className={`${dims} flex items-center justify-center font-medium text-ink transition-colors hover:bg-surface disabled:cursor-not-allowed disabled:text-slate-light disabled:hover:bg-transparent`}
      >
        +
      </button>
    </div>
  );
}
