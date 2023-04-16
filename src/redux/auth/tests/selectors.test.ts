import { UserPublicInfo } from "../../../types/auth";
import { store } from "../../store";
import {
  selectUser,
  selectIsLoggedIn,
  selectIsLoading,
  selectIsFetchingUser,
} from "../auth-selectors";

describe("redux auth selectors", () => {
  it("should select user from state object", () => {
    const user: UserPublicInfo = {
      _id: "643aa3ac1623d5f21eb8eb5f",
      username: "Test",
    };

    const state = store.getState();
    state.auth.user = user;

    const result = selectUser(state);
    expect(result).toEqual(user);
  });

  it("should select isLoggedIn property from state object", () => {
    const state = store.getState();
    state.auth.isLoggedIn = true;

    const result = selectIsLoggedIn(state);
    state.auth.isLoggedIn = false;
    expect(result).toEqual(true);
  });

  it("should select isLoading property from state object", () => {
    const state = store.getState();
    state.auth.isLoading = true;

    const result = selectIsLoading(state);
    state.auth.isLoading = false;
    expect(result).toEqual(true);
  });

  it("should select isFetchingUser property from state object", () => {
    const state = store.getState();
    state.auth.isFetchingCurrentUser = true;

    const result = selectIsFetchingUser(state);
    state.auth.isFetchingCurrentUser = false;
    expect(result).toEqual(true);
  });
});
