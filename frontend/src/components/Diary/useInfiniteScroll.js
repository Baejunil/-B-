import { useRef, useState, useEffect, useCallback } from "react";

const useInfiniteScroll = (targetEl) => {
  const observerRef = useRef();
  const [intersecting, setIntersecting] = useState(false);

  const getObserver = useCallback(() => {
    if (!observerRef.current) {
      observerRef.current = new IntersectionObserver((entries) => {
        setIntersecting(entries.some((entry) => entry.isIntersecting));
      });
    }
    return observerRef.current;
  }, []);

  useEffect(() => {
    if (targetEl.current) getObserver().observe(targetEl.current);
    return () => {
      getObserver().disconnect();
    };
  }, [targetEl]);

  return intersecting;
};

export default useInfiniteScroll;
