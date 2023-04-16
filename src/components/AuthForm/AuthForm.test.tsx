import { render, screen } from "@testing-library/react";

import AuthForm from "./AuthForm";

const mockDispatch = jest.fn();
const mockSelector = jest.fn();

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: () => mockDispatch,
  useSelector: () => mockSelector,
}));

describe("AuthForm", () => {
  it("AuthForm with login formType should render login form", () => {
    render(<AuthForm formType="Login" handleFormChange={jest.fn()} />);

    const loginFormTitle = screen.getByText(/Login here/i);
    expect(loginFormTitle).toBeInTheDocument();
  });

  it("AuthForm with register formType should render register form", () => {
    render(<AuthForm formType="Register" handleFormChange={jest.fn()} />);

    const loginFormTitle = screen.getByText(/Register here/i);
    expect(loginFormTitle).toBeInTheDocument();
  });
});
