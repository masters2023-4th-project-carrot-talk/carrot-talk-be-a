import { getProducts } from '@/api/api';
import { QUERY_KEY } from '@/constants/queryKey';
import { useMemo } from 'react';
import { useInfiniteQuery } from 'react-query';

export const useProducts = (
  locationId: number | null,
  categoryId: number | null,
  size = 10,
) => {
  console.log(locationId, categoryId, size, 'useProducts');

  const fetchProducts = ({ pageParam = 50 }: { pageParam?: number }) => {
    return getProducts({ locationId, categoryId, next: pageParam, size });
  };

  const { data, fetchNextPage, hasNextPage, status, isFetchingNextPage } =
    useInfiniteQuery(QUERY_KEY.products, fetchProducts, {
      getNextPageParam: (lastPage) => {
        console.log(lastPage, 'lastPage확인중');

        return lastPage.data.nextId || null;
      },
    });
  // console.log(data, 'data확인중');
  // console.log(hasNextPage, 'product hasNextPage확인중');

  const allProducts = useMemo(() => {
    if (data) {
      return data.pages.flatMap((page) => page.data.products);
    }
    return [];
  }, [data]);

  return {
    products: allProducts,
    fetchNextPage,
    hasNextPage,
    status,
    isFetchingNextPage,
  };
};
