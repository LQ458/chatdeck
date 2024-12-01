import { useParams, useNavigate } from 'react-router-dom';
import { useRoomStore } from '../store/useRoomStore';
import { useEffect } from 'react';
import { MessageCircle, Users, Copy } from 'lucide-react';

export function RoomDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const room = useRoomStore((state) => state.getRoom(id!));

  useEffect(() => {
    if (!room) {
      navigate('/private-room');
    }
  }, [room, navigate]);

  if (!room) return null;

  return (
    <div className="max-w-6xl mx-auto px-4">
      <div className="bg-gray-900 rounded-2xl shadow-xl border border-violet-900/50 overflow-hidden">
        <div className="p-6 border-b border-violet-900/50 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <MessageCircle className="h-6 w-6 text-violet-400" />
            <h1 className="text-xl font-semibold text-white">{room.name}</h1>
          </div>
          <div className="flex items-center gap-4 text-gray-400">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              <span>{room.participants}</span>
            </div>
            <button className="flex items-center gap-2 hover:text-violet-400 transition-colors">
              <Copy className="h-5 w-5" />
              <span>Copy Link</span>
            </button>
          </div>
        </div>

        <div className="h-[600px] p-6 flex flex-col">
          <div className="flex-1 overflow-y-auto mb-4">
            <div className="text-center text-gray-400 py-8">
              Room created. Start chatting!
            </div>
          </div>

          <div className="flex gap-4">
            <input
              type="text"
              className="flex-1 px-4 py-3 bg-gray-800 border border-violet-900/50 rounded-lg text-white focus:outline-none focus:border-violet-500"
              placeholder="Type your message..."
            />
            <button className="px-6 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors">
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}