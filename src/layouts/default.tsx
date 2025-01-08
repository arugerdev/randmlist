export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex flex-col h-screen overflow-hidden">
      <main className="container mx-auto max-w-7xl px-6 flex-grow pt-16 overflow-hidden">
        {children}
      </main>
    </div>
  );
}
