const PageWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="w-screen min-h-screen text-white overflow-x-hidden relative">
      {children}
    </main>
  );
};

export default PageWrapper;
