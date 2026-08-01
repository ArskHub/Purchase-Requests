import { useState } from 'react';
import Header from '../../components/layout/Header';
import PageContainer from '../../components/layout/PageContainer';
import ProductCatalog from './components/ProductCatalog';
import OrderSummary from './components/OrderSummary';
import { PRODUCTS, BRANCHES } from './data/products';
import { useCart } from './hooks/useCart';
import { formatCurrency } from './utils/formatCurrency';

export default function PurchaseRequestPage() {
  const cart = useCart(PRODUCTS);
  const [branchName, setBranchName] = useState(BRANCHES[0]);
  const [mobileSummaryOpen, setMobileSummaryOpen] = useState(false);

  return (
    <div className="min-h-screen bg-paper">
      <Header
        branchName={branchName}
        branches={BRANCHES}
        onBranchChange={setBranchName}
        onOpenHistory={() => {}}
      />

      <PageContainer>
        <div
          className="mb-8 sm:mb-10"
          style={{ animation: 'fade-in-up 0.5s ease both' }}
        >
          <p className="mb-1.5 text-xs font-semibold uppercase tracking-wider text-accent-dark">
            Purchase order
          </p>
          <h1
            className="font-display text-ink"
            style={{ fontSize: 'clamp(1.4rem, 1.1rem + 1.6vw, 2.15rem)', lineHeight: 1.1 }}
          >
            Form pemesanan stok cabang
          </h1>
          <p className="mt-2.5 max-w-xl text-[15px] leading-relaxed text-slate">
            Pilih produk dari katalog Head Office, atur jumlah pesanan, lalu ajukan
            langsung ke tim gudang pusat.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_380px] lg:items-start lg:gap-8">
          <ProductCatalog
            products={PRODUCTS}
            quantities={cart.quantities}
            onChangeQuantity={cart.setQuantity}
          />

          <div
            className="hidden lg:sticky lg:top-24 lg:block"
            style={{ animation: 'fade-in-up 0.5s ease 0.1s both' }}
          >
            <OrderSummary cart={cart} />
          </div>
        </div>
      </PageContainer>

      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-surface/95 p-3 backdrop-blur-md lg:hidden">
        <button
          type="button"
          onClick={() => setMobileSummaryOpen(true)}
          disabled={cart.isEmpty}
          className="flex w-full items-center justify-between rounded-full bg-primary px-5 py-3.5 text-white shadow-[0_4px_16px_-4px_rgba(21,166,160,0.5)] transition-all active:scale-[0.98] disabled:bg-slate-light disabled:shadow-none"
        >
          <span className="text-sm font-medium">
            {cart.cartItems.length} item · {formatCurrency(cart.total)}
          </span>
          <span className="text-sm font-semibold">Lihat keranjang →</span>
        </button>
      </div>

      {mobileSummaryOpen && (
        <div className="fixed inset-0 z-40 flex items-end lg:hidden">
          <button
            type="button"
            aria-label="Tutup ringkasan"
            onClick={() => setMobileSummaryOpen(false)}
            className="absolute inset-0 bg-ink/40"
            style={{ animation: 'fade-in 0.2s ease both' }}
          />
          <div
            className="relative z-10 max-h-[88vh] w-full overflow-y-auto rounded-t-3xl bg-paper p-4 pb-6"
            style={{ animation: 'slide-up-sheet 0.28s cubic-bezier(0.32,0.72,0,1) both' }}
          >
            <div className="mb-3 flex items-center justify-center">
              <span className="h-1.5 w-10 rounded-full bg-border" aria-hidden="true" />
            </div>
            <OrderSummary cart={cart} />
          </div>
        </div>
      )}
    </div>
  );
}
