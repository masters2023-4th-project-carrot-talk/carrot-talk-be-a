import { useCategories } from '@queries/category';
import { useEffect, useState } from 'react';

type CategorySelectorType = {
  initialCategoryName?: string;
};

export const useCategorySelector = ({
  initialCategoryName,
}: CategorySelectorType) => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>();
  const { categories } = useCategories();

  useEffect(() => {
    if (!categories || !initialCategoryName) {
      return;
    }

    const initialCategory = categories.find(
      (category) => category.name === initialCategoryName,
    )!;

    setSelectedCategory(initialCategory);
  }, [categories, initialCategoryName]);

  const selectCategory = (name: string) => {
    if (!categories) {
      return;
    }

    const category = categories.find((category) => category.name === name)!;
    setSelectedCategory(category);
  };

  return {
    selectedCategory,
    categories,
    selectCategory,
  };
};
