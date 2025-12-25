"use client";

import { History } from "lucide-react";
import { useTranslation } from "@/shared/hooks/useLanguage";
import type { DrawnParticipant } from "../../domain/entities/Participant";

interface DrawHistoryListProps {
  history: DrawnParticipant[];
}

export function DrawHistoryList({ history }: DrawHistoryListProps) {
  const { t } = useTranslation();

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-slate-900 dark:text-slate-50">
        <History size={20} />
        {t("history.title")}
      </h2>
      {history.length === 0 ? (
        <p className="text-center text-slate-500 dark:text-slate-400">
          {t("history.empty")}
        </p>
      ) : (
        <ol className="space-y-2">
          {history.map((item) => (
            <li
              key={item.id}
              className="rounded-md bg-slate-50 px-4 py-2 text-slate-900 dark:bg-slate-800 dark:text-slate-100"
            >
              {t("history.item", {
                position: item.position,
                name: item.name,
              })}
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
