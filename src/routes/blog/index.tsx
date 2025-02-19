import { useState, useEffect } from "react";
import PostList from "../../modules/posts/components/PostList";
import Sorter from "../../ui/atoms/SorterButton";
import BlogFilter from "../../ui/organism/BlogFilter";
import useMediaQuery from "../../util/useMediaQuery";
import styles from "./styles.module.scss";

export default function Blog() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [isFixed, setIsFixed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsFixed(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <div className={styles.header}>
        <h1>DWS Blog</h1>
        {isMobile && <BlogFilter />}
        <Sorter />
      </div>
      <aside className={`${styles.aside} ${isFixed ? styles.fixed : ""}`}>
        {!isMobile && <BlogFilter />}
      </aside>
      <main>
        <PostList />
      </main>
    </>
  );
}
