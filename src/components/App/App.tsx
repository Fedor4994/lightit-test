import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";

import { useAppDispatch } from "../../redux/store";
import { selectIsFetchingUser } from "../../redux/auth/auth-selectors";
import { getCurrentUser } from "../../redux/auth/auth-operations";

import PublicRoute from "../PublicRoute";
import PrivateRoute from "../PrivateRoute";
import Container from "../Container/Container";
import Layout from "../../views/Layout/Layout";
import ProductsPage from "../../views/ProductsPage/ProductsPage";
import LoginPage from "../../views/LoginPage/LoginPage";
import ProductDetailsPage from "../../views/ProductDetailsPage/ProductDetailsPage";
import FavoritePage from "../../views/FavoritePage/FavoritePage";

function App() {
  const dispatch = useAppDispatch();
  const isFetchingUser = useSelector(selectIsFetchingUser);

  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);

  return isFetchingUser ? (
    <h1>LOADING...</h1>
  ) : (
    <Container>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<ProductsPage />} />
          <Route path="/products/:productId" element={<ProductDetailsPage />} />

          <Route
            path="/favorite"
            element={
              <PrivateRoute component={<FavoritePage />} redirectTo="/login" />
            }
          />

          <Route
            path="/login"
            element={<PublicRoute component={<LoginPage />} redirectTo="/" />}
          />
        </Route>
      </Routes>
    </Container>
  );
}

export default App;