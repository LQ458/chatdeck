import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Home } from './pages/Home';
import { PrivateRoom } from './pages/PrivateRoom';
import { RoomDetail } from './pages/RoomDetail';
import { DebateRoom } from './pages/DebateRoom';
import { JoinByCode } from './pages/JoinByCode';
import { RandomRoom } from './pages/RandomRoom';

export function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
        <Header />
        
        <main className="pt-40 pb-20">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/private-room" element={<PrivateRoom />} />
            <Route path="/private-room/:id" element={<RoomDetail />} />
            <Route path="/debate-room" element={<DebateRoom />} />
            <Route path="/join-code" element={<JoinByCode />} />
            <Route path="/random-room" element={<RandomRoom />} />
          </Routes>
        </main>

        <footer className="bg-gray-900 border-t border-violet-900/50">
          <div className="max-w-6xl mx-auto px-4 py-6 text-center text-gray-400">
            <p>© 2024 ChatSpace. Privacy First.</p>
          </div>
        </footer>
      </div>
    </Router>
  );
}