import { Lock } from "lucide-react";
import { Fragment, useState } from "react";
import { Transition } from "@headlessui/react";
import axios from "../utils/axios";
import { useAuth } from "../hooks/useAuth";
export function PrivateRoom() {
  const [roomName, setRoomName] = useState("");
  const [password, setPassword] = useState("");
  const { user } = useAuth();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!roomName.trim()) return;
    await axios.post("/api/rooms/create-room", {
      name: roomName,
      type: "private",
      password: password || undefined,
      createdBy: user?.id,
    });
  };

  return (
    <div className="max-w-2xl mx-auto px-4">
      <Transition
        appear={true}
        show={true}
        as={Fragment}
        enter="transform transition duration-300"
        enterFrom="opacity-0 translate-y-4"
        enterTo="opacity-100 translate-y-0"
      >
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-primary-900/50 overflow-hidden">
          <div className="p-8">
            <Transition
              appear={true}
              show={true}
              enter="transition-all duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
            >
              <div className="flex items-center justify-center mb-6">
                <Lock className="h-12 w-12 text-primary-400" />
              </div>
            </Transition>

            <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-8">
              Create Private Room
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <Transition
                show={true}
                enter="transition-all duration-300 delay-150"
                enterFrom="opacity-0 translate-y-2"
                enterTo="opacity-100 translate-y-0"
              >
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Room Name
                  </label>
                  <input
                    type="text"
                    value={roomName}
                    onChange={(e) => setRoomName(e.target.value)}
                    className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-primary-900/50 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                    placeholder="Enter room name..."
                    required
                  />
                </div>
              </Transition>

              <Transition
                show={true}
                enter="transition-all duration-300 delay-300"
                enterFrom="opacity-0 translate-y-2"
                enterTo="opacity-100 translate-y-0"
              >
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Room Password
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-primary-900/50 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                    placeholder="Enter room password..."
                    required
                  />
                </div>
              </Transition>

              <Transition
                show={true}
                enter="transition-all duration-300 delay-450"
                enterFrom="opacity-0 translate-y-2"
                enterTo="opacity-100 translate-y-0"
              >
                <div className="pt-4">
                  <button
                    type="submit"
                    className="w-full bg-primary-600 text-white py-3 rounded-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-all duration-200"
                  >
                    Create Room
                  </button>
                </div>
              </Transition>
            </form>
          </div>
        </div>
      </Transition>
    </div>
  );
}
