// frontend router
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
import { useState } from "react";
import { AuthGuard } from "./components/AuthGuard";
import { UserOnboarding } from "./components/UserOnboarding";
import { ThemeProvider } from "./providers/ThemeProvider";
import { Footer } from "./components/Footer";
import { AuthDialog } from "./components/ui/auth-dialog";
// 引入antd
import { message } from "antd";
import "antd/dist/reset.css";

export function App() {
  const [isAuthDialogOpen, setIsAuthDialogOpen] = useState(false);

  // 配置message全局设置
  message.config({
    duration: 3,
    maxCount: 3,
  });

  return (
    <Router
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <ThemeProvider>
        <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors">
          <Header setIsAuthDialogOpen={setIsAuthDialogOpen} />
          <main className="pt-40 pb-20">
            <Routes>
              <Route
                path="/"
                element={
                  <Home
                    setIsAuthDialogOpen={setIsAuthDialogOpen}
                    isAuthDialogOpen={isAuthDialogOpen}
                  />
                }
              />
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
          <Footer />
        </div>
        <UserOnboarding />
        <AuthDialog
          isOpen={isAuthDialogOpen}
          onClose={() => setIsAuthDialogOpen(false)}
        />
      </ThemeProvider>
    </Router>
  );
}
