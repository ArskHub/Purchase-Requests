export default function EmptyState({ icon: Icon, title, description }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-paper/50 px-6 py-12 text-center">
      {Icon && (
        <div
          className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary-light text-primary"
          aria-hidden="true"
        >
          <Icon className="h-6 w-6" />
        </div>
      )}
      <p className="font-display text-base text-ink">{title}</p>
      {description && <p className="mt-1 max-w-[240px] text-sm text-slate">{description}</p>}
    </div>
  );
}
