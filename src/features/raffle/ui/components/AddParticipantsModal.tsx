"use client";

import { useState } from "react";
import { Dialog } from "@/shared/ui/Dialog";
import { Button } from "@/shared/ui/Button";
import { useTranslation } from "@/shared/hooks/useLanguage";

interface AddParticipantsModalProps {
  open: boolean;
  onClose: () => void;
  onAdd: (names: string[]) => Promise<void>;
}

export function AddParticipantsModal({
  open,
  onClose,
  onAdd,
}: AddParticipantsModalProps) {
  const { t } = useTranslation();
  const [text, setText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    const names = text.split("\n").filter((line) => line.trim().length > 0);
    if (names.length === 0) return;

    setIsSubmitting(true);
    try {
      await onAdd(names);
      setText("");
      onClose();
    } catch (error) {
      console.error("Failed to add participants:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      title={t("participants.addModalTitle")}
      description={t("participants.addModalDescription")}
    >
      <div className="space-y-4">
        <div>
          <label
            htmlFor="participants-input"
            className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300"
          >
            {t("participants.textareaLabel")}
          </label>
          <textarea
            id="participants-input"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={t("participants.textareaPlaceholder")}
            rows={8}
            className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:placeholder:text-slate-500"
          />
        </div>
        <div className="flex justify-end gap-2">
          <Button variant="secondary" onClick={onClose} disabled={isSubmitting}>
            {t("participants.cancel")}
          </Button>
          <Button onClick={handleSubmit} disabled={isSubmitting}>
            {t("participants.confirm")}
          </Button>
        </div>
      </div>
    </Dialog>
  );
}
