"use client";

import { Dialog } from "@/shared/ui/Dialog";
import { Button } from "@/shared/ui/Button";
import { useTranslation } from "@/shared/hooks/useLanguage";
import type { DrawnParticipant } from "../../domain/entities/Participant";

interface DrawResultModalProps {
  open: boolean;
  onClose: () => void;
  result: DrawnParticipant | null;
}

export function DrawResultModal({
  open,
  onClose,
  result,
}: DrawResultModalProps) {
  const { t } = useTranslation();

  if (!result) return null;

  return (
    <Dialog open={open} onClose={onClose} title={t("raffle.resultTitle")}>
      <div className="space-y-4">
        <div className="rounded-lg bg-blue-50 p-6 text-center dark:bg-blue-950">
          <p className="mb-2 text-sm font-medium text-blue-700 dark:text-blue-300">
            {t("raffle.drawnParticipantLabel")}
          </p>
          <p className="text-2xl font-bold text-blue-900 dark:text-blue-100">
            {result.name}
          </p>
          <p className="mt-2 text-sm text-blue-600 dark:text-blue-400">
            {t("history.item", {
              position: result.position,
              name: "",
            }).replace(result.name, "")}
          </p>
        </div>
        <div className="flex justify-end">
          <Button onClick={onClose}>{t("raffle.close")}</Button>
        </div>
      </div>
    </Dialog>
  );
}
