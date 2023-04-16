import { render, screen } from "@testing-library/react";
import Container from "./Container";

describe("Container", () => {
  it("should renders container with children props", () => {
    render(<Container>children</Container>);
    const childrenElement = screen.getByText(/children/i);
    expect(childrenElement).toBeInTheDocument();
  });

  it("Container with childrens should match snapshot", () => {
    const view = render(<Container>children</Container>);

    expect(view).toMatchSnapshot();
  });
});
