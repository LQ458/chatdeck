import {
  MessageCircle,
  Plus,
  Users,
  Shuffle,
  Hash,
  LogOut,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useState } from "react";
import { AuthDialog } from "./ui/auth-dialog";

export function Header() {
  const navigate = useNavigate();
  const { isAuthenticated, user, signOut } = useAuth();
  const [isAuthDialogOpen, setIsAuthDialogOpen] = useState(false);

  return (
    <header className="bg-gray-900/80 backdrop-blur-sm border-b border-violet-900/50 fixed w-full top-0 z-10">
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between mb-4">
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => navigate("/")}
          >
            <MessageCircle className="h-6 w-6 text-violet-400" />
            <span className="text-xl font-semibold text-white">ChatDeck</span>
          </div>
          {isAuthenticated ? (
            <div className="flex items-center gap-4">
              <span className="text-gray-300">{user?.email}</span>
              <button
                onClick={() => signOut()}
                className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
              >
                <LogOut className="h-5 w-5" />
                Sign Out
              </button>
            </div>
          ) : (
            <button
              onClick={() => setIsAuthDialogOpen(true)}
              className="bg-violet-600 text-white px-6 py-2 rounded-full hover:bg-violet-700 transition-colors"
            >
              Sign In
            </button>
          )}
        </div>

        {isAuthenticated && (
          <nav className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
            <button
              onClick={() => navigate("/private-room")}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-violet-600/20 hover:bg-violet-600/30 text-violet-300 transition-colors"
            >
              <Plus className="h-4 w-4" />
              <span>Create Private Room</span>
            </button>

            <button
              onClick={() => navigate("/debate-room")}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-violet-600/20 hover:bg-violet-600/30 text-violet-300 transition-colors"
            >
              <Users className="h-4 w-4" />
              <span>Create Debate Room</span>
            </button>

            <button
              onClick={() => navigate("/join-code")}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-violet-600/20 hover:bg-violet-600/30 text-violet-300 transition-colors"
            >
              <Hash className="h-4 w-4" />
              <span>Join by Code</span>
            </button>

            <button
              onClick={() => navigate("/random-room")}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-violet-600/20 hover:bg-violet-600/30 text-violet-300 transition-colors"
            >
              <Shuffle className="h-4 w-4" />
              <span>Join Random Room</span>
            </button>
          </nav>
        )}
      </div>
      <AuthDialog
        isOpen={isAuthDialogOpen}
        onClose={() => setIsAuthDialogOpen(false)}
      />
    </header>
  );
}
