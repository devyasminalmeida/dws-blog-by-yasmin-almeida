import { HtmlHTMLAttributes, PropsWithChildren } from "react";

import styles from "./styles.module.scss";
import Card from "../Card";
import FilterIcon from "../../atoms/Icons/FilterIcon";

interface ItemProps extends HtmlHTMLAttributes<HTMLLIElement> {
  active?: boolean;
}

function Container({ children }: PropsWithChildren) {
  return (
    <Card.Container>
      <Card.Content>
        <div className={styles.container}>
          <FilterIcon />
          <Card.Title>Filters</Card.Title>
        </div>
        <div className={styles.filterContainer}>{children}</div>
      </Card.Content>
    </Card.Container>
  );
}

function SubHeader({ children }: PropsWithChildren) {
  return <h2 className={styles.subHeader}>{children}</h2>;
}

function List({ children }: PropsWithChildren) {
  return <ul className={styles.list}>{children}</ul>;
}

function Item({
  children,
  active = false,
  ...rest
}: PropsWithChildren<ItemProps>) {
  return (
    <li
      className={[styles.item, active ? styles.active : null].join(" ")}
      {...rest}
    >
      {children}
    </li>
  );
}

const FilterList = {
  Container,
  List,
  Item,
  SubHeader,
};

export default FilterList;
