import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { Toaster } from "react-hot-toast";

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
import ReviewsPage from "../../views/ReviewsPage/ReviewsPage";

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
            path="/reviews"
            element={
              <PrivateRoute component={<ReviewsPage />} redirectTo="/login" />
            }
          />

          <Route
            path="/login"
            element={<PublicRoute component={<LoginPage />} redirectTo="/" />}
          />
        </Route>
      </Routes>
      <Toaster />
    </Container>
  );
}

export default App;
