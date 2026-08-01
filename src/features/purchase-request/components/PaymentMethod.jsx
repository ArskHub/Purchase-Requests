import { PAYMENT_METHODS } from '../data/products';

export default function PaymentMethod({ selectedId, onChange, disabled = false }) {
  return (
    <fieldset disabled={disabled}>
      <legend className="mb-2.5 text-sm font-semibold text-ink">Metode pembayaran</legend>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
        {PAYMENT_METHODS.map((method) => (
          <label
            key={method.id}
            className={`flex cursor-pointer items-center justify-center gap-2 rounded-xl border px-3 py-2.5 text-center text-sm transition-colors ${
              selectedId === method.id
                ? 'border-primary bg-primary text-white font-medium'
                : 'border-border text-ink hover:border-primary/30 hover:bg-primary-light'
            } ${disabled ? 'cursor-not-allowed opacity-60' : ''}`}
          >
            <input
              type="radio"
              name="payment-method"
              value={method.id}
              checked={selectedId === method.id}
              onChange={() => onChange(method.id)}
              className="sr-only"
            />
            {method.label}
          </label>
        ))}
      </div>
    </fieldset>
  );
}
