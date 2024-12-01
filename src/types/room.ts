export interface Room {
  id: string;
  name: string;
  password?: string;
  createdAt: Date;
  participants: number;
  status: "active" | "inactive";
}

export interface CreateRoomInput {
  name: string;
  password?: string;
}
