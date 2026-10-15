'use client';
import { useState } from 'react';
export function WorkImage({ src, title }: { src: string; title: string }) {
  const [failed, setFailed] = useState(false);
  return src && !failed ? <img src={src} alt={title} loading="lazy" decoding="async" onError={() => setFailed(true)} className="h-full w-full object-contain transition-transform duration-700 group-hover:scale-[1.025]" /> : <div className="flex h-full items-center justify-center text-xs tracking-[.2em] text-neutral-400">IMAGE UNAVAILABLE</div>;
}
