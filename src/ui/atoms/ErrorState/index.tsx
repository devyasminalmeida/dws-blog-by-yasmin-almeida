import Button from "../Button";
import styles from "./styles.module.scss";

type Props = {
  onClick: () => void;
};

export default function ErrorState({ onClick }: Props) {
  return (
    <div className={styles.container}>
      <h1>Error</h1>
      <p>Something went wrong</p>
      <Button onClick={onClick}>Try again</Button>
    </div>
  );
}
