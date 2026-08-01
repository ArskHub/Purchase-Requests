export default function PageContainer({ children }) {
  return (
    <main className="mx-auto max-w-6xl px-4 pb-28 pt-8 sm:px-6 sm:pb-12">
      {children}
    </main>
  );
}
