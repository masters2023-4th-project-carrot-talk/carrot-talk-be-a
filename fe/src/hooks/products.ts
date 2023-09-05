import { getProducts } from '@/api/api';
import { QUERY_KEY } from '@/constants/queryKey';
import { useMemo } from 'react';
import { useInfiniteQuery } from 'react-query';

export const useProducts = (
  locationId?: number,
  categoryId?: number,
  size = 10,
) => {
  const fetchProducts = ({ pageParam = 11 }: { pageParam?: number }) => {
    return getProducts({ locationId, categoryId, next: pageParam, size });
  };

  const { data, fetchNextPage, hasNextPage, status, isFetchingNextPage } =
    useInfiniteQuery(QUERY_KEY.products, fetchProducts, {
      getNextPageParam: (lastPage) => lastPage.data.nextId || null,
    });
  // 여기서 getNextPageParam의 반환값은 fetchNextPage를 호출할 때 다음 페이지를 불러오는데 사용되는 pageParam으로 설정 => next=11&  next값으로 들어가게 됨
  // lastPage 는 마지막으로 불러온 페이지의 데이터, 따라서 마지막 jsonData 한뭉텅이를 의미
  // const jsonData = {
  //   success: true,
  //   data: {
  //     products: [],
  //     nextId: 14,
  //   },
  // };

  // fetchNextPage를 호출하면 쿼리 함수로 설정해둔 fetchProducts를 호출

  // status = 초기데이터를 불러오는 상태 status === 'loading' 으로 사용
  // isFetchingNextPage = 다음 페이지를 불러오는 중일때의 loading 상태

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
