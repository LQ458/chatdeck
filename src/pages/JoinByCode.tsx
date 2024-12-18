import { Hash } from "lucide-react";
import { useState, Fragment } from "react";
import { Transition } from "@headlessui/react";

export function JoinByCode() {
  const [roomCode, setRoomCode] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <div className="max-w-2xl mx-auto px-4">
      <Transition
        appear={true}
        show={true}
        as={Fragment}
        enter="transform transition duration-300"
        enterFrom="opacity-0 translate-y-4"
        enterTo="opacity-100 translate-y-0"
        leave="transform transition duration-200"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-4"
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
                <Hash className="h-12 w-12 text-primary-400" />
              </div>
            </Transition>

            <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-8">
              Join Room by Code
            </h2>

            <form className="space-y-6">
              <Transition
                show={true}
                enter="transition-all duration-300 delay-150"
                enterFrom="opacity-0 translate-y-2"
                enterTo="opacity-100 translate-y-0"
              >
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Room Code
                  </label>
                  <input
                    type="text"
                    value={roomCode}
                    onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
                    className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-primary-900/50 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-center text-2xl tracking-wide transition-all duration-200"
                    placeholder="Enter room code..."
                    maxLength={6}
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
                    Password (if required)
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-primary-900/50 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                    placeholder="Enter room password..."
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
                    disabled={loading || !roomCode}
                    className="w-full bg-primary-600 text-white py-3 rounded-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-primary-600"
                  >
                    {loading ? "Joining..." : "Join Room"}
                  </button>
                </div>
              </Transition>
            </form>

            <Transition
              show={true}
              enter="transition-all duration-300 delay-600"
              enterFrom="opacity-0"
              enterTo="opacity-100"
            >
              <p className="mt-6 text-center text-gray-500 dark:text-gray-400 text-sm">
                Room codes are 6 characters long and case-sensitive
              </p>
            </Transition>
          </div>
        </div>
      </Transition>
    </div>
  );
}
