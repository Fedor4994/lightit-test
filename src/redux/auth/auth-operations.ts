import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { User } from "../../types/auth";
import { AuthSlice } from "./authSlice";

// axios.defaults.baseURL = "http://localhost:8080/api";
axios.defaults.baseURL = "https://stuffstore.fly.dev/api";

//Ящко у сторі є токен, то зберегаємо його у хедерсах і робимо запити на сервер
//інакше сетаємо цей хедер у пусту строку і користувач більше не авторизован
const token = {
  set(token: string | null) {
    axios.defaults.headers.Authorization = `Bearer ${token}`;
  },
  unset() {
    axios.defaults.headers.Authorization = "";
  },
};

export const register = createAsyncThunk(
  "auth/register",
  // запит із даними для створення нового користувача: username, password
  async (userData: Omit<User, "_id">, { rejectWithValue }) => {
    try {
      const { data } = await axios.post<{
        token: string | null;
        user: User;
      }>("/users/register", userData);
      token.set(data.token);

      return data;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  // запит із даними для вхору до аккауну користувача: username, password
  async (userData: Omit<User, "_id">, { rejectWithValue }) => {
    try {
      const { data } = await axios.post<{
        token: string | null;
        user: User;
      }>("/users/login", userData);

      token.set(data.token);
      return data;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const logOut = createAsyncThunk(
  "auth/logOut",
  // сетаємо хедер Authorization у пусту строку
  async (_, { rejectWithValue }) => {
    try {
      token.unset();
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
    }
  }
);

// достає користувча по токену у сторі
export const getCurrentUser = createAsyncThunk(
  "auth/refresh",
  async (_, { getState, rejectWithValue }) => {
    const state = getState() as {
      auth: AuthSlice;
    };
    const persistToken = state.auth.token;

    if (persistToken === null) {
      return rejectWithValue("");
    }
    token.set(persistToken);

    try {
      const { data } = await axios.get<{
        token: string | null;
        user: User;
      }>("/users/current");

      return data;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
    }
  },
  {
    condition: (_, { getState }) => {
      const state = getState() as {
        auth: AuthSlice;
      };

      const { isFetchingCurrentUser } = state.auth;
      if (isFetchingCurrentUser) {
        return false;
      }
    },
  }
);
