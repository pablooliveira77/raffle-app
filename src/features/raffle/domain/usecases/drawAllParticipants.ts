import type { ParticipantRepository } from "../repositories/ParticipantRepository";
import type { DrawnParticipant } from "../entities/Participant";

function shuffleArray<T>(array: T[]): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

export async function drawAllParticipants(
  repository: ParticipantRepository,
): Promise<DrawnParticipant[]> {
  const participants = await repository.getAllParticipants();

  if (participants.length === 0) {
    throw new Error("No participants available to draw");
  }

  const shuffled = shuffleArray(participants);
  const history = await repository.getDrawHistory();
  let position = history.length + 1;

  const drawnParticipants: DrawnParticipant[] = shuffled.map((p) => ({
    id: p.id,
    name: p.name,
    position: position++,
    drawnAt: Date.now(),
  }));

  for (const drawn of drawnParticipants) {
    await repository.addToDrawHistory(drawn);
  }

  for (const p of participants) {
    await repository.removeParticipant(p.id);
  }

  return drawnParticipants;
}
