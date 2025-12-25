import type { ParticipantRepository } from "../repositories/ParticipantRepository";

export async function addParticipants(
  repository: ParticipantRepository,
  names: string[],
): Promise<void> {
  const trimmedNames = names
    .map((name) => name.trim())
    .filter((name) => name.length > 0);

  if (trimmedNames.length === 0) {
    throw new Error("No valid participants to add");
  }

  await repository.addParticipants(trimmedNames);
}
