import { Routes, Route } from "react-router-dom";
import Container from "./components/Container/Container";
import Layout from "./views/Layout/Layout";
import ProductsPage from "./views/ProductsPage/ProductsPage";
import LoginPage from "./views/LoginPage/LoginPage";
import ProductDetailsPage from "./views/ProductDetailsPage/ProductDetailsPage";
import PublicRoute from "./components/PublicRoute";
import PrivateRoute from "./components/PrivateRoute";
import FavoritePage from "./views/FavoritePage/FavoritePage";
import { useAppDispatch } from "./redux/store";
import { useSelector } from "react-redux";
import { selectIsFetchingUser } from "./redux/auth/auth-selectors";
import { useEffect } from "react";
import { getCurrentUser } from "./redux/auth/auth-operations";

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
