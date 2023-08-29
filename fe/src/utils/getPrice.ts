export const getPrice = (price: number) => {
  if (price === 0) return '가격 없음';

  const billion = Math.floor(price / 100000000);
  const million = Math.floor((price % 100000000) / 10000);

  if (billion && million) return `${billion}억 ${million}만원`;
  if (billion) return `${billion}억`;
  if (price > 1000000) return `${million}만원`;

  return `${price.toLocaleString('ko-KR')}원`;
};
