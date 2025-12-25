import type { Participant, DrawnParticipant } from "../entities/Participant";

export interface ParticipantRepository {
  getAllParticipants(): Promise<Participant[]>;
  addParticipants(names: string[]): Promise<void>;
  removeParticipant(id: string): Promise<void>;
  getDrawHistory(): Promise<DrawnParticipant[]>;
  addToDrawHistory(participant: DrawnParticipant): Promise<void>;
  clearAll(): Promise<void>;
}
