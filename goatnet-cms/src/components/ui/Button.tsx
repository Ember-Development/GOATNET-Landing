import type { ButtonHTMLAttributes } from "react";

export default function Button(props: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className="px-6 py-2 bg-white/10 text-white font-medium rounded-xl backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all disabled:opacity-50"
    />
  );
}
