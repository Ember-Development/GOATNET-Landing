import type { ReactNode } from "react";

export default function Card({ children }: { children: ReactNode }) {
  return (
    <div className="bg-white/5 border border-white/10 backdrop-blur-2xl shadow-glass rounded-3xl p-8 w-full max-w-md mx-auto">
      {children}
    </div>
  );
}
