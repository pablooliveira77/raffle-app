"use client";

import { Users } from "lucide-react";
import { Skeleton } from "@/shared/ui/Skeleton";
import { useTranslation } from "@/shared/hooks/useLanguage";
import type { Participant } from "../../domain/entities/Participant";

interface ParticipantsListProps {
  participants: Participant[];
  isLoading: boolean;
}

export function ParticipantsList({
  participants,
  isLoading,
}: ParticipantsListProps) {
  const { t } = useTranslation();

  if (isLoading) {
    return (
      <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-slate-900 dark:text-slate-50">
          <Users size={20} />
          {t("participants.title")}
        </h2>
        <div className="space-y-2">
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-8 w-3/4" />
          <Skeleton className="h-8 w-full" />
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-slate-900 dark:text-slate-50">
        <Users size={20} />
        {t("participants.title")}
        <span className="ml-auto text-sm font-normal text-slate-500 dark:text-slate-400">
          {t("participants.count", { count: participants.length })}
        </span>
      </h2>
      {participants.length === 0 ? (
        <p className="text-center text-slate-500 dark:text-slate-400">
          {t("participants.empty")}
        </p>
      ) : (
        <ul className="space-y-2">
          {participants.map((p) => (
            <li
              key={p.id}
              className="rounded-md bg-slate-50 px-4 py-2 text-slate-900 dark:bg-slate-800 dark:text-slate-100"
            >
              {p.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
