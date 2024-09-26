export interface Session {
  id: number;
  topic: string;
  description: string;
  initialTime: number;
  remainingTime: number;
  isPaused: boolean;
  status: string;
  creatorId: string;
  createdAt: string;
}

export interface SessionCardProp {
  id: number;
  topic: string;
  description: string | null;
  initialTime: number; // Time in seconds
  remainingTime: number | null; // Remaining time in seconds
  isPaused: boolean;
  status: string;
  creatorId: string;
  createdAt: Date;
}
