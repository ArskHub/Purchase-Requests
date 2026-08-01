import { ReceiptIcon, ChevronIcon } from '../ui/icons';

export default function Header({ branchName, branches, onBranchChange, onOpenHistory }) {
  return (
    <header className="sticky top-0 z-20 border-b border-border bg-surface/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <div className="flex min-w-0 items-center gap-2.5 sm:gap-3">
          <img
            src="/logo-anemone.png"
            alt="Anemone"
            className="h-7 w-auto shrink-0 sm:h-8"
          />

          <span className="mx-0.5 hidden h-6 w-px bg-border sm:block" aria-hidden="true" />

          <label className="relative min-w-0">
            <span className="sr-only">Pilih cabang</span>
            <select
              value={branchName}
              onChange={(e) => onBranchChange?.(e.target.value)}
              className="w-full max-w-[140px] truncate appearance-none rounded-lg border border-transparent bg-transparent py-1.5 pl-2 pr-6 text-sm font-medium text-ink hover:border-border hover:bg-paper focus:border-primary sm:max-w-none sm:pr-7"
            >
              {branches.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
            <ChevronIcon className="pointer-events-none absolute right-1.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-light" />
          </label>
        </div>

        <button
          type="button"
          onClick={onOpenHistory}
          className="flex shrink-0 items-center gap-1.5 rounded-full border border-border px-3 py-2 text-sm font-medium text-ink transition-colors hover:border-primary/40 hover:bg-primary-light"
        >
          <ReceiptIcon className="h-4 w-4" />
          <span className="hidden sm:inline">Riwayat Pesanan</span>
        </button>
      </div>
    </header>
  );
}
