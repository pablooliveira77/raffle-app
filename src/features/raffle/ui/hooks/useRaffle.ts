"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import type {
  Participant,
  DrawnParticipant,
} from "../../domain/entities/Participant";
import { IndexedDBParticipantRepository } from "../../infra/storage/IndexedDBParticipantRepository";
import { addParticipants as addParticipantsUseCase } from "../../domain/usecases/addParticipants";
import { drawOneParticipant as drawOneParticipantUseCase } from "../../domain/usecases/drawOneParticipant";
import { drawAllParticipants as drawAllParticipantsUseCase } from "../../domain/usecases/drawAllParticipants";
import { resetRaffle as resetRaffleUseCase } from "../../domain/usecases/resetRaffle";

interface UseRaffleReturn {
  participants: Participant[];
  history: DrawnParticipant[];
  isLoading: boolean;
  isDrawing: boolean;
  addParticipants: (names: string[]) => Promise<void>;
  drawOne: () => Promise<DrawnParticipant>;
  drawAll: () => Promise<DrawnParticipant[]>;
  reset: () => Promise<void>;
  refresh: () => Promise<void>;
}

export function useRaffle(): UseRaffleReturn {
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [history, setHistory] = useState<DrawnParticipant[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDrawing, setIsDrawing] = useState(false);
  const repositoryRef = useRef<IndexedDBParticipantRepository | null>(null);

  // Initialize repository on client-side only
  useEffect(() => {
    if (typeof window !== "undefined" && !repositoryRef.current) {
      repositoryRef.current = new IndexedDBParticipantRepository();
    }
  }, []);

  const refresh = useCallback(async () => {
    if (!repositoryRef.current) return;
    try {
      const [allParticipants, drawHistory] = await Promise.all([
        repositoryRef.current.getAllParticipants(),
        repositoryRef.current.getDrawHistory(),
      ]);
      setParticipants(allParticipants);
      setHistory(drawHistory);
    } catch (error) {
      console.error("Failed to refresh raffle data:", error);
    }
  }, []);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      await refresh();
      setIsLoading(false);
    };
    if (repositoryRef.current) {
      loadData();
    }
  }, [refresh]);

  const addParticipants = useCallback(
    async (names: string[]) => {
      if (!repositoryRef.current) return;
      await addParticipantsUseCase(repositoryRef.current, names);
      await refresh();
    },
    [refresh],
  );

  const drawOne = useCallback(async (): Promise<DrawnParticipant> => {
    if (!repositoryRef.current) throw new Error("Repository not initialized");
    setIsDrawing(true);
    try {
      // Artificial delay for animation
      await new Promise((resolve) => setTimeout(resolve, 2000));
      const drawn = await drawOneParticipantUseCase(repositoryRef.current);
      await refresh();
      return drawn;
    } finally {
      setIsDrawing(false);
    }
  }, [refresh]);

  const drawAll = useCallback(async (): Promise<DrawnParticipant[]> => {
    if (!repositoryRef.current) throw new Error("Repository not initialized");
    setIsDrawing(true);
    try {
      const drawn = await drawAllParticipantsUseCase(repositoryRef.current);
      await refresh();
      return drawn;
    } finally {
      setIsDrawing(false);
    }
  }, [refresh]);

  const reset = useCallback(async () => {
    if (!repositoryRef.current) return;
    await resetRaffleUseCase(repositoryRef.current);
    await refresh();
  }, [refresh]);

  return {
    participants,
    history,
    isLoading,
    isDrawing,
    addParticipants,
    drawOne,
    drawAll,
    reset,
    refresh,
  };
}
