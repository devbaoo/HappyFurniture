import type { ReactNode } from "react";

export type Language = "en" | "vi";

export interface LanguageContextValue {
  lang: Language;
  setLang: (next: Language) => void;
}

export function LanguageProvider(props: {
  children: ReactNode;
}): JSX.Element;

export function useLanguage(): LanguageContextValue;
