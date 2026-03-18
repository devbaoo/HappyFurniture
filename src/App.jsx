import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import ProductDetail from "./pages/ProductDetail";
import OrderDelivery from "./pages/OrderDelivery";
import Contact from "./pages/Contact";
import Certificate from "./pages/Certificate";
import News from "./pages/News";
import WhatWeDo from "./pages/WhatWeDo";

// NotFound fallback
const NotFound = () => (
  <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
    <h1 className="font-heading text-5xl font-light text-primary">404</h1>
    <p className="text-muted text-sm tracking-wide">Page not found</p>
    <a href="/" className="text-xs uppercase tracking-widest text-primary underline underline-offset-4 hover:text-muted transition-colors">
      Return Home
    </a>
  </div>
);

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          element={
            <MainLayout>
              {/* Outlet pattern — children rendered via element prop */}
            </MainLayout>
          }
        />
        <Route
          path="/"
          element={
            <MainLayout>
              <Home />
            </MainLayout>
          }
        />
        <Route
          path="/product"
          element={
            <MainLayout>
              <ProductList />
            </MainLayout>
          }
        />
        <Route
          path="/product/:id"
          element={
            <MainLayout>
              <ProductDetail />
            </MainLayout>
          }
        />
        <Route
          path="/order-delivery"
          element={
            <MainLayout>
              <OrderDelivery />
            </MainLayout>
          }
        />
        <Route
          path="/contact"
          element={
            <MainLayout>
              <Contact />
            </MainLayout>
          }
        />
        <Route
          path="/certificate"
          element={
            <MainLayout>
              <Certificate />
            </MainLayout>
          }
        />
        <Route
          path="/news"
          element={
            <MainLayout>
              <News />
            </MainLayout>
          }
        />
        <Route
          path="/what-we-do"
          element={
            <MainLayout>
              <WhatWeDo />
            </MainLayout>
          }
        />
        <Route
          path="*"
          element={
            <MainLayout>
              <NotFound />
            </MainLayout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
