import { useEffect, useRef } from 'react';

/**
 * useScrollReveal — attaches a lightweight IntersectionObserver to an element ref.
 * When the element enters the viewport, it adds `data-visible="true"` so CSS can
 * trigger the reveal transition.
 *
 * Usage:
 *   const ref = useScrollReveal();
 *   <div ref={ref} className="sr-reveal">...</div>
 *
 * CSS utility classes (defined in index.css):
 *   .sr-reveal        — initial hidden state
 *   .sr-reveal[data-visible="true"] — revealed state
 */
export function useScrollReveal<T extends HTMLElement = HTMLDivElement>(
  threshold = 0.12
) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.setAttribute('data-visible', 'true');
          observer.unobserve(el); // fire once
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return ref;
}
