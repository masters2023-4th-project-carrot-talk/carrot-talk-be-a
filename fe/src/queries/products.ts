import { addNewProduct, getProducts, requestImageUpload } from '@api/api';
import { QUERY_KEY } from '@constants/queryKey';
import { useMemo } from 'react';
import { useInfiniteQuery, useMutation } from 'react-query';

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
    remove,
    refetch,
  } = useInfiniteQuery(QUERY_KEY.products, fetchProducts, {
    getNextPageParam: (lastPage) => {
      return lastPage.data.nextId || null;
    },
  });

  const allProducts = useMemo(() => {
    return data?.pages.flatMap((page) => page.data.products) ?? [];
  }, [data]);

  return {
    products: allProducts,
    fetchNextPage,
    hasNextPage,
    status,
    isFetchingNextPage,
    remove,
    refetch,
  };
};

export const useImageUpload = () => {
  return useMutation<ImageDataFromServer, unknown, FormData>({
    mutationFn: (image: FormData) => requestImageUpload(image),
  });
};

export const useProductAddition = () => {
  return useMutation<ProductAdditionResponse, unknown, ProductFormData>({
    mutationFn: (productFormData: ProductFormData) =>
      addNewProduct(productFormData),
  });
};
