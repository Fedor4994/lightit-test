import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import * as reduxHooks from "react-redux";

import App from "./App";

const mockDispatch = jest.fn();
const mockSelector = jest.fn();

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: () => mockDispatch,
  useSelector: () => mockSelector,
}));

const mockedUseSelector = jest.spyOn(reduxHooks, "useSelector");

describe("App component", () => {
  it("App while fetching current user should contain loader", () => {
    mockedUseSelector.mockReturnValue(true);

    render(<App />);

    const loaderElement = screen.getByText(/loading/i);
    expect(loaderElement).toBeInTheDocument();
  });

  it("App after fetching current user should match snapshot", () => {
    mockedUseSelector.mockReturnValue(false);

    const view = render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    expect(view).toMatchSnapshot();
  });
});
