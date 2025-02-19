import { PropsWithChildren } from "react";
import styles from "./styles.module.scss";

export default function Badge({ children }: PropsWithChildren) {
  return <div className={styles.container}>{children}</div>;
}
