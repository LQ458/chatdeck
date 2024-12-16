import { Lock } from "lucide-react";
import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useSocket } from "../hooks/useSocket";

export function PrivateRoom() {
  // const navigate = useNavigate();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  // const token = localStorage.getItem("token");
  // const { createRoom } = useSocket(token as string);

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   if (!name.trim()) return;
  //   const resp = await createRoom({
  //     name,
  //     type: "private",
  //     password: password || undefined,
  //   });

  //   navigate(`/private-room/${resp?.roomId}`);
  // };

  return (
    <div className="max-w-2xl mx-auto px-4">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-primary-900/50 overflow-hidden">
        <div className="p-8">
          <div className="flex items-center justify-center mb-6">
            <Lock className="h-12 w-12 text-primary-400" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-8">
            Create Private Room
          </h2>

          <form className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Room Name
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-primary-900/50 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:border-primary-500"
                placeholder="Enter room name..."
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Password (optional)
              </label>
              <input
                type="password"
                className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-primary-900/50 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:border-primary-500"
                placeholder="Set room password..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="pt-4">
              <button
                type="submit"
                className="w-full bg-primary-600 text-white py-3 rounded-lg hover:bg-primary-700 transition-colors"
              >
                Create Room
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
