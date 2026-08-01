import Badge from '../../../components/ui/Badge';
import QuantityInput from '../../../components/ui/QuantityInput';
import { CheckCircleIcon, CATEGORY_ICONS, BoxIcon } from '../../../components/ui/icons';
import { formatCurrency } from '../utils/formatCurrency';

function getStockTone(stock) {
  if (stock <= 0) return 'danger';
  if (stock <= 10) return 'warning';
  return 'success';
}

function getStockLabel(stock) {
  if (stock <= 0) return 'Stok habis';
  if (stock <= 10) return `Sisa ${stock} pcs`;
  return `Stok ${stock} pcs`;
}

export default function ProductCard({ product, quantity, onChangeQuantity }) {
  const isOutOfStock = product.stock <= 0;
  const isInCart = quantity > 0;
  const Icon = CATEGORY_ICONS[product.category] ?? BoxIcon;

  return (
    <article
      className={`group relative flex gap-3.5 rounded-2xl border bg-surface p-3.5 transition-all duration-200 ease-out hover:-translate-y-0.5 sm:gap-4 sm:p-4 ${
        isInCart
          ? 'border-primary/50 shadow-[0_4px_18px_-8px_rgba(21,166,160,0.4)]'
          : 'border-border hover:border-primary/25 hover:shadow-[0_4px_18px_-10px_rgba(38,48,65,0.15)]'
      } ${isOutOfStock ? 'opacity-60 hover:translate-y-0' : ''}`}
    >
      <div
        className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-xl transition-colors duration-200 sm:h-[4.5rem] sm:w-[4.5rem] ${
          isInCart ? 'bg-primary text-white' : 'bg-primary-light text-primary'
        }`}
        aria-hidden="true"
      >
        <Icon className="h-7 w-7 sm:h-8 sm:w-8" />
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-2 sm:gap-2.5">
        <div className="min-w-0">
          <p className="text-[11px] font-medium uppercase tracking-wide text-slate-light">
            {product.category}
          </p>
          <h3 className="mt-0.5 truncate font-display text-[15px] leading-snug text-ink sm:text-base">
            {product.name}
          </h3>
        </div>

        <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
          <span className="font-display text-[15px] text-ink sm:text-base">
            {formatCurrency(product.price)}
          </span>
          <span className="text-xs text-slate-light">/ {product.unit}</span>
          <Badge tone={getStockTone(product.stock)}>{getStockLabel(product.stock)}</Badge>
        </div>

        <div className="mt-0.5 flex flex-wrap items-center justify-between gap-2">
          {isOutOfStock ? (
            <span className="text-sm font-medium text-danger">
              Tidak dapat dipesan saat ini
            </span>
          ) : (
            <QuantityInput
              value={quantity}
              max={product.stock}
              onChange={(next) => onChangeQuantity(product.id, next)}
              label={`Jumlah ${product.name}`}
            />
          )}

          {isInCart && (
            <span
              className="flex items-center gap-1 text-xs font-semibold text-primary"
              style={{ animation: 'scale-in 0.25s cubic-bezier(0.34,1.56,0.64,1) both' }}
            >
              <CheckCircleIcon className="h-4 w-4" />
              <span className="hidden sm:inline">Di keranjang</span>
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
