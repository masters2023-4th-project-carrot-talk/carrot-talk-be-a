type PopupType = 'modal' | 'alert';

type LocationType = {
  id: number;
  name: string;
  isMainLocation: boolean;
};

type UserType = {
  id: number;
  nickname: string;
  imageUrl: string;
};

type LocationWithQueryDataFromServer = {
  success: boolean;
  data: LocationWithQueryType[];
};

type LocationWithQueryType = {
  id: number;
  name: string;
};

type CategoriesDataFromServer = {
  success: boolean;
  data: CategoryType[];
};

type CategoryType = {
  id: number;
  name: string;
};