import { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Only show on devices with a fine pointer (desktop)
    const hasPointer = window.matchMedia('(pointer: fine)').matches;
    if (!hasPointer) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;

    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.left = `${mouseX - 4}px`;
      dot.style.top = `${mouseY - 4}px`;
      if (!visible) setVisible(true);
    };

    const onMouseEnterHoverable = () => ring.classList.add('hovered');
    const onMouseLeaveHoverable = () => ring.classList.remove('hovered');

    const animate = () => {
      ringX += (mouseX - ringX) * 0.15;
      ringY += (mouseY - ringY) * 0.15;
      ring.style.left = `${ringX - 20}px`;
      ring.style.top = `${ringY - 20}px`;
      requestAnimationFrame(animate);
    };

    document.addEventListener('mousemove', onMouseMove);
    requestAnimationFrame(animate);

    // Add hover effect listeners to interactive elements
    const hoverables = document.querySelectorAll('a, button, [data-hoverable]');
    hoverables.forEach((el) => {
      el.addEventListener('mouseenter', onMouseEnterHoverable);
      el.addEventListener('mouseleave', onMouseLeaveHoverable);
    });

    // Re-attach on DOM changes
    const observer = new MutationObserver(() => {
      const newHoverables = document.querySelectorAll('a, button, [data-hoverable]');
      newHoverables.forEach((el) => {
        el.removeEventListener('mouseenter', onMouseEnterHoverable);
        el.removeEventListener('mouseleave', onMouseLeaveHoverable);
        el.addEventListener('mouseenter', onMouseEnterHoverable);
        el.addEventListener('mouseleave', onMouseLeaveHoverable);
      });
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      hoverables.forEach((el) => {
        el.removeEventListener('mouseenter', onMouseEnterHoverable);
        el.removeEventListener('mouseleave', onMouseLeaveHoverable);
      });
      observer.disconnect();
    };
  }, [visible]);

  return (
    <>
      <div
        ref={dotRef}
        className="cursor-dot hidden md:block"
        style={{ opacity: visible ? 1 : 0, transition: 'opacity 0.3s' }}
      />
      <div
        ref={ringRef}
        className="cursor-ring hidden md:block"
        style={{ opacity: visible ? 1 : 0, transition: 'opacity 0.3s' }}
      />
    </>
  );
}
