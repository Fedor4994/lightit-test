import { Routes, Route } from "react-router-dom";
import Container from "./components/Container/Container";
import Layout from "./views/Layout/Layout";
import ProductsPage from "./views/ProductsPage/ProductsPage";
import LoginPage from "./views/LoginPage/LoginPage";
import ProductDetailsPage from "./views/ProductDetailsPage/ProductDetailsPage";

function App() {
  return (
    <Container>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<ProductsPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/products/:productId" element={<ProductDetailsPage />} />
        </Route>
      </Routes>
    </Container>
  );
}

export default App;
