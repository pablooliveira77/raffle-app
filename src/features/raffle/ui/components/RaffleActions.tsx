"use client";

import { Dices, Shuffle, RotateCcw } from "lucide-react";
import { Button } from "@/shared/ui/Button";
import { Spinner } from "@/shared/ui/Spinner";
import { useTranslation } from "@/shared/hooks/useLanguage";

interface RaffleActionsProps {
  hasParticipants: boolean;
  isDrawing: boolean;
  onDrawOne: () => void;
  onDrawAll: () => void;
  onReset: () => void;
}

export function RaffleActions({
  hasParticipants,
  isDrawing,
  onDrawOne,
  onDrawAll,
  onReset,
}: RaffleActionsProps) {
  const { t } = useTranslation();

  return (
    <div className="flex flex-wrap gap-3">
      <Button
        onClick={onDrawOne}
        disabled={!hasParticipants || isDrawing}
        className="flex items-center gap-2"
      >
        {isDrawing ? (
          <>
            <Spinner size={16} className="text-white" />
            {t("raffle.drawing")}
          </>
        ) : (
          <>
            <Dices size={18} />
            {t("raffle.drawOne")}
          </>
        )}
      </Button>
      <Button
        onClick={onDrawAll}
        disabled={!hasParticipants || isDrawing}
        variant="secondary"
        className="flex items-center gap-2"
      >
        <Shuffle size={18} />
        {t("raffle.drawAll")}
      </Button>
      <Button
        onClick={onReset}
        disabled={isDrawing}
        variant="danger"
        className="flex items-center gap-2"
      >
        <RotateCcw size={18} />
        {t("raffle.reset")}
      </Button>
    </div>
  );
}
