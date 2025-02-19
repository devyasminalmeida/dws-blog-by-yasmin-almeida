import { useCallback, useContext, useMemo } from "react";
import { useSearchParams } from "react-router-dom";

import { CategoryContext } from "../../context";
import FilterList from "../../../../ui/molecules/FilterList";
import { Category } from "../../types";
import Skeleton from "../../../../ui/atoms/Skeleton";
import useMediaQuery from "../../../../util/useMediaQuery";
import Dropdown from "../../../../ui/molecules/Dropdown";

export default function CategoriesFilterItems() {
  const [searchParams, setSearchParams] = useSearchParams();
  const isMobile = useMediaQuery("(max-width: 768px)");

  const { data = [], isLoading } = useContext(CategoryContext);
  const categories = useMemo(
    () => searchParams.getAll("categories") || [],
    [searchParams]
  );
  const selected = useMemo(
    () =>
      categories.map((id) => {
        const category = data.find((category) => category.id === id);
        return category ? category.name : "";
      }),
    [categories, data]
  );

  const handleClick = useCallback(
    (categoryId: Category["id"]) => {
      const newParams = new URLSearchParams(searchParams);
      if (categories.includes(categoryId)) {
        newParams.delete("categories");
        categories
          .filter((id) => id !== categoryId)
          .forEach((id) => newParams.append("categories", id));
      } else {
        newParams.append("categories", categoryId);
      }
      setSearchParams(newParams);
    },
    [categories, searchParams, setSearchParams]
  );

  const handleUnselect = useCallback(() => {
    const params = new URLSearchParams(searchParams);
    params.delete("categories");
    setSearchParams(params);
  }, [searchParams, setSearchParams]);

  if (isMobile) {
    return (
      <Dropdown
        onUnselect={handleUnselect}
        selected={selected}
        label="Categories"
      >
        {data.map((category) => (
          <Dropdown.DropdownItem
            key={category.id}
            onClick={() => handleClick(category.id)}
          >
            {category.name}
          </Dropdown.DropdownItem>
        ))}
      </Dropdown>
    );
  }
  return (
    <>
      <FilterList.SubHeader>Category</FilterList.SubHeader>
      <FilterList.List>
        {isLoading ? (
          <CategoriesFilterItems.Skeleton />
        ) : (
          data.map((category) => (
            <FilterList.Item
              role="link"
              key={category.id}
              active={categories.includes(category.id)}
              onClick={() => handleClick(category.id)}
            >
              {category.name}
            </FilterList.Item>
          ))
        )}
      </FilterList.List>
    </>
  );
}

CategoriesFilterItems.Skeleton = function CategoriesFilterItemsSkeleton() {
  return (
    <FilterList.List>
      {[...new Array(5)].map((_, index) => (
        <FilterList.Item key={index}>
          <Skeleton width="100%" height="30px" />
        </FilterList.Item>
      ))}
    </FilterList.List>
  );
};
