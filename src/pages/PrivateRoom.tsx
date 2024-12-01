import { Lock, Copy, Trash2 } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRoomStore } from "../store/useRoomStore";
import { RoomList } from "../components/RoomList";

export function PrivateRoom() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const createRoom = useRoomStore((state) => state.createRoom);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const room = createRoom({ name, password: password || undefined });
    navigate(`/private-room/${room.id}`);
  };

  return (
    <div className="max-w-6xl mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-gray-900 rounded-2xl shadow-xl border border-violet-900/50 overflow-hidden">
          <div className="p-8">
            <div className="flex items-center justify-center mb-6">
              <Lock className="h-12 w-12 text-violet-400" />
            </div>
            <h2 className="text-3xl font-bold text-white text-center mb-8">
              Create Private Room
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Room Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-800 border border-violet-900/50 rounded-lg text-white focus:outline-none focus:border-violet-500"
                  placeholder="Enter room name..."
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Room Password (Optional)
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-800 border border-violet-900/50 rounded-lg text-white focus:outline-none focus:border-violet-500"
                  placeholder="Enter password..."
                />
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full bg-violet-600 text-white py-3 rounded-lg hover:bg-violet-700 transition-colors"
                >
                  Create Room
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="bg-gray-900 rounded-2xl shadow-xl border border-violet-900/50 overflow-hidden">
          <div className="p-8">
            <h2 className="text-2xl font-bold text-white mb-6">Active Rooms</h2>
            <RoomList />
          </div>
        </div>
      </div>
    </div>
  );
}
