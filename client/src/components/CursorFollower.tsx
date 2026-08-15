import { useEffect, useRef } from 'react';

/**
 * A small, GPU-composited emerald cursor accent for mouse and trackpad users.
 * It stays disabled for touch-only devices and reduced-motion preferences.
 */
export default function CursorFollower() {
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    const finePointer = window.matchMedia('(pointer: fine)');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!dot || !finePointer.matches || reducedMotion.matches) return;

    let frame = 0;
    let visible = false;
    let targetX = -20;
    let targetY = -20;
    let currentX = targetX;
    let currentY = targetY;

    const render = () => {
      currentX += (targetX - currentX) * 0.2;
      currentY += (targetY - currentY) * 0.2;
      dot.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
      frame = requestAnimationFrame(render);
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerType === 'touch') return;
      targetX = event.clientX - 5;
      targetY = event.clientY - 5;
      if (!visible) {
        visible = true;
        dot.style.opacity = '1';
      }
    };

    const handlePointerLeave = () => {
      visible = false;
      dot.style.opacity = '0';
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    document.documentElement.addEventListener('mouseleave', handlePointerLeave);
    frame = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      document.documentElement.removeEventListener('mouseleave', handlePointerLeave);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      ref={dotRef}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[70] hidden h-2.5 w-2.5 rounded-full bg-accent opacity-0 shadow-[0_0_14px_4px_rgba(16,185,129,0.55)] transition-opacity duration-150 md:block"
    />
  );
}
