import { createContext, useContext, useState, useCallback } from "react";

const FAV_KEY = "hp_favorites";

const loadFavorites = () => {
  try { return JSON.parse(localStorage.getItem(FAV_KEY) || "[]"); }
  catch (e) { void e; return []; }
};

const saveFavorites = (arr) => {
  try { localStorage.setItem(FAV_KEY, JSON.stringify(arr)); }
  catch (e) { void e; }
};

const FavoritesContext = createContext(null);

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState(loadFavorites);
  const [showFavorites, setShowFavorites] = useState(false);

  const toggleFavorite = useCallback((product) => {
    setFavorites((prev) => {
      const exists = prev.some((p) => p.id === product.id);
      const next = exists ? prev.filter((p) => p.id !== product.id) : [...prev, product];
      saveFavorites(next);
      return next;
    });
  }, []);

  const removeFavorite = useCallback((id) => {
    setFavorites((prev) => {
      const next = prev.filter((p) => p.id !== id);
      saveFavorites(next);
      return next;
    });
  }, []);

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, removeFavorite, showFavorites, setShowFavorites }}>
      {children}
    </FavoritesContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useFavorites = () => useContext(FavoritesContext);
