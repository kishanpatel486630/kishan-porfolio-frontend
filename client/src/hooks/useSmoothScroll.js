import { useEffect, useRef } from "react";
import Lenis from "lenis";

export default function useSmoothScroll() {
  const lenisRef = useRef(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    lenisRef.current = lenis;

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Handle anchor clicks for smooth scroll to sections
    const handleClick = (e) => {
      const target = e.target.closest('a[href^="#"]');
      if (target) {
        e.preventDefault();
        const id = target.getAttribute("href").slice(1);
        const element = document.getElementById(id);
        if (element) {
          lenis.scrollTo(element, { offset: -80, duration: 1.5 });
        }
      }
    };

    document.addEventListener("click", handleClick);

    const handleScrollToTop = () => {
      lenis.scrollTo(0, { immediate: true });
    };
    window.addEventListener("scrollToTop", handleScrollToTop);

    return () => {
      lenis.destroy();
      document.removeEventListener("click", handleClick);
      window.removeEventListener("scrollToTop", handleScrollToTop);
    };
  }, []);

  return lenisRef;
}
