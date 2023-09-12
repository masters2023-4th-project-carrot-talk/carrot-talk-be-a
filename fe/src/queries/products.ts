import { deleteProduct, editProductStatus, getProducts } from '@api/api';
import { QUERY_KEY } from '@constants/queryKey';
import { useMemo } from 'react';
import { useInfiniteQuery, useMutation, useQueryClient } from 'react-query';

export const useProducts = (
  locationId: number | null,
  categoryId: number | null,
  size = 10,
) => {
  console.log(locationId, categoryId, '확인중');

  const fetchProducts = ({ pageParam = 50 }: { pageParam?: number }) => {
    return getProducts({ locationId, categoryId, next: pageParam, size });
  };

  const {
    data,
    fetchNextPage,
    hasNextPage,
    status,
    isFetchingNextPage,
    refetch,
  } = useInfiniteQuery(
    [QUERY_KEY.products, locationId, categoryId],
    fetchProducts,
    {
      getNextPageParam: (lastPage) => {
        return lastPage.data.nextId || null;
      },
    },
  );

  const allProducts = useMemo(() => {
    return data?.pages.flatMap((page) => page.data.products) ?? [];
  }, [data]);

  return {
    products: allProducts,
    fetchNextPage,
    hasNextPage,
    status,
    isFetchingNextPage,
    refetch,
  };
};

export const useEditProductStatus = () => {
  const queryClient = useQueryClient();
  return useMutation<void, unknown, { id: number; status: ProductStatusType }>({
    mutationFn: ({ id, status }) => editProductStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries(QUERY_KEY.products);
    },
  });
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  return useMutation<void, unknown, number>({
    mutationFn: (id: number) => deleteProduct(id),
    onSuccess: () => {
      queryClient.invalidateQueries(QUERY_KEY.products);
    },
  });
};
