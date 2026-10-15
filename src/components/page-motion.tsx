'use client';

import { useEffect } from 'react';

/** Progressive enhancement: content stays visible without JavaScript or animation support. */
export function PageMotion() {
  useEffect(() => {
    const root = document.getElementById('main');
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!root || !('IntersectionObserver' in window) || !Element.prototype.animate) return;
    const active = new Set<Animation>();
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        observer.unobserve(entry.target);
        if (preference.matches) continue;
        const element = entry.target as HTMLElement;
        const line = element.dataset.reveal === 'line';
        const animation = element.animate([
          { opacity: 0, transform: line ? 'translateY(85%)' : 'translateY(26px)' },
          { opacity: 1, transform: 'translateY(0)' },
        ], {
          duration: line ? 1300 : 1100,
          delay: Number(element.dataset.delay ?? 0),
          easing: 'cubic-bezier(.22, 1, .36, 1)',
          fill: 'backwards',
        });
        active.add(animation);
        animation.onfinish = () => active.delete(animation);
      }
    }, { threshold: 0.12 });
    root.querySelectorAll('[data-reveal]').forEach(element => observer.observe(element));
    const stopMotion = () => {
      if (preference.matches) { active.forEach(animation => animation.cancel()); active.clear(); }
    };
    preference.addEventListener('change', stopMotion);
    return () => {
      observer.disconnect();
      preference.removeEventListener('change', stopMotion);
      active.forEach(animation => animation.cancel());
    };
  }, []);
  return null;
}
