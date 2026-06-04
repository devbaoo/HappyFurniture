import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider, useLanguage } from "./context/LanguageContext";
import { FavoritesProvider } from "./context/FavoritesContext";
import { siteCopy } from "./i18n/siteCopy";
import MainLayout from "./components/layout/MainLayout";
import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import ProductDetail from "./pages/ProductDetail";
import OrderDelivery from "./pages/OrderDelivery";
import Contact from "./pages/Contact";
import Certificate from "./pages/Certificate";
import News from "./pages/News";
import Event from "./pages/Event";
import NewsDetail from "./pages/NewsDetail";
import WhatWeDo from "./pages/WhatWeDo";
import ScrollToTop from "./components/ScrollToTop";

// NotFound fallback
const NotFound = () => {
  const { lang } = useLanguage();
  const n = siteCopy.notFound;
  const currentLang = lang === "vi" ? "vi" : "en";
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 px-4 text-center">
      <h1 className="font-heading text-5xl font-light text-primary">{n.title[currentLang]}</h1>
      <p className="text-muted text-sm tracking-wide">{n.message[currentLang]}</p>
      <a
        href="/"
        className="text-xs uppercase tracking-widest text-primary underline underline-offset-4 hover:text-muted transition-colors">
        {n.returnHome[currentLang]}
      </a>
    </div>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <LanguageProvider>
      <FavoritesProvider>
      <Routes>
        {/* === CUSTOMER / CLIENT ROUTES === */}
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
          path="/product/:slug"
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
          path="/event"
          element={
            <MainLayout>
              <Event />
            </MainLayout>
          }
        />
        <Route
          path="/news/:slug"
          element={
            <MainLayout>
              <NewsDetail />
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
      </FavoritesProvider>
      </LanguageProvider>
    </BrowserRouter>
  );
};

export default App;
