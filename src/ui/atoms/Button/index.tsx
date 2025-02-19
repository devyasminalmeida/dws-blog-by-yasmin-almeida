import { PropsWithChildren, forwardRef } from "react";
import styles from "./styles.module.scss";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "ghost" | "link";
}

const Button = forwardRef<HTMLButtonElement, PropsWithChildren<Props>>(
  function Button({ children, variant = "primary", className, ...props }, ref) {
    return (
      <button
        ref={ref}
        className={[styles.button, styles[variant], className].join(" ")}
        {...props}
      >
        {children}
      </button>
    );
  }
);

export default Button;
