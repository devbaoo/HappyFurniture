import { createContext, useContext, useEffect, useState } from "react";

const LanguageContext = createContext({
  lang: "en",
  setLang: () => {},
});

export const LanguageProvider = ({ children }) => {
  const [lang, setLangState] = useState("en");

  const setLang = (next) => {
    if (next !== "en" && next !== "vi") return;
    setLangState(next);
  };

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
