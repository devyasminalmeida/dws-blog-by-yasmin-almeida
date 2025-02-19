import { render, screen, fireEvent } from "@testing-library/react";

import Button from "./index";
import styles from "./styles.module.scss";

const renderButton = (text: string, props = {}) => {
  render(<Button {...props}>{text}</Button>);
  return screen.getByRole("button", { name: new RegExp(text, "i") });
};

describe("Button component", () => {
  it("renders the Button with text", () => {
    const buttonElement = renderButton("Click Me");
    expect(buttonElement).toBeInTheDocument();
  });

  it("applies primary variant styles", () => {
    const buttonElement = renderButton("Primary Button", {
      variant: "primary",
    });
    expect(buttonElement.className).toContain(styles.button);
    expect(buttonElement.className).toContain(styles.primary);
  });

  it("applies ghost variant styles", () => {
    const buttonElement = renderButton("Ghost Button", { variant: "ghost" });
    expect(buttonElement.className).toContain(styles.button);
    expect(buttonElement.className).toContain(styles.ghost);
  });

  it("applies link variant styles", () => {
    const buttonElement = renderButton("Link Button", { variant: "link" });
    expect(buttonElement.className).toContain(styles.button);
    expect(buttonElement.className).toContain(styles.link);
  });

  it("handles click event", () => {
    const handleClick = vi.fn();
    const buttonElement = renderButton("Click Me", { onClick: handleClick });
    fireEvent.click(buttonElement);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
