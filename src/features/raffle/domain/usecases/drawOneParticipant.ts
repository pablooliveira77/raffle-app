import type { ParticipantRepository } from "../repositories/ParticipantRepository";
import type { DrawnParticipant } from "../entities/Participant";

export async function drawOneParticipant(
  repository: ParticipantRepository,
): Promise<DrawnParticipant> {
  const participants = await repository.getAllParticipants();

  if (participants.length === 0) {
    throw new Error("No participants available to draw");
  }

  const randomIndex = Math.floor(Math.random() * participants.length);
  const selected = participants[randomIndex];

  const history = await repository.getDrawHistory();
  const position = history.length + 1;

  const drawnParticipant: DrawnParticipant = {
    id: selected.id,
    name: selected.name,
    position,
    drawnAt: Date.now(),
  };

  await repository.addToDrawHistory(drawnParticipant);
  await repository.removeParticipant(selected.id);

  return drawnParticipant;
}
