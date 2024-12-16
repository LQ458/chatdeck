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
import { useState, useRef } from "react";
import { AuthGuard } from "./components/AuthGuard";
import { UserOnboarding } from "./components/UserOnboarding";
import { ThemeProvider } from "./providers/ThemeProvider";
import { PrimeReactProvider } from "primereact/api";
import { Toast } from "primereact/toast";
import { Footer } from "./components/Footer";

export function App() {
  const [isAuthDialogOpen, setIsAuthDialogOpen] = useState(false);
  const toast = useRef<Toast>(null);

  return (
    <ThemeProvider>
      <PrimeReactProvider>
        <Router>
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
                  <Route
                    path="/join-code"
                    element={<JoinByCode toast={toast} />}
                  />
                  <Route path="/random-room" element={<RandomRoom />} />
                </Route>
              </Routes>
            </main>
            <Footer />
          </div>
          <UserOnboarding />
        </Router>
        <Toast ref={toast} />
      </PrimeReactProvider>
    </ThemeProvider>
  );
}
