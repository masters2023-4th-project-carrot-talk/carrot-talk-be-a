import { useRef } from 'react';

// export const useIntersectionObserver = (callback) => {
//   const observer = useRef(
//     new IntersectionObserver(
//       (entries) => {
//         entries.forEach((entry) => {
//           if (entry.isIntersecting) {
//             callback();
//           }
//         });
//       },
//       { threshold: 0.5 },
//     ),
//   );

//   const observe = (element) => {
//     observer.current.observe(element);
//   };

//   return observe;
// };

export const useIntersectionObserver = (callback) => {
  const observer = useRef(
    new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            callback();
          }
        });
      },
      { threshold: 0.3 }, // 한계점
    ),
  );
};
