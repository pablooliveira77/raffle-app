import type { ParticipantRepository } from "../repositories/ParticipantRepository";

export async function resetRaffle(
  repository: ParticipantRepository,
): Promise<void> {
  await repository.clearAll();
}
