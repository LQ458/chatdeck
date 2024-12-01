import { ChatPreview } from '../components/ChatPreview';

export function Home() {
  return (
    <div className="max-w-6xl mx-auto px-4">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold text-white mb-6">
          Chat{' '}
          <span className="text-violet-400">Anonymously</span>
        </h1>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
          No registration. No history. Just pure, anonymous conversations.
        </p>
      </div>
      <ChatPreview />
    </div>
  );
}