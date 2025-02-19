import { PropsWithChildren } from "react";

import styles from "./styles.module.scss";

function Container({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={[styles.container, className].join(" ")} {...props}>
      {children}
    </div>
  );
}

function Image(props: React.ImgHTMLAttributes<HTMLImageElement>) {
  return <img className={styles.image} {...props} />;
}

function Content({ children }: PropsWithChildren) {
  return <div className={styles.content}>{children}</div>;
}

function Title({ children }: PropsWithChildren) {
  return <h2 className={styles.title}>{children}</h2>;
}

function Description({ children }: PropsWithChildren) {
  return <p className={styles.description}>{children}</p>;
}

function Footer({ children }: PropsWithChildren) {
  return <div className={styles.footer}>{children}</div>;
}

const Card = {
  Container,
  Image,
  Content,
  Title,
  Description,
  Footer,
};

export default Card;
