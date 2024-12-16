import { Hash } from "lucide-react";
import { useState } from "react";
// import { useNavigate } from "react-router-dom";
import { Toast } from "primereact/toast";

export function JoinByCode({
  toast
}: {
  toast: React.RefObject<Toast>
}) {
  // const navigate = useNavigate();
  // const { joinRoom } = useSocketStore();
  
  const [roomCode, setRoomCode] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);


  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   if (!roomCode) return;

  //   setLoading(true);
  //   try {
  //     const { roomId } = await joinRoom({ code: roomCode, password });
  //     navigate(`/room/${roomId}`);
  //   } catch (error) {
  //     toast.current?.show({
  //       severity: "error",
  //       summary: "Error",
  //       detail: error instanceof Error ? error.message : "Failed to join room",
  //     });
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  return (
    <div className="max-w-2xl mx-auto px-4">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-primary-900/50 overflow-hidden">
        <div className="p-8">
          <div className="flex items-center justify-center mb-6">
            <Hash className="h-12 w-12 text-primary-400" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-8">
            Join Room by Code
          </h2>

          <form className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Room Code
              </label>
              <input
                type="text"
                value={roomCode}
                onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
                className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-primary-900/50 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:border-primary-500 text-center text-2xl tracking-wide"
                placeholder="Enter room code..."
                maxLength={6}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Password (if required)
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-primary-900/50 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:border-primary-500"
                placeholder="Enter room password..."
              />
            </div>

            <div className="pt-4">
              <button 
                type="submit"
                disabled={loading || !roomCode}
                className="w-full bg-primary-600 text-white py-3 rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Joining..." : "Join Room"}
              </button>
            </div>
          </form>

          <p className="mt-6 text-center text-gray-500 dark:text-gray-400 text-sm">
            Room codes are 6 characters long and case-sensitive
          </p>
        </div>
      </div>
    </div>
  );
}
