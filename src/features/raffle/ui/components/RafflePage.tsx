"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/shared/ui/Button";
import { ThemeToggle } from "@/shared/ui/ThemeToggle";
import { LanguageSelector } from "@/shared/ui/LanguageSelector";
import { useTranslation } from "@/shared/hooks/useLanguage";
import { useRaffle } from "../hooks/useRaffle";
import { AddParticipantsModal } from "./AddParticipantsModal";
import { DrawResultModal } from "./DrawResultModal";
import { ParticipantsList } from "./ParticipantsList";
import { DrawHistoryList } from "./DrawHistoryList";
import { RaffleActions } from "./RaffleActions";
import type { DrawnParticipant } from "../../domain/entities/Participant";

export function RafflePage() {
  const { t } = useTranslation();
  const {
    participants,
    history,
    isLoading,
    isDrawing,
    addParticipants,
    drawOne,
    drawAll,
    reset,
  } = useRaffle();

  const [showAddModal, setShowAddModal] = useState(false);
  const [showResultModal, setShowResultModal] = useState(false);
  const [lastDrawn, setLastDrawn] = useState<DrawnParticipant | null>(null);

  const handleDrawOne = async () => {
    try {
      const drawn = await drawOne();
      setLastDrawn(drawn);
      setShowResultModal(true);
    } catch (error) {
      console.error("Failed to draw participant:", error);
    }
  };

  const handleDrawAll = async () => {
    try {
      await drawAll();
    } catch (error) {
      console.error("Failed to draw all participants:", error);
    }
  };

  const handleReset = async () => {
    if (
      confirm(
        t("raffle.reset") +
          "?\n\n" +
          "Esta ação não pode ser desfeita. / This action cannot be undone.",
      )
    ) {
      try {
        await reset();
      } catch (error) {
        console.error("Failed to reset raffle:", error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
        <div className="mx-auto max-w-6xl px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-50">
                {t("header.title")}
              </h1>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                {t("header.subtitle")}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <LanguageSelector />
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-6xl px-4 py-8">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <Button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2"
          >
            <Plus size={18} />
            {t("participants.addButton")}
          </Button>
          <RaffleActions
            hasParticipants={participants.length > 0}
            isDrawing={isDrawing}
            onDrawOne={handleDrawOne}
            onDrawAll={handleDrawAll}
            onReset={handleReset}
          />
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <ParticipantsList participants={participants} isLoading={isLoading} />
          <DrawHistoryList history={history} />
        </div>
      </main>

      {/* Modals */}
      <AddParticipantsModal
        open={showAddModal}
        onClose={() => setShowAddModal(false)}
        onAdd={addParticipants}
      />
      <DrawResultModal
        open={showResultModal}
        onClose={() => setShowResultModal(false)}
        result={lastDrawn}
      />
    </div>
  );
}
