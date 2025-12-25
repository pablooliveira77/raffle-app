export interface Participant {
  id: string;
  name: string;
  createdAt: number;
}

export interface DrawnParticipant {
  id: string;
  name: string;
  position: number;
  drawnAt: number;
}
