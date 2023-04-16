import authReducer, { AuthSlice } from "../authSlice";

const initialAuthState: AuthSlice = {
  user: {
    _id: "",
    username: "",
  },
  token: null,
  isLoggedIn: false,
  isFetchingCurrentUser: false,
  isLoading: false,
};

describe("redux auth selectors", () => {
  it("should return default state when passed an empty action", () => {
    const result = authReducer(undefined, { type: "" });

    expect(result).toEqual(initialAuthState);
  });
});
