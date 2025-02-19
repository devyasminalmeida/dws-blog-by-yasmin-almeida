import styles from "./styles.module.scss";

export interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
}

export default function SearchField({
  startAdornment,
  endAdornment,
  className,
  ...props
}: Props) {
  return (
    <div className={[styles.container, className].join(" ")}>
      <div className={styles.inputContainer}>
        {startAdornment}
        <input className={styles.input} {...props} />
        {endAdornment}
      </div>
    </div>
  );
}
