import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Toaster } from "react-hot-toast";

import { useAppDispatch } from "./redux/store";
import { selectIsFetchingUser } from "./redux/auth/auth-selectors";
import { getCurrentUser } from "./redux/auth/auth-operations";

import PublicRoute from "./HOCs/PublicRoute";
import PrivateRoute from "./HOCs/PrivateRoute";
import Container from "./components/Container/Container";
import Layout from "./views/Layout/Layout";
import ProductsPage from "./views/ProductsPage/ProductsPage";
import LoginPage from "./views/LoginPage/LoginPage";
import ProductDetailsPage from "./views/ProductDetailsPage/ProductDetailsPage";
import ReviewsPage from "./views/ReviewsPage/ReviewsPage";

function App() {
  const dispatch = useAppDispatch();
  const isFetchingUser = useSelector(selectIsFetchingUser);

  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);

  return isFetchingUser ? null : (
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

        <Route
          path="*"
          element={<PublicRoute component={<Navigate to="/"></Navigate>} />}
        ></Route>
      </Routes>
      <Toaster />
    </Container>
  );
}

export default App;
