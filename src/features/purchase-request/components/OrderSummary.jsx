import Button from '../../../components/ui/Button';
import EmptyState from '../../../components/ui/EmptyState';
import CartItem from './CartItem';
import PaymentMethod from './PaymentMethod';
import { BasketIcon, TruckIcon, CheckCircleIcon } from '../../../components/ui/icons';
import { formatCurrency } from '../utils/formatCurrency';
import { EXPEDITIONS } from '../data/products';

export default function OrderSummary({ cart }) {
  const {
    cartItems,
    isEmpty,
    subtotal,
    tax,
    shippingCost,
    total,
    expeditionId,
    setExpeditionId,
    paymentMethodId,
    setPaymentMethodId,
    setQuantity,
    removeItem,
    submitOrder,
    status,
  } = cart;

  const isSubmitting = status === 'submitting';
  const isSuccess = status === 'success';
  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <section
      aria-labelledby="summary-heading"
      className="flex flex-col overflow-hidden rounded-2xl border border-border bg-surface"
    >
      <div className="flex items-center justify-between border-b border-border bg-primary-light px-5 py-4">
        <h2 id="summary-heading" className="font-display text-lg text-primary-dark">
          Ringkasan pesanan
        </h2>
        {!isEmpty && (
          <span
            key={itemCount}
            className="rounded-full bg-primary px-2.5 py-1 text-xs font-semibold text-white"
            style={{ animation: 'pop 0.3s ease' }}
          >
            {itemCount} item
          </span>
        )}
      </div>

      <div className="flex flex-col gap-4 p-5">
        {isEmpty ? (
          <EmptyState
            icon={BasketIcon}
            title="Keranjang masih kosong"
            description="Pilih produk dari katalog untuk mulai membuat pesanan."
          />
        ) : (
          <ul className="divide-y divide-border">
            {cartItems.map((item) => (
              <CartItem
                key={item.product.id}
                item={item}
                onChangeQuantity={setQuantity}
                onRemove={removeItem}
              />
            ))}
          </ul>
        )}

        {!isEmpty && (
          <>
            <div className="border-t border-border pt-4">
              <label htmlFor="expedition" className="mb-1.5 flex items-center gap-1.5 text-sm font-medium text-ink">
                <TruckIcon className="h-4 w-4 text-slate-light" />
                Ekspedisi
              </label>
              <div className="relative">
                <select
                  id="expedition"
                  value={expeditionId}
                  onChange={(e) => setExpeditionId(e.target.value)}
                  className="w-full appearance-none rounded-xl border border-border bg-paper px-4 py-2.5 text-sm text-ink outline-none focus:border-primary"
                >
                  {EXPEDITIONS.map((exp) => (
                    <option key={exp.id} value={exp.id}>
                      {exp.label} — {formatCurrency(exp.cost)}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <dl className="flex flex-col gap-2 border-t border-border pt-4 text-sm">
              <div className="flex justify-between text-slate">
                <dt>Subtotal</dt>
                <dd className="text-ink">{formatCurrency(subtotal)}</dd>
              </div>
              <div className="flex justify-between text-slate">
                <dt>Pajak (11%)</dt>
                <dd className="text-ink">{formatCurrency(tax)}</dd>
              </div>
              <div className="flex justify-between text-slate">
                <dt>Estimasi ongkir</dt>
                <dd className="text-ink">{formatCurrency(shippingCost)}</dd>
              </div>
              <div className="mt-1 flex items-baseline justify-between border-t border-dashed border-border pt-3">
                <dt className="text-sm font-medium text-ink">Total tagihan</dt>
                <dd className="font-display text-xl text-primary-dark">{formatCurrency(total)}</dd>
              </div>
            </dl>

            <PaymentMethod
              selectedId={paymentMethodId}
              onChange={setPaymentMethodId}
              disabled={isSubmitting}
            />
          </>
        )}

        <Button
          fullWidth
          size="lg"
          loading={isSubmitting}
          disabled={isEmpty || isSubmitting}
          onClick={submitOrder}
        >
          {isSubmitting ? 'Memproses pesanan...' : 'Submit order / bayar'}
        </Button>

        <div role="status" aria-live="polite">
          {isSuccess && (
            <p
              className="flex items-center justify-center gap-1.5 rounded-xl bg-success-light px-3 py-2.5 text-center text-sm font-medium text-success"
              style={{ animation: 'scale-in 0.3s cubic-bezier(0.34,1.56,0.64,1) both' }}
            >
              <CheckCircleIcon className="h-4 w-4" />
              Pesanan berhasil dikirim ke Head Office.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
