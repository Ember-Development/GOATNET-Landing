import type { InputHTMLAttributes } from "react";

export default function Input(props: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className="w-full px-4 py-2 bg-white/10 text-white placeholder-white/50 border border-white/20 rounded-xl backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-white/30 transition-all"
    />
  );
}
