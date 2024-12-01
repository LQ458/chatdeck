import { useRoomStore } from "../store/useRoomStore";
import { Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function RoomList() {
  const rooms = useRoomStore((state) => state.rooms);
  const deleteRoom = useRoomStore((state) => state.deleteRoom);
  const navigate = useNavigate();

  if (rooms.length === 0) {
    return (
      <div className="text-center py-8 text-gray-400">
        No active rooms available
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {rooms.map((room) => (
        <div
          key={room.id}
          className="bg-gray-800 rounded-lg p-4 flex items-center justify-between group hover:bg-gray-800/80 transition-colors"
        >
          <div
            className="flex-1 cursor-pointer"
            onClick={() => navigate(`/private-room/${room.id}`)}
          >
            <h3 className="text-white font-medium mb-1">{room.name}</h3>
            <div className="flex items-center gap-4 text-sm text-gray-400">
              <span>{room.participants} participants</span>
              <span>{new Date(room.createdAt).toLocaleTimeString()}</span>
            </div>
          </div>

          <button
            onClick={() => deleteRoom(room.id)}
            className="p-2 text-gray-400 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <Trash2 className="h-5 w-5" />
          </button>
        </div>
      ))}
    </div>
  );
}
