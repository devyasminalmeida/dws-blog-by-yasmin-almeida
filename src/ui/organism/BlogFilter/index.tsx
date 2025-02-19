import AuthorsFilterItems from "../../../modules/authors/components/AuthorsFilterItems";
import { AuthorsContextProvider } from "../../../modules/authors/context";
import CategoriesFilterItems from "../../../modules/categories/components/CategoriesFilterItems";
import { CategoriesContextProvider } from "../../../modules/categories/context";
import useMediaQuery from "../../../util/useMediaQuery";
import FilterList from "../../molecules/FilterList";
import styles from "./styles.module.scss";

export default function BlogFilter() {
  const isMobile = useMediaQuery("(max-width: 768px)");

  if (isMobile) {
    return (
      <div className={styles.container}>
        <CategoriesContextProvider>
          <CategoriesFilterItems />
        </CategoriesContextProvider>
        <AuthorsContextProvider>
          <AuthorsFilterItems />
        </AuthorsContextProvider>
      </div>
    );
  }
  return (
    <div className={styles.wrapper}>
      <FilterList.Container>
        <div className={styles.container}>
          <div>
            <CategoriesContextProvider>
              <CategoriesFilterItems />
            </CategoriesContextProvider>
          </div>
          <div>
            <AuthorsContextProvider>
              <AuthorsFilterItems />
            </AuthorsContextProvider>
          </div>
        </div>
      </FilterList.Container>
    </div>
  );
}
