"use client";

import type { ReactNode } from "react";
import { createContext, useState, useMemo, useCallback } from "react";
import type { Locale } from "@/shared/types/i18n";
import ptBR from "@/messages/pt-BR.json";
import en from "@/messages/en.json";

interface LanguageContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  messages: Record<string, unknown>;
  t: (key: string, values?: Record<string, string | number>) => string;
}

export const LanguageContext = createContext<LanguageContextValue | undefined>(
  undefined,
);

const STORAGE_KEY = "raffle-draw-app:locale";

const messagesMap: Record<Locale, Record<string, unknown>> = {
  "pt-BR": ptBR as Record<string, unknown>,
  en: en as Record<string, unknown>,
};

function getStoredLocale(): Locale {
  if (typeof window === "undefined") return "pt-BR";
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored === "pt-BR" || stored === "en") return stored;
  return "pt-BR";
}

function getNestedValue(obj: Record<string, unknown>, path: string): string {
  const keys = path.split(".");
  let result: unknown = obj;

  for (const key of keys) {
    if (result && typeof result === "object" && key in result) {
      result = (result as Record<string, unknown>)[key];
    } else {
      return path;
    }
  }

  return typeof result === "string" ? result : path;
}

function interpolate(
  template: string,
  values?: Record<string, string | number>,
): string {
  if (!values) return template;

  return template.replace(/\{(\w+)(?:,\s*(\w+))?\}/g, (match, key, format) => {
    const value = values[key];
    if (value === undefined) return match;
    if (format === "number") return String(value);
    return String(value);
  });
}

interface LanguageProviderProps {
  children: ReactNode;
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [locale, setLocaleState] = useState<Locale>(getStoredLocale);

  const setLocale = useCallback((nextLocale: Locale) => {
    setLocaleState(nextLocale);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, nextLocale);
    }
    if (typeof document !== "undefined") {
      document.documentElement.lang = nextLocale;
    }
  }, []);

  const messages = messagesMap[locale];

  const t = useCallback(
    (key: string, values?: Record<string, string | number>): string => {
      const message = getNestedValue(messages, key);
      return interpolate(message, values);
    },
    [messages],
  );

  const value: LanguageContextValue = useMemo(
    () => ({
      locale,
      setLocale,
      messages,
      t,
    }),
    [locale, messages, t, setLocale],
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}
