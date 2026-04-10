import { useEffect, useState } from "react";

/** Stable default so callers with no arg do not re-run the effect every render. */
const EMPTY_DEPS = [];

/**
 * Tracks which [data-animate] elements have intersected the viewport.
 * Pass `deps` (e.g. `[newsData]`) when animated nodes appear only after async data
 * so the observer runs again after they mount.
 */
const useScrollAnimation = (deps = EMPTY_DEPS) => {
  const [visibleElements, setVisibleElements] = useState(new Set());

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.target.id) {
            setVisibleElements((prev) => new Set([...prev, entry.target.id]));
          }
        });
      },
      { threshold: 0.1, rootMargin: "-50px" },
    );

    const elements = document.querySelectorAll("[data-animate]");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, deps);

  return visibleElements;
};

export default useScrollAnimation;
