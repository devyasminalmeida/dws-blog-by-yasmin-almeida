import { useSearchParams } from "react-router-dom";

import SwapIcon from "../Icons/Swap";
import styles from "./styles.module.scss";

export default function SorterButton() {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortMode = searchParams.get("sort") || "asc";

  const handleClick = () => {
    const newParams = new URLSearchParams(searchParams);
    const newSortMode = sortMode === "asc" ? "desc" : "asc";
    newParams.set("sort", newSortMode);
    setSearchParams(newParams);
  };

  return (
    <div className={styles.container}>
      <span>Sort by:</span>
      <button onClick={handleClick} className={styles.sorter}>
        {sortMode === "asc" ? "Newest first" : "Oldest first"}
        <SwapIcon />
      </button>
    </div>
  );
}
