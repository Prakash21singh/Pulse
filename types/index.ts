interface Session {
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
