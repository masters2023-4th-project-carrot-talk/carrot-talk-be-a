import { useRef, useEffect, useCallback } from 'react';

type Callback = () => void;

export const useIntersectionObserver = (
  callback: Callback,
  hasNextPage?: boolean,
) => {
  const observeTarget = useRef<HTMLDivElement | null>(null);

  const observerCallback = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && hasNextPage) {
          callback();
        }
      });
    },
    [hasNextPage, callback],
  );

  useEffect(() => {
    const observer = new IntersectionObserver(observerCallback, {
      threshold: 1,
    });

    if (observeTarget.current) {
      console.log(observeTarget);
      observer.observe(observeTarget.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [observerCallback]);

  return { observeTarget };
};
