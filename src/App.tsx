import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Header } from "./components/Header";
import { Home } from "./pages/Home";
import { PrivateRoom } from "./pages/PrivateRoom";
import { RoomDetail } from "./pages/RoomDetail";
import { DebateRoom } from "./pages/DebateRoom";
import { JoinByCode } from "./pages/JoinByCode";
import { RandomRoom } from "./pages/RandomRoom";
import { PasswordReset } from "./pages/PasswordReset";
import { About } from "./pages/About";
import { AuthGuard } from "./components/AuthGuard";
import { UserOnboarding } from "./components/UserOnboarding";
import { useAuth } from "./hooks/useAuth";
import { ThemeProvider } from "./providers/ThemeProvider";

export function App() {
  const { isAuthenticated, user } = useAuth();

  return (
    <ThemeProvider>
      <Router>
        <div className="min-h-screen bg-gradient-to-b from-gray-50 via-gray-100 to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors">
          <Header />

          <main className="pt-40 pb-20">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/password-reset" element={<PasswordReset />} />
              <Route element={<AuthGuard />}>
                <Route path="/private-room" element={<PrivateRoom />} />
                <Route path="/private-room/:id" element={<RoomDetail />} />
                <Route path="/debate-room" element={<DebateRoom />} />
                <Route path="/join-code" element={<JoinByCode />} />
                <Route path="/random-room" element={<RandomRoom />} />
              </Route>
            </Routes>
          </main>

          <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-violet-900/50 transition-colors">
            <div className="max-w-6xl mx-auto px-4 py-6 text-center text-gray-600 dark:text-gray-400">
              <p>© 2024 ChatDeck. Privacy First.</p>
            </div>
          </footer>
        </div>
        {isAuthenticated && user?.isNewUser && <UserOnboarding />}
      </Router>
    </ThemeProvider>
  );
}
