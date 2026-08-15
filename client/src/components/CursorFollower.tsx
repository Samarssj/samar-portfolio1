import { useEffect, useRef } from 'react';

/**
 * A small, GPU-composited emerald cursor accent for mouse, trackpad, and touch users.
 * It remains disabled for reduced-motion preferences.
 */
export default function CursorFollower() {
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!dot || reducedMotion.matches) return;

    let frame = 0;
    let hideTimer = 0;
    let visible = false;
    let targetX = -20;
    let targetY = -20;
    let currentX = targetX;
    let currentY = targetY;

    const showAt = (x: number, y: number) => {
      targetX = x - 5;
      targetY = y - 5;
      if (!visible) {
        visible = true;
        dot.style.opacity = '1';
      }
    };

    const scheduleHide = () => {
      window.clearTimeout(hideTimer);
      hideTimer = window.setTimeout(() => {
        visible = false;
        dot.style.opacity = '0';
      }, 450);
    };

    const render = () => {
      currentX += (targetX - currentX) * 0.2;
      currentY += (targetY - currentY) * 0.2;
      dot.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
      frame = requestAnimationFrame(render);
    };

    const handlePointerDown = (event: PointerEvent) => {
      showAt(event.clientX, event.clientY);
      window.clearTimeout(hideTimer);
    };

    const handlePointerMove = (event: PointerEvent) => {
      showAt(event.clientX, event.clientY);
      if (event.pointerType === 'touch') scheduleHide();
    };

    const handlePointerEnd = (event: PointerEvent) => {
      if (event.pointerType === 'touch') scheduleHide();
    };

    const handlePointerLeave = () => {
      visible = false;
      dot.style.opacity = '0';
    };

    window.addEventListener('pointerdown', handlePointerDown, { passive: true });
    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('pointerup', handlePointerEnd, { passive: true });
    window.addEventListener('pointercancel', handlePointerEnd, { passive: true });
    document.documentElement.addEventListener('mouseleave', handlePointerLeave);
    frame = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerEnd);
      window.removeEventListener('pointercancel', handlePointerEnd);
      document.documentElement.removeEventListener('mouseleave', handlePointerLeave);
      window.clearTimeout(hideTimer);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      ref={dotRef}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[70] block h-2.5 w-2.5 rounded-full bg-accent opacity-0 shadow-[0_0_14px_4px_rgba(16,185,129,0.55)] transition-opacity duration-150"
    />
  );
}
