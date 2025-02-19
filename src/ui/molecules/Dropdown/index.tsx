import { PropsWithChildren, useCallback, useRef, useState } from "react";

import Button from "../../atoms/Button";
import styles from "./styles.module.scss";
import Card from "../Card";
import useClickOutside from "../../../util/useClickOutside";
import ArrowDown from "../../atoms/Icons/ArrowDown";
import CloseIcon from "../../atoms/Icons/CloseIcon";

export type Props = {
  label: string;
  selected?: string[];
  onUnselect?: () => void;
};

export default function Dropdown({
  label,
  selected = [],
  children,
  onUnselect,
}: PropsWithChildren<Props>) {
  const ref = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const handleClickOutside = useCallback(() => {
    if (isOpen) {
      setIsOpen(false);
    }
  }, [isOpen]);

  useClickOutside(ref, handleClickOutside);
  return (
    <div
      ref={ref}
      className={`${styles.container} ${isOpen ? styles.open : ""}`}
    >
      <Button onClick={toggleDropdown} variant="ghost">
        {label}
        <ArrowDown />
      </Button>
      <Card.Container className={styles.dropdownMenu}>
        <Card.Content>
          <ul className={styles.dropdownList} role="listbox">
            {children}
          </ul>
          {selected.length > 0 ? (
            <Button onClick={onUnselect} variant="ghost">
              <span className={styles.selected}>{selected.join(", ")}</span>
              <CloseIcon />
            </Button>
          ) : null}
        </Card.Content>
      </Card.Container>
    </div>
  );
}

Dropdown.DropdownItem = function DropdownItem({
  children,
  onClick,
}: PropsWithChildren<{
  onClick?: () => void;
}>) {
  return (
    <li className={styles.dropdownItem} role="option" onClick={onClick}>
      {children}
    </li>
  );
};
