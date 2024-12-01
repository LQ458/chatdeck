import { useState } from "react";
import { Link } from "react-router-dom";
import { ChatPreview } from "../components/ChatPreview";
import { AuthDialog } from "../components/ui/auth-dialog";
import { useAuth } from "../hooks/useAuth";

export function Home() {
  const [isAuthDialogOpen, setIsAuthDialogOpen] = useState(false);
  const { isAuthenticated } = useAuth();

  return (
    <div className="max-w-6xl mx-auto px-4">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
          Chat{" "}
          <span className="text-violet-600 dark:text-violet-400">Securely</span>
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8">
          Join ChatDeck for private, secure conversations.
        </p>

        {isAuthenticated ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <Link
              to="/create-room"
              className="p-6 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-violet-500 dark:hover:border-violet-500 transition-colors"
            >
              <h3 className="text-lg font-semibold mb-2 text-white">
                Create Private Room
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Start your own private chat room
              </p>
            </Link>

            <Link
              to="/debate-room"
              className="p-6 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-violet-500 dark:hover:border-violet-500 transition-colors"
            >
              <h3 className="text-lg font-semibold mb-2 text-white">
                Debate Room
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Create structured debate rooms
              </p>
            </Link>

            <Link
              to="/join"
              className="p-6 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-violet-500 dark:hover:border-violet-500 transition-colors"
            >
              <h3 className="text-lg font-semibold mb-2 text-white">
                Join Room
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Enter a code to join a room
              </p>
            </Link>
          </div>
        ) : (
          <button
            onClick={() => setIsAuthDialogOpen(true)}
            className="bg-violet-600 hover:bg-violet-700 rounded-lg px-4 py-2 text-white font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500 transition-colors"
          >
            Get Started
          </button>
        )}
      </div>

      <ChatPreview />
      <AuthDialog
        isOpen={isAuthDialogOpen}
        onClose={() => setIsAuthDialogOpen(false)}
      />
    </div>
  );
}