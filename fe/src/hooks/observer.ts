import { useRef, useEffect } from 'react';

export const useIntersectionObserver = (callback, hasNextPage?: boolean) => {
  const observeTarget = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(
        (entry) => {
          console.log('되니???', entry.isIntersecting);
          console.log('되니???', hasNextPage);

          if (entry.isIntersecting && hasNextPage) {
            callback();
          }
        },
        { threshold: 1 },
      );
    });

    if (observeTarget.current) {
      console.log(observeTarget);

      observer.observe(observeTarget.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [observeTarget, hasNextPage, callback]);

  return { observeTarget };
};
