import { create } from "zustand";
import { Room, CreateRoomInput } from "../types/room";

interface RoomStore {
  rooms: Room[];
  activeRoom: Room | null;
  createRoom: (input: CreateRoomInput) => Room;
  getRoom: (id: string) => Room | undefined;
  deleteRoom: (id: string) => void;
}

export const useRoomStore = create<RoomStore>((set, get) => ({
  rooms: [],
  activeRoom: null,

  createRoom: (input: CreateRoomInput) => {
    const newRoom: Room = {
      id: Math.random().toString(36).substring(2, 9),
      name: input.name,
      password: input.password,
      createdAt: new Date(),
      participants: 0,
      status: "active",
    };

    set((state) => ({
      rooms: [...state.rooms, newRoom],
      activeRoom: newRoom,
    }));

    return newRoom;
  },

  getRoom: (id: string) => {
    return get().rooms.find((room) => room.id === id);
  },

  deleteRoom: (id: string) => {
    set((state) => ({
      rooms: state.rooms.filter((room) => room.id !== id),
      activeRoom: state.activeRoom?.id === id ? null : state.activeRoom,
    }));
  },
}));
