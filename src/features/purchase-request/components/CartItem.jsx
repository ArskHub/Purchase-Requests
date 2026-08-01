import QuantityInput from '../../../components/ui/QuantityInput';
import { TrashIcon } from '../../../components/ui/icons';
import { formatCurrency } from '../utils/formatCurrency';

export default function CartItem({ item, onChangeQuantity, onRemove }) {
  const { product, quantity, lineTotal } = item;

  return (
    <li
      className="flex items-start justify-between gap-3 py-3.5"
      style={{ animation: 'fade-in-up 0.3s ease both' }}
    >
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-ink">{product.name}</p>
        <p className="text-xs text-slate-light">{formatCurrency(product.price)} / {product.unit}</p>
        <div className="mt-2 flex items-center gap-3">
          <QuantityInput
            size="sm"
            value={quantity}
            max={product.stock}
            onChange={(next) => onChangeQuantity(product.id, next)}
            label={`Jumlah ${product.name}`}
          />
          <button
            type="button"
            onClick={() => onRemove(product.id)}
            aria-label={`Hapus ${product.name} dari keranjang`}
            className="flex h-8 w-8 items-center justify-center rounded-full text-slate-light transition-colors hover:bg-danger-light hover:text-danger"
          >
            <TrashIcon className="h-4 w-4" />
          </button>
        </div>
      </div>
      <p className="shrink-0 pt-0.5 text-sm font-semibold text-ink">{formatCurrency(lineTotal)}</p>
    </li>
  );
}
