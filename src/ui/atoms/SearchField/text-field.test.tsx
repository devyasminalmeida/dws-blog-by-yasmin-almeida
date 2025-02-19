import { fireEvent, render, screen } from "@testing-library/react";
import SearchField, { Props } from "./index";
import styles from "./styles.module.scss";

let inputElement: HTMLElement;

const renderSearchField = (props: Props) => {
  render(<SearchField {...props} placeholder="Enter text" />);
  inputElement = screen.getByPlaceholderText("Enter text");
};

describe("SearchField component", () => {
  it("renders the SearchField", () => {
    renderSearchField({});
    expect(inputElement).toBeInTheDocument();
    expect(inputElement.className).toContain(styles.input);
  });

  it("renders startAdornment", () => {
    renderSearchField({
      startAdornment: <span>Start</span>,
    });
    const startAdornment = screen.getByText("Start");
    expect(startAdornment).toBeInTheDocument();
  });

  it("renders endAdornment", () => {
    renderSearchField({
      endAdornment: <span>End</span>,
    });
    const endAdornment = screen.getByText("End");
    expect(endAdornment).toBeInTheDocument();
  });

  it("renders start and end adornments", () => {
    renderSearchField({
      startAdornment: <span>Start</span>,
      endAdornment: <span>End</span>,
    });
    const startAdornment = screen.getByText("Start");
    const endAdornment = screen.getByText("End");
    expect(startAdornment).toBeInTheDocument();
    expect(endAdornment).toBeInTheDocument();
  });

  it("accepts and displays a value", () => {
    renderSearchField({ value: "Test value", readOnly: true });
    inputElement = screen.getByDisplayValue("Test value");
    expect(inputElement).toBeInTheDocument();
  });

  it("calls the onChange handler", () => {
    const handleChange = vi.fn();
    renderSearchField({ onChange: handleChange });
    fireEvent.change(inputElement, { target: { value: "New text" } });
    expect(handleChange).toHaveBeenCalledTimes(1);
  });
});
