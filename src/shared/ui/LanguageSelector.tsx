"use client";

import { Languages } from "lucide-react";
import { useLanguage } from "@/shared/hooks/useLanguage";
import type { Locale } from "@/shared/types/i18n";

export function LanguageSelector() {
  const { locale, setLocale } = useLanguage();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLocale(e.target.value as Locale);
  };

  return (
    <div className="flex items-center gap-2">
      <Languages size={20} className="text-slate-600 dark:text-slate-400" />
      <select
        value={locale}
        onChange={handleChange}
        className="rounded-md border border-slate-300 bg-white px-2 py-1 text-sm text-slate-900 transition-colors hover:border-slate-400 focus:border-blue-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:hover:border-slate-600"
      >
        <option value="pt-BR">Português</option>
        <option value="en">English</option>
      </select>
    </div>
  );
}
